"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import {
  getHighestSpendingCategory,
  getMonthlyComparison,
  getCategoryBreakdown,
  formatCurrency,
  getBalance,
  getTotalIncome,
} from "@/lib/utils";
import {
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  PieChart,
} from "lucide-react";
import clsx from "clsx";
import { motion } from "motion/react";

export default function InsightsContent() {
  const { transactions } = useFinanceStore();

  const highestCategory = getHighestSpendingCategory(transactions);
  const comparison = getMonthlyComparison(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions).slice(0, 8);
  const balance = getBalance(transactions);
  const totalIncome = getTotalIncome(transactions);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Highest spending */}
        {highestCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-red-500/10 p-2.5">
                <AlertCircle size={18} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Highest Category
                </h3>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {highestCategory.category}
                </p>
                <p className="mt-0.5 text-sm text-red-400 font-medium">
                  {formatCurrency(highestCategory.amount)} spent
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Overall Balance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-start gap-3">
            <div
              className={clsx(
                "rounded-lg p-2.5",
                balance >= 0 ? "bg-emerald-500/10" : "bg-red-500/10",
              )}
            >
              {balance >= 0 ? (
                <CheckCircle2 size={18} className="text-emerald-400" />
              ) : (
                <AlertCircle size={18} className="text-red-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Overall Balance
              </h3>
              <p className="mt-1 text-lg font-bold text-foreground">
                {balance >= 0 ? "Positive Portfolio" : "Negative Portfolio"}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <p
                  className={clsx(
                    "text-sm font-medium",
                    balance >= 0 ? "text-emerald-400" : "text-red-400",
                  )}
                >
                  {formatCurrency(Math.abs(balance))}{" "}
                  {balance >= 0 ? "surplus" : "deficit"}
                </p>
                {totalIncome > 0 && balance > 0 && (
                  <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">
                    {Math.round((balance / totalIncome) * 100)}% Saved
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Total Income */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2.5">
              <TrendingUp size={18} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Total Revenue
              </h3>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatCurrency(totalIncome)}
              </p>
              <p className="mt-0.5 text-sm text-emerald-400 font-medium">
                Lifetime earnings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Monthly comparison */}
        {comparison && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start gap-3">
              <div
                className={clsx(
                  "rounded-lg p-2.5",
                  comparison.expenseChange <= 0
                    ? "bg-emerald-500/10"
                    : "bg-red-500/10",
                )}
              >
                {comparison.expenseChange <= 0 ? (
                  <TrendingDown size={18} className="text-emerald-400" />
                ) : (
                  <TrendingUp size={18} className="text-red-400" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Expense Trend
                </h3>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatCurrency(Math.abs(comparison.expenseChange))}{" "}
                  {comparison.expenseChange <= 0 ? "Less" : "More"}
                </p>
                <p
                  className={clsx(
                    "mt-0.5 text-sm font-medium",
                    comparison.expenseChange <= 0
                      ? "text-emerald-400"
                      : "text-red-400",
                  )}
                >
                  Compared to previous month
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Category breakdown table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <div className="mb-6 flex items-center gap-2">
          <PieChart size={20} className="text-primary" />
          <h2 className="font-semibold text-foreground">Category Analysis</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {categoryBreakdown.map((cat, idx) => (
            <div key={cat.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">
                  {cat.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {formatCurrency(cat.amount)}
                  </span>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                    {cat.percentage}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cat.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.4 + idx * 0.05,
                    ease: "easeOut",
                  }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
