export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <div
            className="absolute inset-0 rounded-full border-4 border-[var(--border)]"
            style={{ borderTopColor: "var(--brand-500, #F97316)" }}
          >
            <style>{`
              @keyframes tf-spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
          <div
            className="absolute inset-0 rounded-full border-4 border-[var(--border)]"
            style={{
              borderTopColor: "var(--brand-500, #F97316)",
              animation: "tf-spin 0.8s linear infinite",
            }}
          />
        </div>
        <p className="text-sm text-[var(--text-secondary)]">Loading...</p>
      </div>
    </div>
  );
}
