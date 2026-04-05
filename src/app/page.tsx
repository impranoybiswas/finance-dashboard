"use client";

import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function DashboardPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 pb-10"
    >
      {/* Page title */}
      <motion.div
        variants={item}
        className="text-sm font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1.5 ml-0.5"
      >
        Financial Intelligence Dashboard
      </motion.div>

      {/* Summary cards */}
      <motion.div variants={item}>
        <SummaryCards />
      </motion.div>

      {/* Charts row */}
      <div className="flex flex-col gap-6 md:flex-row">
        <motion.div variants={item} className="flex-3">
          <BalanceTrendChart />
        </motion.div>
        <motion.div variants={item} className="flex-2">
          <SpendingBreakdown />
        </motion.div>
      </div>

      {/* Recent transactions */}
      <motion.div variants={item}>
        <RecentTransactions />
      </motion.div>
    </motion.div>
  );
}
