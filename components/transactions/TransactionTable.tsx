"use client";

import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Transaction } from "@/types/types";

import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import clsx from "clsx";
import TransactionModal from "./Transactionmodal";


const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "bg-orange-500/10 text-orange-400",
  "Transport": "bg-blue-500/10 text-blue-400",
  "Shopping": "bg-pink-500/10 text-pink-400",
  "Entertainment": "bg-purple-500/10 text-purple-400",
  "Health": "bg-red-500/10 text-red-400",
  "Housing": "bg-yellow-500/10 text-yellow-400",
  "Utilities": "bg-cyan-500/10 text-cyan-400",
  "Salary": "bg-emerald-500/10 text-emerald-400",
  "Freelance": "bg-teal-500/10 text-teal-400",
  "Investment": "bg-indigo-500/10 text-indigo-400",
  "Other": "bg-zinc-500/10 text-zinc-400",
};

export default function TransactionTable() {
  const { role, deleteTransaction, getFilteredTransactions } = useFinanceStore();
  const isAdmin = role === "admin";
  const transactions = getFilteredTransactions();
  const [editing, setEditing] = useState<Transaction | null>(null);

  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-16 text-center">
        <p className="text-zinc-500 text-sm">No transactions found.</p>
        <p className="text-zinc-600 text-xs mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <>
      {editing && (
        <TransactionModal transaction={editing} onClose={() => setEditing(null)} />
      )}

      {/* Desktop table */}
      <div className="hidden md:block rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              {["Date", "Description", "Category", "Type", "Amount", ...(isAdmin ? ["Actions"] : [])].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="px-4 py-3 text-sm text-zinc-400 whitespace-nowrap">
                  {formatDate(t.date)}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-200">{t.description}</td>
                <td className="px-4 py-3">
                  <span
                    className={clsx(
                      "rounded px-2 py-0.5 text-xs font-medium",
                      CATEGORY_COLORS[t.category] || "bg-zinc-700 text-zinc-300"
                    )}
                  >
                    {t.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={clsx(
                      "flex items-center gap-1 text-xs font-medium capitalize w-fit",
                      t.type === "income" ? "text-emerald-400" : "text-red-400"
                    )}
                  >
                    {t.type === "income" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {t.type}
                  </span>
                </td>
                <td
                  className={clsx(
                    "px-4 py-3 text-sm font-semibold whitespace-nowrap",
                    t.type === "income" ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </td>
                {isAdmin && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(t)}
                        className="rounded p-1.5 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="rounded p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-200 text-sm">{t.description}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span
                    className={clsx(
                      "rounded px-1.5 py-0.5 text-xs font-medium",
                      CATEGORY_COLORS[t.category] || "bg-zinc-700 text-zinc-300"
                    )}
                  >
                    {t.category}
                  </span>
                  <span className="text-xs text-zinc-600">{formatDate(t.date)}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={clsx(
                    "font-semibold text-sm",
                    t.type === "income" ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </p>
                {isAdmin && (
                  <div className="flex items-center gap-1 mt-2 justify-end">
                    <button
                      onClick={() => setEditing(t)}
                      className="rounded p-1 text-zinc-500 hover:text-blue-400"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="rounded p-1 text-zinc-500 hover:text-red-400"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}