import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyClassIssues() {
  const [issues, setIssues] = useState([]);

  const loadIssues = () => {
    const storedIssues =
      JSON.parse(localStorage.getItem("classIssues")) || [];

    setIssues(storedIssues);
  };

  useEffect(() => {
    loadIssues();

    const handleStorage = () => {
      loadIssues();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ================= HEADER ================= */}
      <header className="bg-[#080808] border-b border-[#292929] px-6 sm:px-8 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>

              <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                Student Services
              </p>
            </div>

            <h1 className="text-2xl font-bold text-white">
              My Class Issues
            </h1>

            <p className="text-[#B8B8B8] mt-1 text-sm">
              Track the issues you have submitted
            </p>
          </div>

          <Link
            to="/student"
            className="
              inline-flex
              items-center
              justify-center
              px-4
              py-2.5
              rounded-lg
              bg-[#0D0D0D]
              border
              border-[#333333]
              text-[#B8B8B8]
              font-semibold
              text-sm
              hover:border-[#D4AF37]
              hover:text-[#D4AF37]
              transition
            "
          >
            Back to Dashboard
          </Link>

        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="max-w-6xl mx-auto px-6 sm:px-8 py-10">

        {issues.length === 0 ? (

          /* ================= EMPTY STATE ================= */
          <div className="
            bg-[#0D0D0D]
            rounded-2xl
            border
            border-[#292929]
            p-10
            sm:p-14
            text-center
            shadow-xl
          ">

            <div className="
              mx-auto
              w-16
              h-16
              rounded-2xl
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-3xl
              mb-5
            ">
              ⚠️
            </div>

            <h2 className="text-xl font-bold text-white">
              No Issues Submitted
            </h2>

            <p className="text-[#B8B8B8] mt-2 text-sm">
              Your submitted class issues will appear here.
            </p>

            <Link
              to="/student/class-issue"
              className="
                inline-block
                mt-6
                px-5
                py-3
                bg-[#D4AF37]
                text-[#050505]
                rounded-lg
                font-semibold
                hover:bg-[#F2D675]
                transition
              "
            >
              Report an Issue
            </Link>

          </div>

        ) : (

          /* ================= ISSUE LIST ================= */
          <div className="space-y-5">

            {issues.map((issue) => (

              <div
                key={issue.id}
                className="
                  bg-[#0D0D0D]
                  rounded-2xl
                  border
                  border-[#292929]
                  shadow-xl
                  p-6
                  hover:border-[#3D3318]
                  transition
                "
              >

                {/* Issue Header */}
                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:justify-between
                  gap-3
                ">

                  <div className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  ">

                    <h2 className="text-xl font-bold text-white">
                      {issue.subject}
                    </h2>

                    {/* Category */}
                    <span className="
                      px-3
                      py-1
                      rounded-full
                      bg-[#17130A]
                      border
                      border-[#3D3318]
                      text-[#D4AF37]
                      text-xs
                      font-semibold
                    ">
                      {issue.category}
                    </span>

                    {/* Status */}
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        border
                        ${
                          issue.status === "Resolved"
                            ? "bg-[#17130A] text-[#D4AF37] border-[#3D3318]"
                            : "bg-[#111111] text-[#F2D675] border-[#333333]"
                        }
                      `}
                    >
                      {issue.status}
                    </span>

                  </div>

                </div>

                {/* Description */}
                <div className="mt-6">

                  <p className="
                    text-xs
                    font-semibold
                    text-[#D4AF37]
                    tracking-wider
                    uppercase
                    mb-2
                  ">
                    Description
                  </p>

                  <div className="
                    bg-[#080808]
                    border
                    border-[#292929]
                    rounded-xl
                    p-4
                  ">
                    <p className="text-sm text-[#D0D0D0] leading-6">
                      {issue.description}
                    </p>
                  </div>

                </div>

                {/* Submitted Date */}
                <div className="
                  flex
                  items-center
                  gap-2
                  mt-4
                ">

                  <span className="text-[#D4AF37] text-sm">
                    ●
                  </span>

                  <p className="text-xs text-[#777777]">
                    Submitted: {issue.submittedAt}
                  </p>

                </div>

                {/* Teacher Response */}
                {issue.status === "Resolved" &&
                  issue.resolution && (

                    <div className="
                      mt-5
                      bg-[#17130A]
                      border
                      border-[#3D3318]
                      rounded-xl
                      p-5
                    ">

                      <div className="flex items-center gap-2 mb-2">

                        <span className="
                          w-2
                          h-2
                          rounded-full
                          bg-[#D4AF37]
                        "></span>

                        <p className="
                          text-xs
                          font-semibold
                          text-[#D4AF37]
                          tracking-wider
                        ">
                          TEACHER RESPONSE
                        </p>

                      </div>

                      <p className="
                        text-sm
                        text-[#D0D0D0]
                        leading-6
                      ">
                        {issue.resolution}
                      </p>

                      {issue.resolvedAt && (
                        <p className="
                          text-xs
                          text-[#777777]
                          mt-3
                        ">
                          Resolved: {issue.resolvedAt}
                        </p>
                      )}

                    </div>

                  )}

              </div>

            ))}

          </div>

        )}

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="
        mt-6
        border-t
        border-[#292929]
        bg-[#080808]
      ">
        <div className="
          max-w-6xl
          mx-auto
          px-6
          sm:px-8
          py-5
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-2
        ">

          <p className="text-xs text-[#666666]">
            College Workflow System
          </p>

          <div className="flex items-center gap-2">

            <span className="
              w-1.5
              h-1.5
              rounded-full
              bg-[#D4AF37]
            "></span>

            <p className="text-xs text-[#777777]">
              Student Services
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
}

export default MyClassIssues;