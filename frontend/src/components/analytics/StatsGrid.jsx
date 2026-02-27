function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
    </div>
  );
}

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <StatCard title="Total Tasks" value={stats.total} />
      <StatCard title="Completed" value={stats.completed} />
      <StatCard title="Overdue" value={stats.overdue} />
      <StatCard title="Completion Rate" value={`${stats.completionRate}%`} />
    </div>
  );
}