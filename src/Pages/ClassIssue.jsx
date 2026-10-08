import { useState } from "react";
import { Link } from "react-router-dom";

function ClassIssue() {
  const [category, setCategory] = useState("Classroom");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !description) {
      setMessage("Please fill all the fields.");
      return;
    }

    const existingIssues =
      JSON.parse(localStorage.getItem("classIssues")) || [];

    const newIssue = {
      id: Date.now(),
      student: "Midhun K",
      registerNo: "AI2025",
      category,
      subject,
      description,
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
      resolution: "",
    };

    localStorage.setItem(
      "classIssues",
      JSON.stringify([...existingIssues, newIssue])
    );

    setSubject("");
    setDescription("");
    setMessage("Class issue submitted successfully!");
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
              Report Class Issue
            </h1>

            <p className="text-sm text-[#B8B8B8] mt-1">
              Submit an issue related to your class
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
              ⚠️
            </div>

            <h2 className="text-xl font-bold text-white">
              Issue Details
            </h2>

            <p className="text-sm text-[#B8B8B8] mt-1">
              Provide the details below so the issue can be reviewed quickly.
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

            {/* CATEGORY */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-white
                mb-2
              ">
                Issue Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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

                <option value="Classroom" className="bg-[#080808]">
                  Classroom
                </option>

                <option value="Faculty" className="bg-[#080808]">
                  Faculty
                </option>

                <option value="Timetable" className="bg-[#080808]">
                  Timetable
                </option>

                <option value="Infrastructure" className="bg-[#080808]">
                  Infrastructure
                </option>

                <option value="Other" className="bg-[#080808]">
                  Other
                </option>

              </select>

            </div>

            {/* ISSUE TITLE */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-white
                mb-2
              ">
                Issue Title
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Example: Projector not working"
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
                  transition
                "
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-white
                mb-2
              ">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
                placeholder="Describe the issue clearly..."
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
              Submit Issue
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
                What happens next?
              </p>

              <p className="
                text-xs
                text-[#B8B8B8]
                mt-1
                leading-relaxed
              ">
                Your issue will be submitted to the faculty portal for
                review. You can track its status from your dashboard.
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

export default ClassIssue;