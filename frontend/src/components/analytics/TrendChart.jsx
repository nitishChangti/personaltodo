import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TrendChart({ data }) {
  return (
    <div className="col-span-2 h-[320px] bg-white rounded-xl shadow-sm p-6">
      <h2 className="font-semibold mb-2">Task Completion Trend</h2>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="created" fill="#a78bfa" />
            <Bar dataKey="completed" fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}