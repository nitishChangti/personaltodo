export default function AnalyticsHeader({ range, setRange }) {
  return (
    <div className="flex justify-between mb-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <div className="flex gap-2">
        <FilterBtn active={range === 7} onClick={() => setRange(7)}>
          Last 7 Days
        </FilterBtn>
        <FilterBtn active={range === 30} onClick={() => setRange(30)}>
          Last 30 Days
        </FilterBtn>
        <FilterBtn active={range === 90} onClick={() => setRange(90)}>
          Last 90 Days
        </FilterBtn>
      </div>
    </div>
  );
}

function FilterBtn({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-white shadow-sm text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}