-- Allow reports without a detected sample date so import can complete and ask for confirmation later.
alter table public.lab_reports
  alter column sample_date drop not null;
