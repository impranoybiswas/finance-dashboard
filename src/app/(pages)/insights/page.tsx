import InsightsContent from "@/components/insights/InsightsContent";

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-white">Insights</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Understand your spending patterns</p>
      </div>
      <InsightsContent />
    </div>
  );
}