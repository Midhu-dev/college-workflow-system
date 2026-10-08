import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeacherLeaveOD() {
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveODRequests")) || [];

    setRequests(storedRequests);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = (id, status) => {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? {
            ...request,
            status,
            reviewedAt: new Date().toLocaleString(),
          }
        : request
    );

    localStorage.setItem(
      "leaveODRequests",
      JSON.stringify(updatedRequests)
    );

    setRequests(updatedRequests);
  };

  const pending = requests.filter(
    (request) => request.status === "Pending"
  );

  const approved = requests.filter(
    (request) => request.status === "Approved"
  );

  const rejected = requests.filter(
    (request) => request.status === "Rejected"
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="bg-[#050505] border-b border-[#292929]">
        <div className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          py-5
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

            <h1 className="
              text-2xl
              font-bold
              text-white
            ">
              Leave / OD Requests
            </h1>

            <p className="
              text-[#B8B8B8]
              text-sm
              mt-1
            ">
              Review and manage student requests
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
              text-sm
              font-semibold
              hover:border-[#D4AF37]
              hover:text-[#D4AF37]
              transition
            "
          >
            Back to Dashboard
          </Link>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="
        max-w-7xl
        mx-auto
        w-full
        px-6
        sm:px-8
        py-10
        flex-1
      ">

        {/* ================= SUMMARY ================= */}
        <div className="
          grid
          md:grid-cols-3
          gap-5
          mb-8
        ">

          {/* PENDING */}
          <div className="
            bg-[#0D0D0D]
            border
            border-[#292929]
            rounded-2xl
            p-6
            hover:border-[#3D3318]
            transition
          ">

            <div className="
              flex
              items-center
              justify-between
              gap-4
            ">

              <div>

                <p className="
                  text-sm
                  text-[#888888]
                ">
                  Pending
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-[#F2D675]
                  mt-2
                ">
                  {pending.length}
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
                text-lg
              ">
                ⏳
              </div>

            </div>

          </div>

          {/* APPROVED */}
          <div className="
            bg-[#0D0D0D]
            border
            border-[#292929]
            rounded-2xl
            p-6
            hover:border-[#3D3318]
            transition
          ">

            <div className="
              flex
              items-center
              justify-between
              gap-4
            ">

              <div>

                <p className="
                  text-sm
                  text-[#888888]
                ">
                  Approved
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-[#D4AF37]
                  mt-2
                ">
                  {approved.length}
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
                text-lg
              ">
                ✓
              </div>

            </div>

          </div>

          {/* REJECTED */}
          <div className="
            bg-[#0D0D0D]
            border
            border-[#292929]
            rounded-2xl
            p-6
            hover:border-[#422222]
            transition
          ">

            <div className="
              flex
              items-center
              justify-between
              gap-4
            ">

              <div>

                <p className="
                  text-sm
                  text-[#888888]
                ">
                  Rejected
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-[#E08A8A]
                  mt-2
                ">
                  {rejected.length}
                </h2>

              </div>

              <div className="
                w-11
                h-11
                rounded-xl
                bg-[#171010]
                border
                border-[#422222]
                flex
                items-center
                justify-center
                text-lg
              ">
                ✕
              </div>

            </div>

          </div>

        </div>

        {/* ================= REQUESTS ================= */}
        <div className="
          bg-[#0D0D0D]
          border
          border-[#292929]
          rounded-2xl
          shadow-xl
          p-6
        ">

          <div className="
            flex
            items-center
            gap-4
            mb-6
            pb-6
            border-b
            border-[#292929]
          ">

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
              text-lg
            ">
              📋
            </div>

            <div>

              <h2 className="
                text-xl
                font-bold
                text-white
              ">
                Student Requests
              </h2>

              <p className="
                text-sm
                text-[#888888]
                mt-1
              ">
                Review submitted Leave and OD applications
              </p>

            </div>

          </div>

          {requests.length === 0 ? (

            /* ================= EMPTY STATE ================= */
            <div className="
              text-center
              py-12
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
                📋
              </div>

              <h3 className="
                text-lg
                font-semibold
                text-white
              ">
                No Requests
              </h3>

              <p className="
                text-[#888888]
                mt-1
                text-sm
              ">
                Student Leave / OD requests will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {requests.map((request) => (

                <div
                  key={request.id}
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

                    {/* ================= REQUEST DETAILS ================= */}
                    <div className="flex-1">

                      {/* Student + Type + Status */}
                      <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        mb-4
                      ">

                        <h3 className="
                          font-bold
                          text-lg
                          text-white
                        ">
                          {request.student}
                        </h3>

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            border
                            ${
                              request.type === "Leave"
                                ? "bg-[#17130A] text-[#D4AF37] border-[#3D3318]"
                                : "bg-[#111111] text-[#F2D675] border-[#333333]"
                            }
                          `}
                        >
                          {request.type}
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
                              request.status === "Pending"
                                ? "bg-[#111111] text-[#F2D675] border-[#333333]"
                                : request.status === "Approved"
                                ? "bg-[#17130A] text-[#D4AF37] border-[#3D3318]"
                                : "bg-[#171010] text-[#E08A8A] border-[#422222]"
                            }
                          `}
                        >
                          {request.status}
                        </span>

                      </div>

                      {/* Details */}
                      <div className="
                        grid
                        md:grid-cols-2
                        gap-3
                        text-sm
                      ">

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            Register No:
                          </strong>{" "}
                          {request.registerNo}
                        </p>

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            From:
                          </strong>{" "}
                          {request.fromDate}
                        </p>

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            To:
                          </strong>{" "}
                          {request.toDate}
                        </p>

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            Submitted:
                          </strong>{" "}
                          {request.submittedAt}
                        </p>

                      </div>

                      {/* Reason */}
                      <div className="
                        mt-4
                        bg-[#0D0D0D]
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
                          REASON
                        </p>

                        <p className="
                          text-sm
                          text-[#D0D0D0]
                          leading-6
                        ">
                          {request.reason}
                        </p>

                      </div>

                      {/* Reviewed At */}
                      {request.reviewedAt && (
                        <p className="
                          text-xs
                          text-[#666666]
                          mt-3
                        ">
                          Reviewed: {request.reviewedAt}
                        </p>
                      )}

                    </div>

                    {/* ================= ACTIONS ================= */}
                    {request.status === "Pending" && (
                      <div className="
                        flex
                        lg:flex-col
                        gap-3
                        justify-center
                        lg:min-w-[145px]
                      ">

                        <button
                          onClick={() =>
                            updateStatus(request.id, "Approved")
                          }
                          className="
                            flex-1
                            lg:flex-none
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
                          ✓ Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(request.id, "Rejected")
                          }
                          className="
                            flex-1
                            lg:flex-none
                            px-5
                            py-2.5
                            rounded-lg
                            bg-[#171010]
                            border
                            border-[#422222]
                            text-[#E08A8A]
                            text-sm
                            font-semibold
                            hover:bg-[#211313]
                            transition
                            whitespace-nowrap
                          "
                        >
                          ✕ Reject
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

      {/* ================= FOOTER ================= */}
      <footer className="
        bg-[#080808]
        border-t
        border-[#292929]
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

          <p className="
            text-xs
            text-[#666666]
          ">
            College Workflow System
          </p>

          <div className="flex items-center gap-2">

            <span className="
              w-1.5
              h-1.5
              rounded-full
              bg-[#D4AF37]
            "></span>

            <p className="
              text-xs
              text-[#777777]
            ">
              Faculty Services
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default TeacherLeaveOD;