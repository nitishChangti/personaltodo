export default function TopBar() {
  return (
    <div className="w-full bg-white px-6 py-3 flex items-center justify-between border-b">
      {/* Search */}
      <div className="relative w-[360px]">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-12 py-2 rounded-xl bg-slate-100 text-sm outline-none focus:ring-2 focus:ring-orange-300"
        />
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md">
          ⌘K
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <i className="ri-notification-3-line text-xl text-slate-600"></i>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-slate-700">
            Demo User
          </span>
          <i className="ri-arrow-down-s-line text-slate-400"></i>
        </div>
      </div>
    </div>
  );
}