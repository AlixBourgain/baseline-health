-- Baseline MVP schema. Review with your security/legal team before production.
create extension if not exists pgcrypto;
create schema if not exists private;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text check (char_length(first_name) <= 80),
  last_name text check (char_length(last_name) <= 80),
  locale text not null default 'fr-FR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.privacy_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  purpose text not null,
  version text not null,
  action text not null check (action in ('granted','withdrawn')),
  source text not null default 'server',
  occurred_at timestamptz not null default now()
);

create table public.biomarker_catalog (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  category text not null,
  canonical_unit text,
  aliases text[] not null default '{}'
);

create table public.lab_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sample_date date not null,
  lab_name text,
  original_filename text not null,
  storage_path text,
  sha256 text not null,
  status text not null default 'processing' check (status in ('processing','ready','needs_review','failed')),
  extraction_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, sha256)
);

create table public.lab_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  report_id uuid not null references public.lab_reports(id) on delete cascade,
  biomarker_id uuid not null references public.biomarker_catalog(id),
  raw_name text not null,
  value_numeric numeric,
  value_text text,
  unit_raw text,
  unit_canonical text,
  reference_low numeric,
  reference_high numeric,
  flag text not null default 'unknown' check (flag in ('low','normal','high','unknown')),
  created_at timestamptz not null default now(),
  unique(report_id, biomarker_id)
);

create index lab_reports_user_date_idx on public.lab_reports(user_id, sample_date desc);
create index lab_results_user_biomarker_idx on public.lab_results(user_id, biomarker_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.privacy_consents enable row level security;
alter table public.biomarker_catalog enable row level security;
alter table public.lab_reports enable row level security;
alter table public.lab_results enable row level security;

revoke all on public.profiles, public.privacy_consents, public.lab_reports, public.lab_results from anon;
revoke all on public.biomarker_catalog from anon;
grant select, update on public.profiles to authenticated;
grant select on public.privacy_consents to authenticated;
grant select on public.biomarker_catalog to authenticated;
grant select, insert, update, delete on public.lab_reports to authenticated;
grant select, insert, update, delete on public.lab_results to authenticated;

create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "consents_select_own" on public.privacy_consents for select to authenticated using ((select auth.uid()) = user_id);
create policy "catalog_read_authenticated" on public.biomarker_catalog for select to authenticated using (true);
create policy "reports_select_own" on public.lab_reports for select to authenticated using ((select auth.uid()) = user_id);
create policy "reports_insert_own" on public.lab_reports for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "reports_update_own" on public.lab_reports for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "reports_delete_own" on public.lab_reports for delete to authenticated using ((select auth.uid()) = user_id);
create policy "results_select_own" on public.lab_results for select to authenticated using ((select auth.uid()) = user_id);
create policy "results_insert_own" on public.lab_results for insert to authenticated
with check (
  (select auth.uid()) = user_id
  and exists (select 1 from public.lab_reports r where r.id = report_id and r.user_id = (select auth.uid()))
);
create policy "results_update_own" on public.lab_results for update to authenticated
using ((select auth.uid()) = user_id)
with check (
  (select auth.uid()) = user_id
  and exists (select 1 from public.lab_reports r where r.id = report_id and r.user_id = (select auth.uid()))
);
create policy "results_delete_own" on public.lab_results for delete to authenticated using ((select auth.uid()) = user_id);

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles(id, first_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'first_name', ''), 80));

  return new;
end;
$$;
revoke all on function private.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure private.handle_new_user();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('health-documents', 'health-documents', false, 10485760, array['application/pdf'])
on conflict (id) do update set public = false, file_size_limit = 10485760, allowed_mime_types = array['application/pdf'];

create policy "health_docs_select_own" on storage.objects for select to authenticated
using (bucket_id = 'health-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "health_docs_insert_own" on storage.objects for insert to authenticated
with check (bucket_id = 'health-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "health_docs_update_own" on storage.objects for update to authenticated
using (bucket_id = 'health-documents' and (storage.foldername(name))[1] = (select auth.uid())::text)
with check (bucket_id = 'health-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "health_docs_delete_own" on storage.objects for delete to authenticated
using (bucket_id = 'health-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

insert into public.biomarker_catalog(slug, display_name, category, canonical_unit, aliases) values
('crp','CRP','Inflammation','mg/L',array['CRP','Protéine C réactive','C reactive protein']),
('ferritine','Ferritine','Fer','µg/L',array['Ferritine','Ferritin']),
('leucocytes','Leucocytes','Hématologie','G/L',array['Leucocytes','Globules blancs','WBC']),
('plaquettes','Plaquettes','Hématologie','G/L',array['Plaquettes','Platelets','PLT']),
('hba1c','HbA1c','Métabolisme','%',array['HbA1c','Hémoglobine glyquée','Hemoglobine glyquee','Glycated hemoglobin']),
('hemoglobine','Hémoglobine','Hématologie','g/dL',array['Hémoglobine','Hemoglobin','Hb']),
('glycemie','Glycémie','Métabolisme','g/L',array['Glycémie','Glucose','Glucose à jeun']),
('creatinine','Créatinine','Reins','µmol/L',array['Créatinine','Creatinine']),
('egfr','DFG estimé','Reins','mL/min/1.73m²',array['DFG','eGFR','Débit de filtration glomérulaire']),
('alat','ALAT','Foie','U/L',array['ALAT','ALT','TGP']),
('asat','ASAT','Foie','U/L',array['ASAT','AST','TGO']),
('ggt','GGT','Foie','U/L',array['GGT','Gamma GT','Gamma-GT']),
('ldl','LDL cholestérol','Lipides','g/L',array['LDL','LDL cholestérol']),
('hdl','HDL cholestérol','Lipides','g/L',array['HDL','HDL cholestérol']),
('triglycerides','Triglycérides','Lipides','g/L',array['Triglycérides','Triglycerides']),
('tsh','TSH','Thyroïde','mUI/L',array['TSH'])
on conflict (slug) do update set display_name=excluded.display_name, category=excluded.category, canonical_unit=excluded.canonical_unit, aliases=excluded.aliases;
