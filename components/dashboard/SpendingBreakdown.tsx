"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { getCategoryBreakdown, formatCurrency } from "@/lib/utils";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

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

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      category: string;
      amount: number;
      percentage: number;
    };
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-lg border border-border bg-card p-3 text-sm shadow-xl">
        <p className="font-medium text-foreground">{d.category}</p>
        <p className="text-muted-foreground">{formatCurrency(d.amount)}</p>
        <p className="text-muted-foreground/60">{d.percentage}% of expenses</p>
      </div>
    );
  }
  return null;
};

export default function SpendingBreakdown() {
  const { transactions } = useFinanceStore();
  const data = getCategoryBreakdown(transactions).slice(0, 8);

  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full">
      <div className="mb-4">
        <h2 className="font-semibold text-foreground">Spending by Category</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Expense breakdown
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              dataKey="amount"
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col gap-2 w-full sm:max-w-[180px]">
          {data.map((item, index) => (
            <div
              key={item.category}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="truncate text-xs text-muted-foreground">
                  {item.category}
                </span>
              </div>
              <span className="text-xs font-medium text-foreground shrink-0">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
