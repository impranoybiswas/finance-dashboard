"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { getTotalIncome, getTotalExpenses, getBalance, formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import clsx from "clsx";

export default function SummaryCards() {
  const { transactions } = useFinanceStore();

  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);
  const balance = getBalance(transactions);

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance),
      icon: Wallet,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      valueColor: balance >= 0 ? "text-emerald-400" : "text-red-400",
      trend: null,
      sub: "Net position",
    },
    {
      label: "Total Income",
      value: formatCurrency(income),
      icon: TrendingUp,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      valueColor: "text-white",
      trend: { icon: ArrowUpRight, color: "text-emerald-400", label: "All time" },
      sub: "All sources",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(expenses),
      icon: TrendingDown,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
      valueColor: "text-white",
      trend: { icon: ArrowDownRight, color: "text-red-400", label: "All categories" },
      sub: "All categories",
    },
    {
      label: "Savings Rate",
      value: income > 0 ? `${Math.round((balance / income) * 100)}%` : "0%",
      icon: Wallet,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      valueColor: "text-white",
      trend: null,
      sub: "Of total income",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  {card.label}
                </p>
                <p className={clsx("mt-2 text-2xl font-bold tracking-tight", card.valueColor)}>
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-zinc-600">{card.sub}</p>
              </div>
              <div className={clsx("rounded-lg p-2.5", card.iconBg)}>
                <Icon size={18} className={card.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}