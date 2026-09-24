"use client";

import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

type TrendSeries = {
  slug: string;
  name: string;
  category?: string | null;
  unit?: string | null;
  latest: number;
  values: Array<{ date: string; value: number }>;
};

function MiniTrend({ data }: { data: Array<{ date: string; value: number }> }) {
  return (
    <div className="h-20 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 2, bottom: 0, left: 2 }}>
          <defs>
            <linearGradient id="dashboardTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#171717" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#171717" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#171717"
            strokeWidth={2.1}
            fill="url(#dashboardTrendFill)"
            dot={false}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BiomarkerTrendCards({ series }: { series: TrendSeries[] }) {
  if (!series.length) {
    return (
      <div className="grid min-h-40 place-items-center rounded-3xl border border-neutral-200 bg-[#fafafa] p-6 text-center text-sm text-neutral-500">
        Ajoutez plusieurs analyses à des dates différentes pour faire apparaître vos tendances.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {series.slice(0, 3).map((item) => (
        <Link
          key={item.slug}
          href={`/biomarkers/${item.slug}`}
          className="group rounded-[24px] border border-neutral-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.055)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-950">{item.name}</p>
              <p className="mt-1 text-xs text-neutral-400">{item.category || "Biomarqueur"} · {item.values.length} mesures</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold tracking-[-0.04em]">{item.latest}</p>
              <p className="text-[11px] text-neutral-400">{item.unit || ""}</p>
            </div>
          </div>
          <div className="mt-3">
            <MiniTrend data={item.values} />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
            <span>{item.values[0]?.date}</span>
            <span className="transition group-hover:text-neutral-700">Voir l’historique →</span>
            <span>{item.values.at(-1)?.date}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
