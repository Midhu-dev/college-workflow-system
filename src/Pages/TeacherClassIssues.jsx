import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeacherClassIssues() {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [resolution, setResolution] = useState("");

  const loadIssues = () => {
    const storedIssues =
      JSON.parse(localStorage.getItem("classIssues")) || [];

    setIssues(storedIssues);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const resolveIssue = () => {
    if (!selectedIssue || !resolution.trim()) {
      return;
    }

    const updatedIssues = issues.map((issue) =>
      issue.id === selectedIssue.id
        ? {
            ...issue,
            status: "Resolved",
            resolution,
            resolvedAt: new Date().toLocaleString(),
          }
        : issue
    );

    localStorage.setItem(
      "classIssues",
      JSON.stringify(updatedIssues)
    );

    setIssues(updatedIssues);
    setSelectedIssue(null);
    setResolution("");
  };

  const pendingIssues = issues.filter(
    (issue) => issue.status === "Pending"
  );

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ================= HEADER ================= */}
      <header className="bg-[#050505] border-b border-[#292929] px-6 sm:px-8 py-5">
        <div className="
          max-w-7xl
          mx-auto
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        ">

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="
                w-2
                h-2
                rounded-full
                bg-[#D4AF37]
              "></span>

              <p className="
                text-xs
                font-semibold
                tracking-widest
                text-[#D4AF37]
                uppercase
              ">
                Faculty Portal
              </p>
            </div>

            <h1 className="text-2xl font-bold text-white">
              Class Issues
            </h1>

            <p className="text-[#B8B8B8] mt-1 text-sm">
              Review and resolve student class issues
            </p>
          </div>

          <Link
            to="/teacher"
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

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-10">

        {/* ================= SUMMARY ================= */}
        <div className="
          grid
          md:grid-cols-2
          gap-5
          mb-8
        ">

          {/* Pending */}
          <div className="
            bg-[#0D0D0D]
            border
            border-[#292929]
            rounded-2xl
            p-6
            hover:border-[#3D3318]
            transition
          ">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#888888]">
                  Pending Issues
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-[#F2D675]
                  mt-2
                ">
                  {pendingIssues.length}
                </h2>
              </div>

              <div className="
                w-11
                h-11
                rounded-xl
                bg-[#17130A]
                border
                border-[#3D3318]
                flex
                items-center
                justify-center
                text-xl
              ">
                ⚠️
              </div>

            </div>

          </div>

          {/* Resolved */}
          <div className="
            bg-[#0D0D0D]
            border
            border-[#292929]
            rounded-2xl
            p-6
            hover:border-[#3D3318]
            transition
          ">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#888888]">
                  Resolved Issues
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-[#D4AF37]
                  mt-2
                ">
                  {resolvedIssues.length}
                </h2>
              </div>

              <div className="
                w-11
                h-11
                rounded-xl
                bg-[#17130A]
                border
                border-[#3D3318]
                flex
                items-center
                justify-center
                text-xl
              ">
                ✓
              </div>

            </div>

          </div>

        </div>

        {/* ================= ISSUES ================= */}
        <div className="
          bg-[#0D0D0D]
          border
          border-[#292929]
          rounded-2xl
          shadow-xl
          p-6
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-lg
            ">
              ⚠️
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Student Issues
              </h2>

              <p className="text-sm text-[#777777] mt-1">
                Review submitted classroom issues
              </p>
            </div>

          </div>

          {issues.length === 0 ? (

            /* ================= EMPTY STATE ================= */
            <div className="
              text-center
              py-12
              border-t
              border-[#292929]
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
                mb-4
              ">
                ⚠️
              </div>

              <h3 className="
                text-lg
                font-semibold
                text-white
              ">
                No Issues
              </h3>

              <p className="text-[#888888] mt-1 text-sm">
                Student class issues will appear here.
              </p>

            </div>

          ) : (

            <div className="
              space-y-5
              border-t
              border-[#292929]
              pt-6
            ">

              {issues.map((issue) => (

                <div
                  key={issue.id}
                  className="
                    border
                    border-[#292929]
                    rounded-xl
                    p-5
                    bg-[#080808]
                    hover:border-[#3D3318]
                    transition
                  "
                >

                  <div className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:justify-between
                    gap-5
                  ">

                    <div className="flex-1">

                      {/* Title + Status */}
                      <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        mb-4
                      ">

                        <h3 className="
                          text-lg
                          font-bold
                          text-white
                        ">
                          {issue.subject}
                        </h3>

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

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            border
                            ${
                              issue.status === "Pending"
                                ? "bg-[#111111] text-[#F2D675] border-[#333333]"
                                : "bg-[#17130A] text-[#D4AF37] border-[#3D3318]"
                            }
                          `}
                        >
                          {issue.status}
                        </span>

                      </div>

                      {/* Student Details */}
                      <div className="
                        grid
                        md:grid-cols-2
                        gap-3
                        text-sm
                      ">

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            Student:
                          </strong>{" "}
                          {issue.student}
                        </p>

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            Register No:
                          </strong>{" "}
                          {issue.registerNo}
                        </p>

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            Submitted:
                          </strong>{" "}
                          {issue.submittedAt}
                        </p>

                      </div>

                      {/* Description */}
                      <div className="
                        mt-4
                        bg-[#080808]
                        border
                        border-[#292929]
                        rounded-xl
                        p-4
                      ">

                        <p className="
                          text-xs
                          font-semibold
                          text-[#D4AF37]
                          tracking-wider
                          mb-2
                        ">
                          DESCRIPTION
                        </p>

                        <p className="
                          text-sm
                          text-[#D0D0D0]
                          leading-6
                        ">
                          {issue.description}
                        </p>

                      </div>

                      {/* Resolution */}
                      {issue.status === "Resolved" &&
                        issue.resolution && (

                          <div className="
                            mt-4
                            bg-[#17130A]
                            border
                            border-[#3D3318]
                            rounded-xl
                            p-4
                          ">

                            <p className="
                              text-xs
                              font-semibold
                              text-[#D4AF37]
                              tracking-wider
                              mb-2
                            ">
                              RESOLUTION
                            </p>

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

                    {/* Resolve Action */}
                    {issue.status === "Pending" && (
                      <div className="flex items-start">

                        <button
                          onClick={() =>
                            setSelectedIssue(issue)
                          }
                          className="
                            px-5
                            py-2.5
                            rounded-lg
                            bg-[#D4AF37]
                            text-[#050505]
                            text-sm
                            font-semibold
                            hover:bg-[#F2D675]
                            transition
                            whitespace-nowrap
                          "
                        >
                          Resolve Issue
                        </button>

                      </div>
                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

      {/* ================= RESOLVE MODAL ================= */}
      {selectedIssue && (
        <div className="
          fixed
          inset-0
          bg-black/80
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-5
          z-50
        ">

          <div className="
            bg-[#0D0D0D]
            border
            border-[#292929]
            rounded-2xl
            shadow-2xl
            w-full
            max-w-lg
            p-7
          ">

            {/* Modal Header */}
            <div className="
              flex
              justify-between
              items-start
              mb-5
            ">

              <div>

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
                    tracking-wider
                    text-[#D4AF37]
                    uppercase
                  ">
                    Issue Resolution
                  </p>

                </div>

                <h2 className="
                  text-xl
                  font-bold
                  text-white
                ">
                  Resolve Issue
                </h2>

                <p className="
                  text-sm
                  text-[#888888]
                  mt-1
                ">
                  {selectedIssue.subject}
                </p>

              </div>

              <button
                onClick={() => {
                  setSelectedIssue(null);
                  setResolution("");
                }}
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-[#080808]
                  border
                  border-[#292929]
                  text-[#777777]
                  hover:text-white
                  hover:border-[#D4AF37]
                  transition
                "
              >
                ✕
              </button>

            </div>

            {/* Student Issue */}
            <div className="
              mb-5
              bg-[#080808]
              border
              border-[#292929]
              rounded-xl
              p-4
            ">

              <p className="
                text-xs
                font-semibold
                text-[#D4AF37]
                tracking-wider
                mb-2
              ">
                STUDENT ISSUE
              </p>

              <p className="
                text-sm
                text-[#D0D0D0]
                leading-6
              ">
                {selectedIssue.description}
              </p>

            </div>

            {/* Resolution */}
            <label className="
              block
              text-sm
              font-semibold
              text-white
              mb-2
            ">
              Resolution
            </label>

            <textarea
              value={resolution}
              onChange={(e) =>
                setResolution(e.target.value)
              }
              rows="5"
              placeholder="Enter how the issue was resolved..."
              className="
                w-full
                bg-[#080808]
                text-white
                placeholder:text-[#666666]
                border
                border-[#333333]
                rounded-lg
                px-4
                py-3
                outline-none
                focus:border-[#D4AF37]
                focus:ring-1
                focus:ring-[#D4AF37]
                resize-none
                transition
              "
            />

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={() => {
                  setSelectedIssue(null);
                  setResolution("");
                }}
                className="
                  flex-1
                  py-3
                  rounded-lg
                  border
                  border-[#333333]
                  text-[#B8B8B8]
                  font-semibold
                  hover:border-[#D4AF37]
                  hover:text-[#D4AF37]
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={resolveIssue}
                className="
                  flex-1
                  py-3
                  rounded-lg
                  bg-[#D4AF37]
                  text-[#050505]
                  font-semibold
                  hover:bg-[#F2D675]
                  transition
                "
              >
                Mark Resolved
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="
        border-t
        border-[#292929]
        bg-[#080808]
      ">
        <div className="
          max-w-7xl
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
              Faculty Services
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
}

export default TeacherClassIssues;