# FinanceBoard — Premium Finance Dashboard

A clean, interactive, and high-performance finance dashboard built with Next.js, Zustand, and Recharts. Track your income, expenses, and savings with ease.

## ✨ Features

- **Financial Summary**: Real-time overview of Total Balance, Income, Expenses, and Savings rate.
- **Interactive Charts**:
  - **Balance Trend**: Monthly income vs expenses visualization using area charts.
  - **Spending Breakdown**: Categorical expense analysis with interactive pie charts.
  - **Monthly Insights**: Side-by-side comparison bar charts.
- **Transaction Management**:
  - Full CRUD operations (Add, Edit, Delete).
  - Advanced filtering by Search, Category, and Transaction Type.
  - Multi-criteria sorting (Date, Amount).
- **Role-Based UI**:
  - **Admin**: Full access to manage transactions.
  - **Viewer**: Read-only access to insights and data.
- **Insights Engine**: Automatically calculates highest spending categories and monthly comparisons.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Dark Mode**: Sleek zinc-based dark theme for a premium feel.
- **State Persistence**: Data is saved to local storage, ensuring your progress is never lost.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Fonts**: [Geist](https://vercel.com/font)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Architecture Notes

- **Store**: Uses Zustand's `persist` middleware for easy state management and local storage synchronization.
- **Components**: Modular and atomic design pattern used for reusability.
- **Utilities**: Centralized logic in `lib/utils.ts` for financial calculations and data transformations.
- **Role Simulation**: Controlled via a global state toggle in the Navbar, demonstrating dynamic UI adaptation.

---

Built with ❤️ for excellence in financial tracking.
