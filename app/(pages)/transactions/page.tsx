"use client";

import { useState } from "react";
import FilterBar from "@/components/transactions/FilterBar";
import TransactionTable from "@/components/transactions/TransactionTable";
import TransactionModal from "@/components/transactions/TransactionModal";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Plus, Shield } from "lucide-react";

export default function TransactionsPage() {
  const { role, getFilteredTransactions } = useFinanceStore();
  const isAdmin = role === "admin";
  const [showModal, setShowModal] = useState(false);
  const count = getFilteredTransactions().length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Transactions</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {count} transaction{count !== 1 ? "s" : ""} found
          </p>
        </div>
        {isAdmin ? (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400 transition-colors shrink-0"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        ) : (
          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-500">
            <Shield size={12} />
            Viewer mode — switch to Admin to add
          </div>
        )}
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Table */}
      <TransactionTable />

      {/* Add modal */}
      {showModal && <TransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}