import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction, Role, Category, TransactionType } from "@/types/types";
import { mockTransactions } from "@/lib/mockData";

interface Filters {
  search: string;
  category: Category | "All";
  type: TransactionType | "All";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

interface FinanceStore {
  transactions: Transaction[];
  role: Role;
  filters: Filters;

  setRole: (role: Role) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (
    id: string,
    data: Partial<Omit<Transaction, "id">>,
  ) => void;
  deleteTransaction: (id: string) => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  getFilteredTransactions: () => Transaction[];
  resetStore: () => void;
  importData: (transactions: Transaction[]) => void;
}

const defaultFilters: Filters = {
  search: "",
  category: "All",
  type: "All",
  sortBy: "date",
  sortOrder: "desc",
};

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: "viewer",
      filters: defaultFilters,

      setRole: (role) => set({ role }),

      addTransaction: (data) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...data, id: crypto.randomUUID() },
          ],
        })),

      updateTransaction: (id, data) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t,
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q),
          );
        }

        if (filters.category !== "All") {
          result = result.filter((t) => t.category === filters.category);
        }

        if (filters.type !== "All") {
          result = result.filter((t) => t.type === filters.type);
        }

        result.sort((a, b) => {
          if (filters.sortBy === "date") {
            const diff =
              new Date(a.date).getTime() - new Date(b.date).getTime();
            return filters.sortOrder === "asc" ? diff : -diff;
          } else {
            const diff = a.amount - b.amount;
            return filters.sortOrder === "asc" ? diff : -diff;
          }
        });

        return result;
      },

      resetStore: () =>
        set({
          transactions: mockTransactions,
          role: "viewer",
          filters: defaultFilters,
        }),

      importData: (transactions) =>
        set({
          transactions: transactions,
        }),
    }),
    {
      name: "finance-dashboard-store",
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
      }),
    },
  ),
);
