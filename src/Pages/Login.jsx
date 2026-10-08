import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student");
  const [studentId, setStudentId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    const userId = role === "student" ? studentId.trim() : teacherId.trim();
    const backendRole = role === "student" ? "STUDENT" : "TEACHER";

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
          role: backendRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials. Please try again.");
      }

      /*
        Save JWT token
        This token will be used by all protected APIs.
      */
      localStorage.setItem("token", data.token);

      /*
        Save user information
      */
      localStorage.setItem("user", JSON.stringify(data.user));

      /*
        Navigate according to role
      */
      if (data.user?.role === "STUDENT") {
        navigate("/student");
      } else {
        navigate("/teacher");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message || "Unable to connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* SUBTLE BACKGROUND AMBIANCE */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md bg-[#0D0D0D] border border-[#292929] rounded-2xl p-7 sm:p-9 shadow-2xl z-10">
        
        {/* TOP ACCENT LINE */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {/* LOGO & HEADING */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg shadow-black/40">
            <span className="text-xl text-[#050505] font-black tracking-tight">
              CW
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            Campus Connect
          </h1>

          <p className="text-[#888888] mt-1.5 text-xs">
            College Workflow Management System
          </p>
        </div>

        {/* ROLE SELECTOR */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
              Select Portal
            </label>
            <span className="text-[11px] text-[#D4AF37]">
              {role === "student" ? "Student Login" : "Faculty Login"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-[#080808] border border-[#292929] rounded-xl">
            <button
              type="button"
              onClick={() => {
                setRole("student");
                setMessage("");
              }}
              className={`py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                role === "student"
                  ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                  : "bg-transparent text-[#888888] hover:text-white"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("teacher");
                setMessage("");
              }}
              className={`py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                role === "teacher"
                  ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                  : "bg-transparent text-[#888888] hover:text-white"
              }`}
            >
              Faculty / Teacher
            </button>
          </div>
        </div>

        {/* ALERT MESSAGE */}
        {message && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] text-[#F87171] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] mt-1.5 shrink-0" />
            <span className="leading-relaxed">{message}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
              {role === "student" ? "Student ID / Register No" : "Teacher / Faculty ID"}
              <span className="text-[#D4AF37] ml-1">*</span>
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
              placeholder={role === "student" ? "e.g. 717822P101" : "e.g. FAC202401"}
              className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider">
                Password
                <span className="text-[#D4AF37] ml-1">*</span>
              </label>

              <button
                type="button"
                onClick={() => setMessage("Please contact your college administrator to reset your password.")}
                className="text-[11px] text-[#888888] hover:text-[#D4AF37] transition-colors"
              >
                Forgot?
              </button>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your account password"
              className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] py-3 rounded-xl text-sm font-bold transition-all duration-150 shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              `Sign In as ${role === "student" ? "Student" : "Teacher"}`
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 pt-5 border-t border-[#292929] text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <p className="text-[11px] text-[#888888]">
              Integrated Academic Portal
            </p>
          </div>
          <p className="text-[10px] text-[#555555] mt-1">
            Access requires institutional credentials
          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;