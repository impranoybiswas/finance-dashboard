import { Transaction, MonthlyData, CategoryBreakdown, Category } from "@/types/types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthMap: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (!monthMap[key]) monthMap[key] = { income: 0, expenses: 0 };
    if (t.type === "income") monthMap[key].income += t.amount;
    else monthMap[key].expenses += t.amount;
  });

  return Object.entries(monthMap).map(([month, data]) => ({
    month,
    income: data.income,
    expenses: data.expenses,
    balance: data.income - data.expenses,
  }));
}

export function getCategoryBreakdown(transactions: Transaction[]): CategoryBreakdown[] {
  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);
  const categoryMap: Partial<Record<Category, number>> = {};

  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  return Object.entries(categoryMap)
    .map(([category, amount]) => ({
      category: category as Category,
      amount: amount!,
      percentage: total > 0 ? Math.round((amount! / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getHighestSpendingCategory(transactions: Transaction[]): CategoryBreakdown | null {
  const breakdown = getCategoryBreakdown(transactions);
  return breakdown[0] || null;
}

export function getMonthlyComparison(transactions: Transaction[]) {
  const monthly = getMonthlyData(transactions);
  if (monthly.length < 2) return null;
  const last = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  return {
    currentMonth: last,
    previousMonth: prev,
    expenseChange: last.expenses - prev.expenses,
    incomeChange: last.income - prev.income,
  };
}