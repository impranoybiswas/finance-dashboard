"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { Download, Upload, RotateCcw, Check, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export default function StorageActions() {
  const { transactions, importData, resetStore } = useFinanceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `finance-data-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    setStatus("success");
    setTimeout(() => setStatus("idle"), 2000);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Date", "Description", "Category", "Type", "Amount"];
    const rows = transactions.map((t) => [
      t.id,
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      t.category,
      t.type,
      t.amount,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = `finance-data-${new Date().toISOString().split("T")[0]}.csv`;

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.click();

    setStatus("success");
    setTimeout(() => setStatus("idle"), 2000);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          importData(json);
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
        console.log(err);
      }
      setTimeout(() => setStatus("idle"), 2000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 h-8 px-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <Download size={14} />
        <span className="text-sm font-medium hidden sm:block">Data</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 z-50 rounded-xl border border-border bg-card p-2 shadow-xl"
            >
              <div className="grid gap-1">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <Download size={14} />
                  Export JSON
                </button>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <Download size={14} />
                  Export CSV
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <Upload size={14} />
                  Import JSON
                </button>

                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure? This will reset all your data to defaults.",
                      )
                    ) {
                      resetStore();
                      setIsOpen(false);
                    }
                  }}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <RotateCcw size={14} />
                  Clear Data
                </button>
              </div>

              {status !== "idle" && (
                <div
                  className={clsx(
                    "mt-2 flex items-center justify-center gap-1.5 rounded-lg py-1 text-[10px] font-bold uppercase",
                    status === "success"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400",
                  )}
                >
                  {status === "success" ? (
                    <Check size={10} />
                  ) : (
                    <AlertCircle size={10} />
                  )}
                  {status === "success" ? "Done" : "Error"}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        className="hidden"
      />
    </div>
  );
}
