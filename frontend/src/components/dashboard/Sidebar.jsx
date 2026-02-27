import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    console.log('done');
    navigate("/login");
  };

  return (
    <aside className="w-56 bg-gradient-to-b from-[#0F172A] to-[#020617] text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
          <i className="ri-checkbox-circle-line text-xl"></i>
        </div>
        <div>
          <h1 className="font-semibold text-sm">TaskFlow</h1>
          <p className="text-xs text-gray-400">Smart Management</p>
        </div>
      </div>

      {/* Menu Title */}
      <div className="px-4 text-xs text-gray-500 uppercase tracking-wide mt-6 mb-3">
        Main Menu
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-1 flex-1">
        <SidebarItem to="/dashboard" icon="ri-dashboard-line" text="Dashboard" />
        <SidebarItem to="/taskboard" icon="ri-kanban-view" text="Task Board" />
        <SidebarItem to="/analytics" icon="ri-bar-chart-box-line" text="Analytics" />
        <SidebarItem to="/important-tasks" icon="ri-star-line" text="Important" />
      </nav>

      {/* 🔥 Logout Section */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
        >
          <i className="ri-logout-box-line"></i>
          Logout
        </button>
      </div>

    </aside>
  );
}

function SidebarItem({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
          isActive
            ? "bg-purple-600 text-white"
            : "text-gray-400 hover:bg-white/10"
        }`
      }
    >
      <i className={`${icon} text-lg`} />
      {text}
    </NavLink>
  );
}