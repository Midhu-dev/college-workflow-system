import { useState } from "react";
import { Link } from "react-router-dom";

function LeaveOD() {
  const [type, setType] = useState("Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || !reason) {
      setMessage("Please fill all the fields.");
      return;
    }

    const existingRequests =
      JSON.parse(localStorage.getItem("leaveODRequests")) || [];

    const newRequest = {
      id: Date.now(),
      student: "Midhun K",
      registerNo: "AI2025",
      type,
      fromDate,
      toDate,
      reason,
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "leaveODRequests",
      JSON.stringify([...existingRequests, newRequest])
    );

    setFromDate("");
    setToDate("");
    setReason("");
    setMessage(`${type} request submitted successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ================= HEADER ================= */}
      <header className="
        bg-[#080808]
        border-b
        border-[#292929]
        px-6
        sm:px-8
        py-5
      ">

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

          {/* TITLE */}
          <div>

            <div className="flex items-center gap-2 mb-2">

              <span className="
                w-2
                h-2
                rounded-full
                bg-[#D4AF37]
              "></span>

              <span className="
                text-xs
                font-semibold
                tracking-wider
                text-[#D4AF37]
                uppercase
              ">
                Student Services
              </span>

            </div>

            <h1 className="text-2xl font-bold text-white">
              Leave / OD Application
            </h1>

            <p className="text-sm text-[#B8B8B8] mt-1">
              Submit your leave or on-duty request
            </p>

          </div>

          {/* DASHBOARD */}
          <Link
            to="/student"
            className="
              inline-flex
              items-center
              justify-center
              px-4
              py-2
              rounded-lg
              bg-[#0D0D0D]
              border
              border-[#292929]
              text-white
              text-sm
              font-medium
              hover:border-[#D4AF37]
              hover:text-[#D4AF37]
              transition
              duration-200
            "
          >
            ← Back to Dashboard
          </Link>

        </div>

      </header>

      {/* ================= CONTENT ================= */}
      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* FORM CARD */}
        <div className="
          bg-[#0D0D0D]
          rounded-2xl
          border
          border-[#292929]
          shadow-xl
          p-6
          sm:p-8
        ">

          {/* CARD HEADER */}
          <div className="mb-7">

            <div className="
              w-11
              h-11
              rounded-lg
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-xl
              mb-4
            ">
              📋
            </div>

            <h2 className="text-xl font-bold text-white">
              Request Details
            </h2>

            <p className="text-sm text-[#B8B8B8] mt-1">
              Fill in the details below to submit your request.
            </p>

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="
              mb-6
              p-4
              rounded-lg
              bg-[#17130A]
              border
              border-[#3D3318]
              text-[#D4AF37]
              text-sm
            ">

              <div className="flex items-center gap-3">

                <span className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#D4AF37]
                  shrink-0
                "></span>

                <span>
                  {message}
                </span>

              </div>

            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* REQUEST TYPE */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-white
                mb-2
              ">
                Request Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="
                  w-full
                  border
                  border-[#333333]
                  rounded-lg
                  px-4
                  py-3
                  bg-[#080808]
                  text-white
                  focus:border-[#D4AF37]
                  focus:ring-1
                  focus:ring-[#D4AF37]
                  outline-none
                  transition
                "
              >

                <option value="Leave" className="bg-[#080808]">
                  Leave
                </option>

                <option value="OD" className="bg-[#080808]">
                  OD
                </option>

              </select>

            </div>

            {/* DATES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* FROM DATE */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-white
                  mb-2
                ">
                  From Date
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="
                    w-full
                    border
                    border-[#333333]
                    rounded-lg
                    px-4
                    py-3
                    bg-[#080808]
                    text-white
                    focus:border-[#D4AF37]
                    focus:ring-1
                    focus:ring-[#D4AF37]
                    outline-none
                    transition
                  "
                />

              </div>

              {/* TO DATE */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-white
                  mb-2
                ">
                  To Date
                </label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="
                    w-full
                    border
                    border-[#333333]
                    rounded-lg
                    px-4
                    py-3
                    bg-[#080808]
                    text-white
                    focus:border-[#D4AF37]
                    focus:ring-1
                    focus:ring-[#D4AF37]
                    outline-none
                    transition
                  "
                />

              </div>

            </div>

            {/* REASON */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-white
                mb-2
              ">
                Reason
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="5"
                placeholder={
                  type === "Leave"
                    ? "Enter the reason for your leave..."
                    : "Enter the reason for your OD..."
                }
                className="
                  w-full
                  border
                  border-[#333333]
                  rounded-lg
                  px-4
                  py-3
                  bg-[#080808]
                  text-white
                  placeholder:text-[#666666]
                  focus:border-[#D4AF37]
                  focus:ring-1
                  focus:ring-[#D4AF37]
                  outline-none
                  resize-none
                  transition
                "
              />

            </div>

            {/* SUBMIT */}
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
              Submit {type} Request
            </button>

          </form>

        </div>

        {/* INFO CARD */}
        <div className="
          mt-5
          bg-[#0D0D0D]
          border
          border-[#292929]
          rounded-xl
          p-4
        ">

          <div className="flex items-start gap-3">

            <div className="
              w-8
              h-8
              rounded-lg
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-[#D4AF37]
              text-sm
              font-bold
              shrink-0
            ">
              i
            </div>

            <div>

              <p className="text-sm font-semibold text-white">
                Request Status
              </p>

              <p className="
                text-xs
                text-[#B8B8B8]
                mt-1
                leading-relaxed
              ">
                Your request will be marked as pending after submission and
                can be reviewed by the responsible faculty member.
              </p>

            </div>

          </div>

        </div>

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

          <p className="text-sm text-[#B8B8B8]">
            © 2026 College Management Portal
          </p>

          <div className="flex items-center gap-2">

            <span className="
              w-1.5
              h-1.5
              rounded-full
              bg-[#D4AF37]
            "></span>

            <p className="text-sm text-[#B8B8B8]">
              Student Portal
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default LeaveOD;