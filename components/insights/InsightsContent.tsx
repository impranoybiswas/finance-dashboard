"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import {
  getCategoryBreakdown,
  getMonthlyComparison,
  getMonthlyData,
  formatCurrency,
  getTotalIncome,
  getTotalExpenses,
} from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Trophy,
  Minus,
} from "lucide-react";
import clsx from "clsx";

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
  payload?: {
    dataKey: string;
    value: number;
    color: string;
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm shadow-xl">
        <p className="font-medium text-zinc-300 mb-1">{label}</p>
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-zinc-400 capitalize">{p.dataKey}:</span>
            <span className="font-medium text-white">
              {formatCurrency(p.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function InsightsPage() {
  const { transactions } = useFinanceStore();
  const breakdown = getCategoryBreakdown(transactions);
  const comparison = getMonthlyComparison(transactions);
  const monthly = getMonthlyData(transactions);
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);

  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
  const highestCategory = breakdown[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Highest spending */}
        {highestCategory && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-red-500/10 p-2.5">
                <AlertCircle size={18} className="text-red-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                  Highest Spending
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  {highestCategory.category}
                </p>
                <p className="text-sm text-red-400 font-medium">
                  {formatCurrency(highestCategory.amount)}
                  <span className="text-zinc-500 font-normal ml-1">
                    ({highestCategory.percentage}% of expenses)
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Savings rate */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2.5">
              <Trophy size={18} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                Savings Rate
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                {savingsRate.toFixed(1)}%
              </p>
              <p
                className={clsx(
                  "text-sm font-medium",
                  savingsRate > 20
                    ? "text-emerald-400"
                    : savingsRate > 0
                      ? "text-yellow-400"
                      : "text-red-400",
                )}
              >
                {savingsRate > 20
                  ? "Excellent savings!"
                  : savingsRate > 0
                    ? "Room for improvement"
                    : "Spending exceeds income"}
              </p>
            </div>
          </div>
        </div>

        {/* Monthly comparison */}
        {comparison && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-start gap-3">
              <div
                className={clsx(
                  "rounded-lg p-2.5",
                  comparison.expenseChange > 0
                    ? "bg-red-500/10"
                    : "bg-emerald-500/10",
                )}
              >
                {comparison.expenseChange > 0 ? (
                  <TrendingUp size={18} className="text-red-400" />
                ) : comparison.expenseChange < 0 ? (
                  <TrendingDown size={18} className="text-emerald-400" />
                ) : (
                  <Minus size={18} className="text-zinc-400" />
                )}
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                  vs Last Month
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  {comparison.expenseChange > 0 ? "+" : ""}
                  {formatCurrency(Math.abs(comparison.expenseChange))}
                </p>
                <p
                  className={clsx(
                    "text-sm font-medium",
                    comparison.expenseChange > 0
                      ? "text-red-400"
                      : "text-emerald-400",
                  )}
                >
                  {comparison.expenseChange > 0 ? "More" : "Less"} spent in{" "}
                  {comparison.currentMonth.month}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Monthly Bar Chart */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="mb-4">
          <h2 className="font-semibold text-white">
            Monthly Income vs Expenses
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Side-by-side comparison
          </p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={monthly}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="income"
              fill="#34d399"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="expenses"
              fill="#f87171"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="mb-4">
          <h2 className="font-semibold text-white">Category Analysis</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Spending ranked by amount
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {breakdown.map((item, index) => (
            <div key={item.category} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-600 w-4">{index + 1}</span>
                  <span className="text-zinc-300">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 text-xs">
                    {item.percentage}%
                  </span>
                  <span className="text-zinc-200 font-medium text-xs">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-zinc-800">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
