/**
 * App-wide constants
 * Add shared constants here (categories, roles, config values, etc.)
 */

export const APP_NAME = "FinanceBoard";

export const TRANSACTION_CATEGORIES = [
  "Housing",
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Income",
  "Other",
] as const;

export const ROLES = ["viewer", "admin"] as const;
