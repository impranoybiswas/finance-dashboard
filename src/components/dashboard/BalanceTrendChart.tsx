"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { getMonthlyData, formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CustomTooltipProps } from "@/types/types";

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass bg-background/90 p-3 text-xs shadow-2xl rounded-xl border-border/40 backdrop-blur-xl transition-all duration-300">
        <p className="mb-2 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
          {label}
        </p>
        <div className="space-y-1.5">
          {payload.map((p) => (
            <div
              key={p.dataKey}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full shadow-sm"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-muted-foreground font-medium capitalize">
                  {p.dataKey}
                </span>
              </div>
              <span className="font-black text-foreground tabular-nums">
                {formatCurrency(p.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function BalanceTrendChart() {
  const { transactions } = useFinanceStore();
  const data = getMonthlyData(transactions);

  return (
    <div className="glass rounded-2xl p-6 group transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
            Monthly Overview
          </h2>
          <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-widest mt-1">
            Cash Flow Analytics
          </p>
        </div>
        <div className="flex items-center gap-4 bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
          <span className="flex items-center gap-2 text-[10px] font-black text-muted-foreground/80 uppercase tracking-tighter">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />{" "}
            Income
          </span>
          <div className="w-px h-2.5 bg-border/60" />
          <span className="flex items-center gap-2 text-[10px] font-black text-muted-foreground/80 uppercase tracking-tighter">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />{" "}
            Expenses
          </span>
        </div>
      </div>

      <div className="chart-container h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              strokeOpacity={0.1}
            />
            <XAxis
              dataKey="month"
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 10,
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 10,
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              width={60}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "hsl(var(--primary))",
                strokeWidth: 1,
                strokeDasharray: "4 4",
                fill: "transparent",
              }}
              wrapperStyle={{ outline: "none" }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#incomeGrad)"
              animationDuration={1500}
              activeDot={{
                r: 5,
                fill: "#10b981",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#expenseGrad)"
              animationDuration={2000}
              activeDot={{
                r: 5,
                fill: "#ef4444",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
