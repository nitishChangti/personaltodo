import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthError } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password");

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  // Redirect after successful register
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // or "/login" if you prefer
    }
  }, [isAuthenticated, navigate]);

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[3fr_2fr] bg-[#F8FAFC]">
      {/* Left Panel */}
      <div className="mx-auto my-12 w-[70%] flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <img src={logo} alt="TaskFlow" className="h-10 w-10" />
            <span className="font-semibold text-2xl">TaskFlow</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mb-6 p-2">
            Start managing your tasks efficiently today
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-600 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-200 bg-white px-10 py-2.5 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none"
                  {...register("name", { required: "Full name is required" })}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border bg-white border-gray-200 px-10 py-2.5 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full rounded-lg border bg-white border-gray-200 px-10 pr-10 py-2.5 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Must be at least 8 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border bg-white border-gray-200 px-10 pr-10 py-2.5 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) => v === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="mt-1 accent-violet-600"
                {...register("terms", { required: "You must agree to the terms" })}
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-violet-600 font-medium">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-violet-600 font-medium">
                  Privacy Policy
                </a>
              </span>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-500">{errors.terms.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full rounded-lg bg-violet-600 py-2.5 text-white font-medium hover:bg-violet-700 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Social */}
          <div className="my-6 text-center text-sm text-gray-400">
            Or sign up with
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm hover:bg-gray-50">
              <FaGoogle /> Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm hover:bg-gray-50">
              <FaGithub /> GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-violet-600 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-10">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
            🚀
          </div>
          <h2 className="text-3xl font-bold mb-3">Boost Your Productivity</h2>
          <p className="text-sm opacity-90 mb-10">
            Join thousands of professionals who use TaskFlow to organize their work
            and achieve their goals faster.
          </p>

          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-xs opacity-80">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold">2M+</div>
              <div className="text-xs opacity-80">Tasks Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">99%</div>
              <div className="text-xs opacity-80">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}