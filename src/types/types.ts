export type TransactionType = "income" | "expense";

export type Category =
  | "Food & Dining"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Health"
  | "Housing"
  | "Utilities"
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Other";

export type Role = "admin" | "viewer";

export interface Transaction {
  id: string;
  date: string; // ISO string
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryBreakdown {
  category: Category;
  amount: number;
  percentage: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      category: string;
      amount: number;
      percentage: number;
    };
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

