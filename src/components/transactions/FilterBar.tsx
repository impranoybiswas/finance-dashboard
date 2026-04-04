"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { Category, TransactionType } from "@/types/types";
import { Search, X, ChevronDown, Filter, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

const CATEGORIES: (Category | "All")[] = [
  "All",
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

export default function FilterBar() {
  const { filters, setFilter, resetFilters, groupBy, setGroupBy } =
    useFinanceStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    filters.search ||
    filters.category !== "All" ||
    filters.type !== "All" ||
    filters.startDate ||
    filters.endDate ||
    filters.minAmount ||
    filters.maxAmount;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Global Selects */}
        <div className="flex items-center gap-2">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilter("category", e.target.value as Category | "All")
            }
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "Categories" : c}
              </option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) =>
              setFilter("type", e.target.value as TransactionType | "All")
            }
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors cursor-pointer"
          >
            <option value="All">Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* More Filters button */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={clsx(
            "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors",
            showAdvanced
              ? "bg-primary/10 border-primary/30 text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Filter size={14} />
          <span className="hidden sm:inline">Filters</span>
          <ChevronDown
            size={14}
            className={clsx(
              "transition-transform duration-200",
              showAdvanced && "rotate-180",
            )}
          />
        </button>

        {/* Sort */}
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [by, order] = e.target.value.split("-") as [
              "date" | "amount",
              "asc" | "desc",
            ];
            setFilter("sortBy", by);
            setFilter("sortOrder", order);
          }}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors cursor-pointer"
        >
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="amount-desc">Highest</option>
          <option value="amount-asc">Lowest</option>
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Reset Filters"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl border border-border/50 bg-secondary/20 p-4">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Date Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={filters.startDate || ""}
                    onChange={(e) => setFilter("startDate", e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="date"
                    value={filters.endDate || ""}
                    onChange={(e) => setFilter("endDate", e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              {/* Amount Range */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Amount Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minAmount || ""}
                    onChange={(e) => setFilter("minAmount", e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAmount || ""}
                    onChange={(e) => setFilter("maxAmount", e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              {/* Grouping */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  View Mode
                </label>
                <div className="flex items-center gap-2 p-1 rounded-lg border border-border bg-card">
                  {(["none", "category", "date"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setGroupBy(mode)}
                      className={clsx(
                        "flex-1 flex items-center justify-center gap-1.5 rounded-md py-1 text-[10px] font-bold uppercase transition-all",
                        groupBy === mode
                          ? "bg-primary text-zinc-950 shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {mode === "none" && <LayoutGrid size={10} />}
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
