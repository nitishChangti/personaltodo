import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTasksAdmin,
  deleteTaskAdmin,
  updateTaskAdmin,
} from "../../store/taskSlice";
import {
  fetchAllUsersAdmin,
  deleteUserAdmin,
} from "../../store/userSlice";
import { logoutUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiSearch, FiLogOut } from "react-icons/fi";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: tasks, loading: taskLoading } = useSelector(
    (state) => state.tasks
  );
  const { list: users, loading: userLoading } = useSelector(
    (state) => state.users
  );

  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllTasksAdmin());
    dispatch(fetchAllUsersAdmin());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  // ===== SEARCH FILTER =====
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  // ===== Dashboard Stats =====
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  ).length;
  const overdueTasks = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "Completed"
  ).length;
  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);
  const totalUsers = users.length;
  const adminCount = users.filter(
    (u) => u.role === "admin"
  ).length;

  if (taskLoading || userLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Users"
          value={totalUsers}
          subtitle={`Admins: ${adminCount}`}
        />
        <Card
          title="Total Tasks"
          value={totalTasks}
          subtitle="Across all users"
        />
        <Card
          title="Overdue Tasks"
          value={overdueTasks}
          subtitle="Needs attention"
          valueColor="text-red-500"
          subtitleColor="text-red-400"
        />
        <CompletionCard
          completionRate={completionRate}
        />
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex gap-4 mb-6">
          <TabButton
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            label="Users"
          />
          <TabButton
            active={activeTab === "tasks"}
            onClick={() => setActiveTab("tasks")}
            label="Tasks"
          />
        </div>

        {activeTab === "users" ? (
          <UserTable users={filteredUsers} />
        ) : (
          <TaskTable tasks={filteredTasks} />
        )}
      </div>
    </div>
  );
}

/* ================= CARDS ================= */

function Card({
  title,
  value,
  subtitle,
  valueColor = "",
  subtitleColor = "text-gray-400",
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <p className="text-gray-500 text-sm">
        {title}
      </p>
      <h2
        className={`text-2xl font-semibold mt-2 ${valueColor}`}
      >
        {value}
      </h2>
      <p
        className={`text-xs mt-1 ${subtitleColor}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function CompletionCard({ completionRate }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <p className="text-gray-500 text-sm">
        Completion Rate
      </p>
      <h2 className="text-2xl font-semibold mt-2">
        {completionRate}%
      </h2>
      <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
        <div
          className="bg-purple-500 h-2 rounded-full"
          style={{
            width: `${completionRate}%`,
          }}
        />
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${
        active
          ? "bg-purple-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ================= USERS TABLE ================= */

function UserTable({ users }) {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] =
    useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      dispatch(deleteUserAdmin(id));
    }
  };

  return (
    <>
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">
                Name
              </th>
              <th className="px-6 py-4 text-left">
                Email
              </th>
              <th className="px-6 py-4 text-left">
                Role
              </th>
              <th className="px-6 py-4 text-left">
                Joined
              </th>
              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.role}
                </td>
                <td className="px-6 py-4">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() =>
                      setSelectedUser(user)
                    }
                    className="text-blue-500 mr-3"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ================= TASK TABLE ================= */

function TaskTable({ tasks }) {
  const dispatch = useDispatch();
  const [editTask, setEditTask] =
    useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTaskAdmin(id));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateTaskAdmin({
        id: editTask._id,
        data: editTask,
      })
    );
    setEditTask(null);
  };

  return (
    <>
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">
                Title
              </th>
              <th className="px-6 py-4 text-left">
                Status
              </th>
              <th className="px-6 py-4 text-left">
                Priority
              </th>
              <th className="px-6 py-4 text-left">
                Due Date
              </th>
              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {task.title}
                </td>
                <td className="px-6 py-4">
                  {task.status}
                </td>
                <td className="px-6 py-4">
                  {task.priority}
                </td>
                <td className="px-6 py-4">
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() =>
                      setEditTask(task)
                    }
                    className="text-green-500 mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(task._id)
                    }
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              Edit Task
            </h2>
            <form
              onSubmit={handleUpdate}
              className="space-y-3"
            >
              <input
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    title: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />
              <button className="px-4 py-2 bg-purple-600 text-white rounded">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}