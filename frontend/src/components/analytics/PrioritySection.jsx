function Priority({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`${color} h-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function PrioritySection({ data }) {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
      <h2 className="font-semibold mb-4">Tasks by Priority</h2>
      <div className="space-y-4">
        <Priority label="High Priority" percent={data.high} color="bg-red-500" />
        <Priority label="Medium Priority" percent={data.medium} color="bg-orange-400" />
        <Priority label="Low Priority" percent={data.low} color="bg-green-400" />
      </div>
    </div>
  );
}