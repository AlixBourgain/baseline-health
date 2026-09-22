"use client";

import { Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type TrendPoint = { date: string; value: number };

export function TrendChart({
  data,
  unit,
  referenceLow,
  referenceHigh,
}: {
  data: TrendPoint[];
  unit?: string | null;
  referenceLow?: number | null;
  referenceHigh?: number | null;
}) {
  if (data.length < 2) {
    return (
      <div className="grid h-52 place-items-center rounded-[24px] bg-[#fafafa] px-6 text-center text-sm text-neutral-500">
        Ajoutez une autre analyse à une date différente pour afficher l’évolution.
      </div>
    );
  }

  const hasReference = referenceLow != null || referenceHigh != null;
  const values = data.map((point) => point.value);
  const observedMin = Math.min(...values);
  const observedMax = Math.max(...values);
  const span = Math.max(observedMax - observedMin, Math.abs(observedMax) * 0.16, 1);
  const lowerBound = referenceLow ?? observedMin - span * 0.25;
  const upperBound = referenceHigh ?? observedMax + span * 0.25;

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 12, bottom: 4, left: -18 }}>
          {hasReference ? (
            <ReferenceArea
              y1={lowerBound}
              y2={upperBound}
              fill="#dff3e8"
              fillOpacity={0.58}
              ifOverflow="extendDomain"
            />
          ) : null}
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#9a9d9a" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#9a9d9a" }} domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value) => [`${value} ${unit ?? ""}`.trim(), "Valeur"]}
            contentStyle={{
              borderRadius: 16,
              borderColor: "#e6e7e5",
              boxShadow: "0 12px 34px rgba(0,0,0,.08)",
              background: "rgba(255,255,255,.96)",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#171918"
            strokeWidth={2.6}
            dot={{ r: 4, fill: "#fff", stroke: "#171918", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#171918" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
