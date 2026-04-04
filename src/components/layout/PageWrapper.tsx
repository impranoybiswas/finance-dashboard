"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { useHasHydrated } from "@/hooks/useHasHydrated";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
