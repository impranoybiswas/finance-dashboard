"use client";

import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Transaction } from "@/types/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Trash2, Pencil, ArrowUpRight, ArrowDownRight } from "lucide-react";
import clsx from "clsx";
import TransactionModal from "./TransactionModal";
import { motion, AnimatePresence } from "motion/react";

const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "bg-orange-500/10 text-orange-400",
  Transport: "bg-blue-500/10 text-blue-400",
  Shopping: "bg-pink-500/10 text-pink-400",
  Entertainment: "bg-purple-500/10 text-purple-400",
  Health: "bg-red-500/10 text-red-400",
  Housing: "bg-indigo-500/10 text-indigo-400",
  Utilities: "bg-cyan-500/10 text-cyan-400",
  Salary: "bg-emerald-500/10 text-emerald-400",
  Freelance: "bg-teal-500/10 text-teal-400",
  Investment: "bg-yellow-500/10 text-yellow-400",
  Other: "bg-zinc-500/10 text-zinc-400",
};

export default function TransactionTable() {
  const { role, getFilteredTransactions, deleteTransaction } =
    useFinanceStore();
  const isAdmin = role === "admin";
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const transactions = getFilteredTransactions();

  return (
    <div className="space-y-4">
      {/* Desktop view */}
      <div className="hidden lg:block overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <AnimatePresence mode="popLayout">
              {transactions.map((t) => (
                <motion.tr
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key={t.id}
                  className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {t.description}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={clsx(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        CATEGORY_COLORS[t.category] ||
                          "bg-zinc-500/10 text-zinc-400",
                      )}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td
                    className={clsx(
                      "px-6 py-4 font-semibold whitespace-nowrap",
                      t.type === "income"
                        ? "text-emerald-500"
                        : "text-foreground",
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {t.type === "income" ? (
                        <ArrowUpRight size={14} className="text-emerald-500" />
                      ) : (
                        <ArrowDownRight size={14} className="text-red-400" />
                      )}
                      {t.type === "income" ? "+" : "-"}
                      {formatCurrency(t.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => setEditingTransaction(t)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(t.id)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="grid grid-cols-1 gap-3 lg:hidden pb-20">
        <AnimatePresence mode="popLayout">
          {transactions.map((t) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={t.id}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        CATEGORY_COLORS[t.category] ||
                          "bg-zinc-500/10 text-zinc-400",
                      )}
                    >
                      {t.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {formatDate(t.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground leading-tight">
                    {t.description}
                  </h3>
                </div>
                <div className="text-right space-y-1">
                  <p
                    className={clsx(
                      "font-bold",
                      t.type === "income"
                        ? "text-emerald-500"
                        : "text-foreground",
                    )}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {formatCurrency(t.amount)}
                  </p>
                  {isAdmin && (
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditingTransaction(t)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {editingTransaction && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
}
