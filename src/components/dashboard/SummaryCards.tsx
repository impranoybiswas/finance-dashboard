"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  formatCurrency,
} from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import clsx from "clsx";
import { motion } from "motion/react";

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
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      valueColor: balance >= 0 ? "text-primary" : "text-red-400",
      trend: null,
      sub: "Net position",
    },
    {
      label: "Total Income",
      value: formatCurrency(income),
      icon: TrendingUp,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      valueColor: "text-foreground",
      trend: {
        icon: ArrowUpRight,
        color: "text-emerald-400",
        label: "All time",
      },
      sub: "All sources",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(expenses),
      icon: TrendingDown,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
      valueColor: "text-foreground",
      trend: {
        icon: ArrowDownRight,
        color: "text-red-400",
        label: "All categories",
      },
      sub: "All categories",
    },
    {
      label: "Savings Rate",
      value: income > 0 ? `${Math.round((balance / income) * 100)}%` : "0%",
      icon: Wallet,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      valueColor: "text-foreground",
      trend: null,
      sub: "Of total income",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="glass glass-hover rounded-2xl p-6 group cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  {card.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p
                    className={clsx(
                      "text-2xl font-black tracking-tight transition-all duration-300",
                      card.valueColor,
                      card.label === "Total Balance" && "text-gradient",
                    )}
                  >
                    {card.value}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  {card.trend && (
                    <div
                      className={clsx(
                        "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-current/10",
                        card.trend.color,
                      )}
                    >
                      <card.trend.icon size={10} className="mr-0.5" />
                      {card.trend.label}
                    </div>
                  )}
                  <span className="text-[10px] font-medium text-muted-foreground/60">
                    {card.sub}
                  </span>
                </div>
              </div>
              <div
                className={clsx(
                  "rounded-xl p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner",
                  card.iconBg,
                  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
                )}
              >
                <Icon
                  size={20}
                  className={clsx(card.iconColor, "drop-shadow-sm")}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
