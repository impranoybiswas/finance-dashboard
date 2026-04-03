import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SummaryCards from "@/components/dashboard/SummaryCards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Your financial overview
        </p>
      </div>

      {/* Summary cards */}
      <SummaryCards />

      {/* Charts row */}
      <div className="flex flex-col gap-6 md:flex-row ">
        <div className="flex-2">
          <BalanceTrendChart />
        </div>
        <div className="flex-1">
          <SpendingBreakdown />
        </div>
      </div>

      {/* Recent transactions */}
      <RecentTransactions />
    </div>
  );
}
