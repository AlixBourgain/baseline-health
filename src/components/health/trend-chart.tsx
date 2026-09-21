"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function TrendChart({ data, unit }: { data: Array<{ date: string; value: number }>; unit?: string | null }) {
  if (data.length < 2) return <div className="grid h-52 place-items-center rounded-2xl bg-neutral-50 text-sm text-neutral-500">Ajoutez une autre analyse pour afficher la tendance.</div>;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 12, bottom: 4, left: -20 }}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8a8f8b" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8a8f8b" }} domain={["auto", "auto"]} />
          <Tooltip formatter={(value) => [`${value} ${unit ?? ""}`.trim(), "Valeur"]} contentStyle={{ borderRadius: 14, borderColor: "#e5e7eb", boxShadow: "0 8px 30px rgba(0,0,0,.08)" }} />
          <Line type="monotone" dataKey="value" stroke="#171918" strokeWidth={2.5} dot={{ r: 4, fill: "#171918", strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
