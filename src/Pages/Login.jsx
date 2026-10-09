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
        throw new Error(
          data.message || "Invalid credentials. Please try again."
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user?.role === "STUDENT") {
        navigate("/student");
      } else {
        navigate("/teacher");
      }
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        error.message || "Unable to connect to the authentication server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-login">
      <style>{`
        /* =========================================
           CAMPUS CONNECT LOGIN
           Scoped styles to avoid global CSS conflicts
        ========================================= */

        .cc-login {
          --login-text: #292a27;
          --login-secondary: #62645d;
          --login-muted: #777970;
          --login-gold: #80651e;
          --login-gold-border: #dfcd8d;
          --login-gold-bg: #fbf7e9;

          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 16px;
          background: #f9faf8 !important;
          color: var(--login-text) !important;
          color-scheme: light;
          font-family: inherit;
          font-size: 13px;
          isolation: isolate;
        }

        .cc-login *,
        .cc-login *::before,
        .cc-login *::after {
          box-sizing: border-box;
        }

        /* Force readable text colors, overriding inherited theme styles. */
        .cc-login .cc-title,
        .cc-login .cc-brand-name,
        .cc-login .cc-label,
        .cc-login .cc-role-button,
        .cc-login .cc-input,
        .cc-login .cc-submit,
        .cc-login .cc-footer-title,
        .cc-login .cc-footer-text,
        .cc-login .cc-role-caption,
        .cc-login .cc-forgot,
        .cc-login .cc-required {
          -webkit-text-fill-color: currentColor !important;
        }

        .cc-login .cc-card {
          width: 100%;
          max-width: 420px;
          overflow: hidden;
          border: 1px solid #e5e7df;
          border-radius: 14px;
          background: #ffffff !important;
          color: #292a27 !important;
          box-shadow: 0 12px 40px rgba(40, 40, 25, 0.06);
        }

        .cc-login .cc-accent {
          height: 4px;
          background: linear-gradient(90deg, #eee2b3, #c7a647, #eee2b3);
        }

        .cc-login .cc-content {
          padding: 30px;
        }

        /* Brand */
        .cc-login .cc-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 28px;
          text-align: center;
        }

        .cc-login .cc-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          margin-bottom: 14px;
          border: 1px solid #e8d9a5;
          border-radius: 13px;
          background: #fbf7e9 !important;
          color: #80651e !important;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        .cc-login .cc-brand-name {
          margin: 0;
          color: #292a27 !important;
          font-size: 25px;
          line-height: 1.35;
          font-weight: 750;
          letter-spacing: -0.04em;
        }

        .cc-login .cc-subtitle {
          margin: 7px 0 0;
          color: #62645d !important;
          font-size: 12px;
          line-height: 1.7;
        }

        /* Section headings and labels */
        .cc-login .cc-section {
          margin-bottom: 21px;
        }

        .cc-login .cc-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 8px;
        }

        .cc-login .cc-label {
          display: block;
          margin: 0;
          color: #373830 !important;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.6;
        }

        .cc-login .cc-required {
          margin-left: 4px;
          color: #a17d20 !important;
        }

        .cc-login .cc-role-caption {
          color: #80651e !important;
          font-size: 11px;
          font-weight: 600;
        }

        /* Role selector */
        .cc-login .cc-role-options {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 7px;
          padding: 5px;
          border: 1px solid #e1e3dc;
          border-radius: 10px;
          background: #f7f8f5 !important;
        }

        .cc-login .cc-role-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          min-height: 42px;
          padding: 9px 7px;
          border: 1px solid transparent;
          border-radius: 7px;
          background: transparent !important;
          color: #62645d !important;
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease;
        }

        .cc-login .cc-role-button:hover:not(.active) {
          background: #efefe9 !important;
          color: #292a27 !important;
        }

        .cc-login .cc-role-button.active {
          border-color: #dfcd8d;
          background: #f5edcf !important;
          color: #5e4c1e !important;
          font-weight: 700;
        }

        /* Form */
        .cc-login .cc-form {
          display: grid;
          gap: 19px;
        }

        .cc-login .cc-field {
          min-width: 0;
        }

        .cc-login .cc-input {
          display: block;
          width: 100%;
          min-width: 0;
          min-height: 46px;
          margin-top: 8px;
          padding: 11px 13px;
          border: 1px solid #d7dad1;
          border-radius: 8px;
          outline: none;
          background: #ffffff !important;
          color: #292a27 !important;
          caret-color: #80651e;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
          opacity: 1 !important;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .cc-login .cc-input::placeholder {
          color: #85877e !important;
          -webkit-text-fill-color: #85877e !important;
          opacity: 1 !important;
          font-size: 12px;
        }

        .cc-login .cc-input:focus {
          border-color: #c7a647;
          box-shadow: 0 0 0 3px rgba(199, 166, 71, 0.17);
        }

        /* Forgot password */
        .cc-login .cc-forgot {
          padding: 3px 0;
          border: none;
          background: transparent !important;
          color: #80651e !important;
          font-family: inherit;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .cc-login .cc-forgot:hover {
          color: #5e4c1e !important;
          text-decoration: underline;
        }

        /* Error message */
        .cc-login .cc-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 18px;
          padding: 12px;
          border: 1px solid #efc9c4;
          border-radius: 8px;
          background: #fff5f3 !important;
          color: #963d35 !important;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .cc-login .cc-alert-text {
          min-width: 0;
          color: #963d35 !important;
          -webkit-text-fill-color: #963d35 !important;
        }

        .cc-login .cc-alert-icon {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: #f8e2de !important;
          color: #963d35 !important;
          font-size: 12px;
          font-weight: 800;
        }

        /* Submit button */
        .cc-login .cc-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 46px;
          margin-top: 2px;
          padding: 11px 15px;
          border: 1px solid #dfcd8d;
          border-radius: 8px;
          background: #f5edcf !important;
          color: #493c1c !important;
          font-family: inherit;
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease;
        }

        .cc-login .cc-submit:hover:not(:disabled) {
          border-color: #c7a647;
          background: #eee2b3 !important;
          color: #493c1c !important;
        }

        .cc-login .cc-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .cc-login .cc-spinner {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          border: 2px solid #b7a05a;
          border-top-color: transparent;
          border-radius: 50%;
          animation: cc-login-spin 0.7s linear infinite;
        }

        @keyframes cc-login-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Footer */
        .cc-login .cc-footer {
          margin-top: 27px;
          padding-top: 19px;
          border-top: 1px solid #e9ebe5;
          text-align: center;
        }

        .cc-login .cc-footer-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #62645d !important;
          font-size: 11px;
          font-weight: 600;
        }

        .cc-login .cc-footer-dot {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #c7a647;
        }

        .cc-login .cc-footer-text {
          margin: 7px 0 0;
          color: #777970 !important;
          font-size: 11px;
          line-height: 1.6;
        }

        /* Keyboard accessibility */
        .cc-login button:focus-visible {
          outline: 2px solid #a88a34;
          outline-offset: 3px;
        }

        @media (max-width: 480px) {
          .cc-login {
            align-items: center;
            padding: 20px 12px;
          }

          .cc-login .cc-content {
            padding: 25px 19px 22px;
          }

          .cc-login .cc-brand {
            margin-bottom: 25px;
          }

          .cc-login .cc-brand-name {
            font-size: 23px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-login .cc-spinner {
            animation-duration: 1.5s;
          }

          .cc-login *,
          .cc-login *::before,
          .cc-login *::after {
            transition-duration: 0.01ms !important;
          }
        }
          /* ===== Slightly Darker Login Theme ===== */

.cc-login {
  background: #f1f2ee !important;
}

.cc-login .cc-card {
  border-color: #d5d7ce;
  box-shadow: 0 12px 36px rgba(35, 35, 25, 0.09);
}

.cc-login .cc-accent {
  background: linear-gradient(90deg, #dfcd8d, #b99a3f, #dfcd8d);
}

/* Brand and headings */
.cc-login .cc-brand-name {
  color: #22231f !important;
}

.cc-login .cc-subtitle {
  color: #55574f !important;
}

.cc-login .cc-logo {
  border-color: #d7c47e;
  background: #f4eac3 !important;
  color: #66511b !important;
}

/* Labels and supporting text */
.cc-login .cc-label {
  color: #30312b !important;
}

.cc-login .cc-role-caption,
.cc-login .cc-forgot {
  color: #70571a !important;
}

.cc-login .cc-footer-title {
  color: #505249 !important;
}

.cc-login .cc-footer-text {
  color: #62645b !important;
}

/* Role selection */
.cc-login .cc-role-options {
  border-color: #d0d2c8;
  background: #f0f1ec !important;
}

.cc-login .cc-role-button {
  color: #4f5149 !important;
}

.cc-login .cc-role-button.active {
  border-color: #cdb65e;
  background: #eee1ac !important;
  color: #493a15 !important;
}

.cc-login .cc-role-button:hover:not(.active) {
  background: #e5e6df !important;
}

/* Input fields */
.cc-login .cc-input {
  border-color: #bfc2b7;
  background: #ffffff !important;
  color: #22231f !important;
}

.cc-login .cc-input::placeholder {
  color: #66685f !important;
  -webkit-text-fill-color: #66685f !important;
}

.cc-login .cc-input:focus {
  border-color: #a88a34;
  box-shadow: 0 0 0 3px rgba(168, 138, 52, 0.2);
}

/* Sign-in button */
.cc-login .cc-submit {
  border-color: #cdb65e;
  background: #eee1ac !important;
  color: #403414 !important;
}

.cc-login .cc-submit:hover:not(:disabled) {
  border-color: #ad903b;
  background: #e5d28b !important;
  color: #35290f !important;
}

/* Card footer */
.cc-login .cc-footer {
  border-top-color: #dfe1d8;
}

.cc-login .cc-footer-dot {
  background: #ac8d32;
}


      `}</style>

      <main className="cc-card">
        <div className="cc-accent" />

        <div className="cc-content">
          {/* Brand */}
          <header className="cc-brand">
            <div className="cc-logo" aria-label="Campus Connect logo">
              CW
            </div>

            <h1 className="cc-brand-name">Campus Connect</h1>

            <p className="cc-subtitle">
              College Workflow Management System
            </p>
          </header>

          {/* Role selection */}
          <section className="cc-section">
            <div className="cc-label-row">
              <span className="cc-label">Select Portal</span>

              <span className="cc-role-caption">
                {role === "student" ? "Student Login" : "Faculty Login"}
              </span>
            </div>

            <div className="cc-role-options">
              <button
                type="button"
                onClick={() => {
                  setRole("student");
                  setMessage("");
                }}
                aria-pressed={role === "student"}
                className={`cc-role-button ${
                  role === "student" ? "active" : ""
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
                aria-pressed={role === "teacher"}
                className={`cc-role-button ${
                  role === "teacher" ? "active" : ""
                }`}
              >
                Faculty / Teacher
              </button>
            </div>
          </section>

          {/* Error message */}
          {message && (
            <div className="cc-alert" role="alert">
              <span className="cc-alert-icon" aria-hidden="true">
                !
              </span>

              <span className="cc-alert-text">{message}</span>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="cc-form">
            <div className="cc-field">
              <label className="cc-label" htmlFor="login-user-id">
                {role === "student"
                  ? "Student ID / Register No"
                  : "Teacher / Faculty ID"}

                <span className="cc-required">*</span>
              </label>

              <input
                id="login-user-id"
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
                    : "Enter your faculty ID"
                }
                autoComplete="username"
                className="cc-input"
                required
              />
            </div>

            <div className="cc-field">
              <div className="cc-label-row">
                <label className="cc-label" htmlFor="login-password">
                  Password
                  <span className="cc-required">*</span>
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setMessage(
                      "Please contact your college administrator to reset your password."
                    )
                  }
                  className="cc-forgot"
                >
                  Forgot password?
                </button>
              </div>

              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your account password"
                autoComplete="current-password"
                className="cc-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cc-submit"
            >
              {loading ? (
                <>
                  <span className="cc-spinner" aria-hidden="true" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>
                    Sign In as {role === "student" ? "Student" : "Teacher"}
                  </span>
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <footer className="cc-footer">
            <div className="cc-footer-title">
              <span className="cc-footer-dot" aria-hidden="true" />
              <span>Integrated Academic Portal</span>
            </div>

            <p className="cc-footer-text">
              Access requires institutional credentials
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Login;