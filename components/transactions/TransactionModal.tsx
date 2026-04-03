"use client";

import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Transaction, Category, TransactionType } from "@/types/types";
import { X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES: Category[] = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Housing",
  "Utilities",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

interface Props {
  transaction?: Transaction;
  onClose: () => void;
}

export default function TransactionModal({ transaction, onClose }: Props) {
  const { addTransaction, updateTransaction } = useFinanceStore();
  const isEditing = !!transaction;

  const [form, setForm] = useState({
    description: transaction?.description ?? "",
    amount: transaction?.amount?.toString() ?? "",
    category: transaction?.category ?? "Food & Dining",
    type: transaction?.type ?? "expense",
    date: transaction?.date ?? new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");

  function handleSubmit() {
    if (!form.description.trim()) return setError("Description is required");
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      return setError("Enter a valid amount");

    const data = {
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category as Category,
      type: form.type as TransactionType,
      date: form.date,
    };

    if (isEditing) {
      updateTransaction(transaction.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  }

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold text-foreground">
              {isEditing ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col gap-4">
            {/* Type toggle */}
            <div className="flex rounded-lg border border-border p-1 gap-1">
              {(["expense", "income"] as TransactionType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                  className={clsx(
                    "flex-1 rounded-md py-1.5 text-sm font-medium capitalize transition-colors",
                    form.type === t
                      ? t === "income"
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Description
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="e.g. Monthly salary"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Amount (BDT)
              </label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                placeholder="0"
                min="0"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value as Category,
                  }))
                }
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-border px-5 py-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-primary/90 transition-colors"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
