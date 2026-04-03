"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { Category, TransactionType } from "@/types/types";
import { Search, X } from "lucide-react";

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
  const { filters, setFilter, resetFilters } = useFinanceStore();
  const hasActiveFilters =
    filters.search || filters.category !== "All" || filters.type !== "All";

  return (
    <div className="flex flex-wrap gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Category filter */}
      <select
        value={filters.category}
        onChange={(e) =>
          setFilter("category", e.target.value as Category | "All")
        }
        className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors cursor-pointer"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c === "All" ? "All Categories" : c}
          </option>
        ))}
      </select>

      {/* Type filter */}
      <select
        value={filters.type}
        onChange={(e) =>
          setFilter("type", e.target.value as TransactionType | "All")
        }
        className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 transition-colors cursor-pointer"
      >
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

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
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
      </select>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
        >
          <X size={14} />
          Reset
        </button>
      )}
    </div>
  );
}
