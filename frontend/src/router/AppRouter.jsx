// src/router/AppRouter.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/dashboard.jsx";
import TaskBoard from "../pages/TaskBoard.jsx";
import Protected from "../components/Protected.jsx";
import Login from "../pages/Login.jsx";
import Analytics from "../pages/Analytics.jsx";
import ImportantTasks from "../pages/ImportantTasks.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // handles bootstrapAuth
    children: [
      {
        index: true,
        element: <Home />, // public (or protect if needed)
      },
      {
        path: "register",
        element: (
          <Protected authentication={false}>
            <Register />
          </Protected>
        ),
      },
      {
        path: "login",
        element: (
            <Protected authentication={false}>
                <Login />
            </Protected>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Protected authentication={true}>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "taskboard",
        element: (
          <Protected authentication={true}>
            <TaskBoard />
          </Protected>
        ),
      },
      {
        path: "analytics",
        element: (
          <Protected authentication={true}>
            <Analytics />
          </Protected>
        ),
      },
      {
        path: "important-tasks",
        element: (
          <Protected authentication={true}>
            <ImportantTasks />
          </Protected>
        ),
      },
            {
        path: "admin-dashboard",
        element: (
          <Protected authentication role="admin">
            <AdminDashboard />
          </Protected>
        ),
      },

    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}