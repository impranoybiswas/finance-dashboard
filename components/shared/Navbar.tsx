"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Role } from "@/types/types";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Shield,
  Eye,
} from "lucide-react";
import clsx from "clsx";

import { ThemeToggle } from "./ThemeToggle";
import StorageActions from "./StorageActions";

const navLinks = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/insights", label: "Insights", icon: Lightbulb },
];

export default function Navbar() {
  const pathname = usePathname();
  const { role, setRole } = useFinanceStore();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md text-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-zinc-950 font-bold text-sm">
            F
          </div>
          <span className="font-semibold tracking-tight hidden sm:block">
            FinanceBoard
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
              )}
            >
              <Icon size={15} />
              <span className="hidden sm:block">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Action area */}
        <div className="flex items-center gap-3">
          <StorageActions />
          <ThemeToggle />

          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2 py-1.5">
            {role === "admin" ? (
              <Shield size={14} className="text-amber-500" />
            ) : (
              <Eye size={14} className="text-blue-500" />
            )}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="bg-transparent text-sm text-foreground/80 outline-none cursor-pointer"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
