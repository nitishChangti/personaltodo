export default function BoardFilters({ search, setSearch, priority, setPriority }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 mb-6">
      <div className="flex-1 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
        <input
          placeholder="Search tasks..."
          className="bg-transparent outline-none w-full text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}