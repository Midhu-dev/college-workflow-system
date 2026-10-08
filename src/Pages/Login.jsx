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
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-8">

      {/* ================= BACKGROUND DETAILS ================= */}
      <div className="
        fixed
        top-0
        left-0
        w-full
        h-full
        pointer-events-none
        overflow-hidden
      ">
        <div className="
          absolute
          top-[-180px]
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#D4AF37]/5
          blur-3xl
        "></div>
      </div>

      {/* ================= LOGIN CARD ================= */}
      <div className="
        relative
        w-full
        max-w-md
        bg-[#0D0D0D]
        border
        border-[#292929]
        rounded-2xl
        shadow-2xl
        p-7
        sm:p-8
      ">

        {/* TOP ACCENT */}
        <div className="
          absolute
          top-0
          left-8
          right-8
          h-px
          bg-[#D4AF37]
        "></div>

        {/* ================= LOGO / HEADING ================= */}
        <div className="text-center mb-8">

          <div className="
            mx-auto
            mb-5
            w-16
            h-16
            bg-[#D4AF37]
            rounded-2xl
            flex
            items-center
            justify-center
            shadow-lg
            shadow-black/30
          ">
            <span className="
              text-2xl
              text-[#050505]
              font-bold
            ">
              CW
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            College Workflow
          </h1>

          <p className="text-[#B8B8B8] mt-2 text-sm">
            Smart College Service Platform
          </p>

        </div>

        {/* ================= ROLE SELECTION ================= */}
        <div className="mb-6">

          <p className="
            text-sm
            font-semibold
            text-white
            mb-2
          ">
            Login as
          </p>

          <div className="
            grid
            grid-cols-2
            gap-3
            p-1
            bg-[#080808]
            border
            border-[#292929]
            rounded-xl
          ">

            {/* STUDENT */}
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`
                py-3
                rounded-lg
                font-semibold
                border
                transition-all
                duration-200
                ${
                  role === "student"
                    ? "bg-[#D4AF37] text-[#050505] border-[#D4AF37]"
                    : "bg-transparent text-[#B8B8B8] border-transparent hover:text-white"
                }
              `}
            >
              Student
            </button>

            {/* TEACHER */}
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`
                py-3
                rounded-lg
                font-semibold
                border
                transition-all
                duration-200
                ${
                  role === "teacher"
                    ? "bg-[#D4AF37] text-[#050505] border-[#D4AF37]"
                    : "bg-transparent text-[#B8B8B8] border-transparent hover:text-white"
                }
              `}
            >
              Teacher
            </button>

          </div>

        </div>

        {/* ================= LOGIN FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ID */}
          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-white
              mb-2
            ">
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
              className="
                w-full
                px-4
                py-3
                bg-[#080808]
                text-white
                placeholder:text-[#666666]
                border
                border-[#333333]
                rounded-lg
                outline-none
                focus:border-[#D4AF37]
                focus:ring-1
                focus:ring-[#D4AF37]
                transition
              "
              required
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-white
              mb-2
            ">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="
                w-full
                px-4
                py-3
                bg-[#080808]
                text-white
                placeholder:text-[#666666]
                border
                border-[#333333]
                rounded-lg
                outline-none
                focus:border-[#D4AF37]
                focus:ring-1
                focus:ring-[#D4AF37]
                transition
              "
              required
            />

          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">

            <button
              type="button"
              className="
                text-sm
                text-[#D4AF37]
                hover:text-[#F2D675]
                transition
              "
            >
              Forgot password?
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="
              w-full
              bg-[#D4AF37]
              hover:bg-[#F2D675]
              text-[#050505]
              py-3
              rounded-lg
              font-semibold
              transition
              duration-200
              shadow-lg
              shadow-black/20
            "
          >
            Login as {role === "student" ? "Student" : "Teacher"}
          </button>

        </form>

        {/* ================= FOOTER ================= */}
        <div className="
          mt-8
          pt-5
          border-t
          border-[#292929]
          text-center
        ">

          <div className="flex items-center justify-center gap-2">

            <span className="
              w-1.5
              h-1.5
              rounded-full
              bg-[#D4AF37]
            "></span>

            <p className="text-xs text-[#B8B8B8]">
              College Workflow System
            </p>

          </div>

          <p className="text-xs text-[#666666] mt-2">
            Simplifying everyday college processes
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;