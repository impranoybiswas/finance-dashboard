# FinanceBoard — Premium Finance Dashboard

A clean, interactive, and high-performance finance dashboard built with Next.js, Zustand, and Recharts. Track your income, expenses, and savings with ease.

## ✨ Features

- **Financial Summary**: Real-time overview of Total Balance, Income, Expenses, and Savings rate (calculated dynamically).
- **Interactive Charts**:
  - **Balance Trend**: Monthly income vs expenses visualization using area charts.
  - **Spending Breakdown**: Categorical expense analysis with interactive pie charts.
  - **Monthly Insights**: Side-by-side comparison bar charts.
- **Advanced Transaction Management**:
  - Full CRUD operations (Add, Edit, Delete).
  - **Advanced Filtering**: Search by description, filter by Category, Type, Date Range, and Amount Range.
  - **Dynamic Grouping**: Organize transactions by Category or Date in both table and card views.
  - **Multi-criteria Sorting**: Date and Amount (Asc/Desc).
- **Role-Based UI**:
  - **Admin**: Full access to manage transactions.
  - **Viewer**: Read-only access to insights and data.
- **Data Portability & Management**:
  - **JSON Export/Import**: Full backup and restore of financial records.
  - **CSV Export**: Download transactions in spreadsheet-ready format.
  - **Storage Reset**: Wipe local data to start fresh.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Premium Aesthetics**:
  - **Modern Themes**: Sleek Light and Dark mode toggle with semantic color variables.
  - **Fluid Animations**: Staggered list entries, chart transitions, and modal effects using Framer Motion.
- **Reliable Persistence**: State synchronization with local storage and SSR hydration safety.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
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


