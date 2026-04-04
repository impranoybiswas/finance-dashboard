"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { getCategoryBreakdown, formatCurrency } from "@/lib/utils";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { CustomTooltipProps } from "@/types/types";
import { useHasHydrated } from "@/hooks/useHasHydrated";

const COLORS = [
  "#34d399",
  "#60a5fa",
  "#f87171",
  "#fbbf24",
  "#a78bfa",
  "#fb923c",
  "#38bdf8",
  "#4ade80",
];

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="glass bg-background/90! p-3 text-xs shadow-2xl rounded-xl border-border/40 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: payload[0].color }}
          />
          <p className="font-bold text-foreground text-sm">{d.category}</p>
        </div>
        <div className="space-y-0.5 pl-4 border-l border-border/50 ml-1">
          <p className="font-black text-foreground">
            {formatCurrency(d.amount)}
          </p>
          <p className="text-muted-foreground/80 font-medium">
            {d.percentage}% of total
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function SpendingBreakdown() {
  const { transactions } = useFinanceStore();
  const hasHydrated = useHasHydrated();
  const data = getCategoryBreakdown(transactions).slice(0, 8);

  if (!hasHydrated) {
    return (
      <div className="glass rounded-2xl p-6 h-full flex flex-col items-center justify-center min-h-[350px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col group transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
          Spending by Category
        </h2>
        <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-widest mt-1">
          Expense distribution
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-8 sm:flex-row sm:items-center">
        <div className="relative h-[220px] w-full sm:w-[220px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                dataKey="amount"
                paddingAngle={4}
                stroke="transparent"
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                  />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
                wrapperStyle={{ outline: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter opacity-50">
              Top
            </span>
            <span className="text-xl font-black text-foreground tracking-tight">
              {data[0]?.percentage || 0}%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 w-full sm:max-w-[170px]">
          {data.map((item, index) => (
            <div
              key={item.category}
              className="flex items-center justify-between gap-3 group/item cursor-default"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full shadow-sm transition-transform group-hover/item:scale-125"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="truncate text-xs font-semibold text-muted-foreground/80 group-hover/item:text-foreground transition-colors uppercase tracking-tight">
                  {item.category}
                </span>
              </div>
              <span className="text-xs font-black text-foreground shrink-0 tabular-nums">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
