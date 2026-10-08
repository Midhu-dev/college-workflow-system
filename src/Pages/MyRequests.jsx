import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveODRequests")) || [];

    setRequests(storedRequests);
  };

  useEffect(() => {
    loadRequests();

    const handleStorage = () => {
      loadRequests();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return "bg-[#17130A] text-[#D4AF37] border-[#3D3318]";
    }

    if (status === "Rejected") {
      return "bg-[#171010] text-[#E08A8A] border-[#422222]";
    }

    return "bg-[#111111] text-[#F2D675] border-[#333333]";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ================= HEADER ================= */}
      <header className="bg-[#080808] border-b border-[#292929] px-6 sm:px-8 py-5">
        <div className="
          max-w-6xl
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
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>

              <p className="
                text-xs
                font-semibold
                tracking-widest
                text-[#D4AF37]
                uppercase
              ">
                Student Services
              </p>
            </div>

            <h1 className="text-2xl font-bold text-white">
              My Requests
            </h1>

            <p className="text-[#B8B8B8] mt-1 text-sm">
              Track your Leave and OD requests
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

        {requests.length === 0 ? (

          /* ================= EMPTY STATE ================= */
          <div className="
            bg-[#0D0D0D]
            rounded-2xl
            border
            border-[#292929]
            shadow-xl
            p-10
            sm:p-14
            text-center
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
              📋
            </div>

            <h2 className="text-xl font-bold text-white">
              No Requests Yet
            </h2>

            <p className="text-[#B8B8B8] mt-2 text-sm">
              Your Leave and OD requests will appear here.
            </p>

            <Link
              to="/student/leave-od"
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
              Apply for Leave / OD
            </Link>

          </div>

        ) : (

          /* ================= REQUEST LIST ================= */
          <div className="space-y-5">

            {requests.map((request) => (

              <div
                key={request.id}
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

                {/* ================= TOP ================= */}
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
                      {request.type} Request
                    </h2>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        border
                        ${getStatusStyle(request.status)}
                      `}
                    >
                      {request.status}
                    </span>

                  </div>

                  <p className="
                    text-xs
                    text-[#666666]
                    font-mono
                  ">
                    #{request.id}
                  </p>

                </div>

                {/* ================= DETAILS ================= */}
                <div className="
                  grid
                  md:grid-cols-3
                  gap-4
                  mt-6
                ">

                  {/* From Date */}
                  <div className="
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
                      uppercase
                      tracking-wider
                    ">
                      From Date
                    </p>

                    <p className="
                      text-sm
                      font-medium
                      text-white
                      mt-2
                    ">
                      {request.fromDate}
                    </p>
                  </div>

                  {/* To Date */}
                  <div className="
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
                      uppercase
                      tracking-wider
                    ">
                      To Date
                    </p>

                    <p className="
                      text-sm
                      font-medium
                      text-white
                      mt-2
                    ">
                      {request.toDate}
                    </p>
                  </div>

                  {/* Submitted */}
                  <div className="
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
                      uppercase
                      tracking-wider
                    ">
                      Submitted
                    </p>

                    <p className="
                      text-sm
                      font-medium
                      text-white
                      mt-2
                    ">
                      {request.submittedAt}
                    </p>
                  </div>

                </div>

                {/* ================= REASON ================= */}
                <div className="
                  mt-5
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
                    uppercase
                    tracking-wider
                    mb-2
                  ">
                    Reason
                  </p>

                  <p className="
                    text-sm
                    text-[#D0D0D0]
                    leading-6
                  ">
                    {request.reason}
                  </p>

                </div>

                {/* ================= REVIEW INFORMATION ================= */}
                {request.status !== "Pending" && (

                  <div
                    className={`
                      mt-4
                      rounded-xl
                      p-4
                      border
                      ${
                        request.status === "Approved"
                          ? "bg-[#17130A] border-[#3D3318]"
                          : "bg-[#171010] border-[#422222]"
                      }
                    `}
                  >

                    <p
                      className={`
                        text-sm
                        font-semibold
                        ${
                          request.status === "Approved"
                            ? "text-[#D4AF37]"
                            : "text-[#E08A8A]"
                        }
                      `}
                    >
                      {request.status === "Approved"
                        ? "✓ Your request has been approved."
                        : "✕ Your request has been rejected."}
                    </p>

                    {request.reviewedAt && (
                      <p className="
                        text-xs
                        text-[#777777]
                        mt-2
                      ">
                        Reviewed: {request.reviewedAt}
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

export default MyRequests;