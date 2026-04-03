import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SummaryCards from "@/components/dashboard/SummaryCards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Your financial overview</p>
      </div>

      {/* Summary cards */}
      <SummaryCards />

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BalanceTrendChart />
        </div>
        <div className="xl:col-span-1">
          <SpendingBreakdown />
        </div>
      </div>

      {/* Recent transactions */}
      <RecentTransactions />
    </div>
  );
}
