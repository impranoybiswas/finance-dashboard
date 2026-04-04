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
    <div className="glass rounded-2xl p-6 group transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
            Recent Transactions
          </h2>
          <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-widest mt-1">
            Latest activity
          </p>
        </div>
        <Link
          href="/transactions"
          className="text-xs font-black text-primary/80 hover:text-primary transition-all hover:gap-2 flex items-center gap-1 group/link"
        >
          View all <span>→</span>
        </Link>
      </div>

      <div className="space-y-1">
        {recent.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-muted/30 transition-all duration-300 group/item cursor-default border border-transparent hover:border-border/40"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div
                className={clsx(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-all group-hover/item:scale-110 group-hover/item:rotate-3",
                  t.type === "income"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500",
                )}
              >
                {t.type === "income" ? (
                  <ArrowUpRight size={18} />
                ) : (
                  <ArrowDownRight size={18} />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                  {t.description}
                </p>
                <div className="flex items-center gap-2.5 mt-1">
                  <span
                    className={clsx(
                      "rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter shadow-sm",
                      CATEGORY_COLORS[t.category] ||
                        "bg-secondary text-muted-foreground",
                    )}
                  >
                    {t.category}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                    {formatDate(t.date)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p
                className={clsx(
                  "text-base font-black tabular-nums transition-all group-hover/item:scale-110 origin-right",
                  t.type === "income" ? "text-emerald-500" : "text-red-500",
                )}
              >
                {t.type === "income" ? "+" : "-"}
                {formatCurrency(t.amount)}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter">
                {t.type === "income" ? "Settled" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
