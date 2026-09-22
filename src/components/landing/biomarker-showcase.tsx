"use client";

import { Area, AreaChart, CartesianGrid, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight } from "lucide-react";

const ferritine = [
  { year: "2022", value: 148 },
  { year: "2023", value: 172 },
  { year: "2024", value: 236 },
  { year: "2025", value: 318 },
  { year: "2026", value: 490 },
];

const miniSeries = [
  {
    name: "CRP",
    unit: "mg/L",
    value: "8,7",
    meta: "5 mesures",
    data: [2.1, 3.4, 2.8, 4.9, 8.7],
  },
  {
    name: "Glycémie",
    unit: "mmol/L",
    value: "4,69",
    meta: "4 mesures",
    data: [4.5, 4.7, 4.6, 4.69],
  },
  {
    name: "Créatinine",
    unit: "µmol/L",
    value: "80,4",
    meta: "6 mesures",
    data: [78, 82, 79, 81, 80, 80.4],
  },
];

function Sparkline({ values }: { values: number[] }) {
  const data = values.map((value, index) => ({ index, value }));

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 2, bottom: 0, left: 2 }}>
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#111827" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#111827" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke="#171717" strokeWidth={2} fill="url(#sparkFill)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BiomarkerShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-neutral-200/80 bg-[#f7f7f5] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.08)] sm:p-6 lg:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(153,171,255,0.18),transparent_27%),radial-gradient(circle_at_15%_90%,rgba(149,214,190,0.14),transparent_26%)]" />

      <div className="relative grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/88 p-5 shadow-[0_14px_50px_rgba(0,0,0,0.055)] backdrop-blur-xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">Ferritine</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-[-0.055em]">490</span>
                <span className="pb-1 text-sm text-neutral-400">µg/L</span>
              </div>
              <p className="mt-2 text-sm text-neutral-500">5 années d’historique reliées.</p>
            </div>
            <div className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-500">Référence 30–300</div>
          </div>

          <div className="mt-8 h-[260px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ferritine} margin={{ top: 10, right: 12, bottom: 0, left: -14 }}>
                <CartesianGrid vertical={false} stroke="#ececeb" />
                <ReferenceArea y1={30} y2={300} fill="#dff3e8" fillOpacity={0.62} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#9a9a96" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#9a9a96" }} />
                <Tooltip
                  formatter={(value) => [`${value} µg/L`, "Ferritine"]}
                  contentStyle={{ borderRadius: 16, border: "1px solid #e8e8e6", boxShadow: "0 12px 35px rgba(0,0,0,.08)" }}
                />
                <Line type="monotone" dataKey="value" stroke="#171717" strokeWidth={2.8} dot={{ r: 4, fill: "#fff", stroke: "#171717", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="inline-block size-2 rounded-full bg-[#b9dfc8]" />
              Zone de référence du laboratoire
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700">
              Voir tout l’historique <ArrowUpRight className="size-3.5" />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {miniSeries.map((item) => (
            <div key={item.name} className="rounded-[24px] border border-white/80 bg-white/88 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.045)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{item.name}</p>
                  <p className="mt-1 text-xs text-neutral-400">{item.meta}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold tracking-[-0.035em]">{item.value}</p>
                  <p className="text-[11px] text-neutral-400">{item.unit}</p>
                </div>
              </div>
              <div className="mt-3">
                <Sparkline values={item.data} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
