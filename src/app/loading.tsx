export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      {/* Spinner */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150 animate-pulse" />

        {/* Spinning ring */}
        <div className="relative h-16 w-16 rounded-full border-[3px] border-border">
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary animate-spin"
            style={{ animationDuration: "1s" }}
          />
        </div>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-foreground">Loading</p>
        <p className="text-xs text-muted-foreground">
          Fetching your financial data…
        </p>
      </div>
    </div>
  );
}
