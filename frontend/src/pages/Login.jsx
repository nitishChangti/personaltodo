// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await dispatch(
    loginUser({ email, password })
  );
  console.log(res);
  if (res.meta.requestStatus === "fulfilled") {
    const loggedUser = res.payload;
    console.log(loggedUser);
    if (loggedUser?.role === "admin") {
      console.log('true admin');
      navigate("/admin-dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F8FAFC]">
      {/* Left Panel */}
      <div className="flex items-center justify-center px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div>
              <h1 className="font-bold text-lg">TaskFlow</h1>
              <p className="text-sm text-gray-500">
                Smart Task Management System
              </p>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">
            Sign in to your account to continue managing your tasks
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  dispatch(clearAuthError());
                }}
                className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  dispatch(clearAuthError());
                }}
                className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <i
                className={`${
                  showPassword ? "ri-eye-off-line" : "ri-eye-line"
                } absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowPassword((p) => !p)}
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <a href="#" className="text-sm text-purple-600 font-medium">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition mb-6 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
              />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475654/github-color.svg"
                className="w-5"
              />
              GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500">
            Do not have an account?{" "}
            <a href="/register" className="text-purple-600 font-medium">
              Create one now
            </a>
          </p>
        </form>
      </div>

      {/* Right Panel (unchanged UI) */}
      <div className="hidden lg:flex flex-col items-center justify-center text-center px-12 bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 text-white">
        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
          <i className="ri-checkbox-multiple-line text-3xl" />
        </div>

        <h2 className="text-4xl font-bold mb-4">Manage Tasks Like a Pro</h2>
        <p className="max-w-md text-white/90 mb-10">
          Streamline your workflow with our intelligent task management system.
          Track progress, analyze performance, and achieve more.
        </p>

        <div className="flex gap-10">
          <Feature icon="ri-drag-move-line" label="Drag & Drop" />
          <Feature icon="ri-bar-chart-line" label="Analytics" />
          <Feature icon="ri-team-line" label="Collaboration" />
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
        <i className={`${icon} text-xl`} />
      </div>
      <p className="text-sm">{label}</p>
    </div>
  );
}