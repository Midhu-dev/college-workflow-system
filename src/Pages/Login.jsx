import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student");
  const [studentId, setStudentId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "student") {
      navigate("/student");
    } else {
      navigate("/teacher");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Logo / Heading */}
        <div className="text-center mb-8">

          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-3xl text-white font-bold">
              CW
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            College Workflow
          </h1>

          <p className="text-slate-500 mt-2">
            Smart College Service Platform
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">

          <p className="text-sm font-medium text-slate-700 mb-2">
            Login as
          </p>

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() => setRole("student")}
              className={`py-3 rounded-lg font-semibold border transition ${
                role === "student"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`py-3 rounded-lg font-semibold border transition ${
                role === "teacher"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
              }`}
            >
              Teacher
            </button>

          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ID */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              {role === "student" ? "Student ID" : "Teacher ID"}
            </label>

            <input
              type="text"
              value={role === "student" ? studentId : teacherId}
              onChange={(e) => {
                if (role === "student") {
                  setStudentId(e.target.value);
                } else {
                  setTeacherId(e.target.value);
                }
              }}
              placeholder={
                role === "student"
                  ? "Enter your student ID"
                  : "Enter your teacher ID"
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
              required
            />

          </div>

          {/* Forgot Password */}
          <div className="text-right">

            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700
                       text-white py-3 rounded-lg font-semibold
                       transition shadow-sm"
          >
            Login as {role === "student" ? "Student" : "Teacher"}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-slate-200 text-center">

          <p className="text-xs text-slate-400">
            College Workflow System
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Simplifying everyday college processes
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;