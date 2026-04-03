"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "bg-orange-500/10 text-orange-400",
  Transport: "bg-blue-500/10 text-blue-400",
  Shopping: "bg-pink-500/10 text-pink-400",
  Entertainment: "bg-purple-500/10 text-purple-400",
  Health: "bg-red-500/10 text-red-400",
  Housing: "bg-yellow-500/10 text-yellow-400",
  Utilities: "bg-cyan-500/10 text-cyan-400",
  Salary: "bg-emerald-500/10 text-emerald-400",
  Freelance: "bg-teal-500/10 text-teal-400",
  Investment: "bg-indigo-500/10 text-indigo-400",
  Other: "bg-zinc-500/10 text-zinc-400",
};

export default function RecentTransactions() {
  const { transactions } = useFinanceStore();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Recent Transactions</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest activity
          </p>
        </div>
        <Link
          href="/transactions"
          className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-border">
        {recent.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between py-3 gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={clsx(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  t.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10",
                )}
              >
                {t.type === "income" ? (
                  <ArrowUpRight size={14} className="text-emerald-400" />
                ) : (
                  <ArrowDownRight size={14} className="text-red-400" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {t.description}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={clsx(
                      "rounded px-1.5 py-0.5 text-xs font-medium",
                      CATEGORY_COLORS[t.category] ||
                        "bg-secondary text-muted-foreground",
                    )}
                  >
                    {t.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(t.date)}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={clsx(
                "shrink-0 text-sm font-semibold",
                t.type === "income" ? "text-emerald-400" : "text-red-400",
              )}
            >
              {t.type === "income" ? "+" : "-"}
              {formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
