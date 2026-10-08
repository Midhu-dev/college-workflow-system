import { useState } from "react";
import { Link } from "react-router-dom";

function CertificateRequest() {
  const [certificateType, setCertificateType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* ================= SUBMITTED ================= */

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">

        {/* NAVBAR */}
        <nav className="bg-[#080808] border-b border-[#292929] px-6 py-4">

          <div className="max-w-5xl mx-auto">

            <div className="flex items-center gap-3">

              <div className="
                w-10
                h-10
                rounded-lg
                bg-[#D4AF37]
                text-[#050505]
                flex
                items-center
                justify-center
                font-bold
              ">
                CW
              </div>

              <div>

                <h1 className="text-xl font-bold text-white">
                  College Workflow
                </h1>

                <p className="text-xs text-[#B8B8B8]">
                  Student Portal
                </p>

              </div>

            </div>

          </div>

        </nav>

        {/* MAIN */}
        <main className="max-w-3xl mx-auto px-6 py-10">

          <div className="
            bg-[#0D0D0D]
            rounded-2xl
            shadow-xl
            border
            border-[#292929]
            p-8
            text-center
          ">

            {/* SUCCESS ICON */}
            <div className="
              mx-auto
              w-16
              h-16
              bg-[#17130A]
              border
              border-[#3D3318]
              rounded-full
              flex
              items-center
              justify-center
              text-3xl
              text-[#D4AF37]
              font-bold
            ">
              ✓
            </div>

            <h2 className="text-2xl font-bold text-white mt-5">
              Certificate Request Submitted
            </h2>

            <p className="text-[#B8B8B8] mt-2">
              Your request has been sent to the responsible authority.
            </p>

            {/* REQUEST DETAILS */}
            <div className="
              mt-6
              bg-[#080808]
              rounded-xl
              p-5
              text-left
              border
              border-[#292929]
            ">

              {/* REQUEST ID */}
              <div className="flex justify-between items-center mb-4">

                <span className="text-sm text-[#B8B8B8]">
                  Request ID
                </span>

                <span className="font-semibold text-white">
                  #CR-001
                </span>

              </div>

              {/* CERTIFICATE */}
              <div className="flex justify-between items-center mb-4">

                <span className="text-sm text-[#B8B8B8]">
                  Certificate
                </span>

                <span className="font-semibold text-white text-right">
                  {certificateType}
                </span>

              </div>

              {/* STATUS */}
              <div className="flex justify-between items-center">

                <span className="text-sm text-[#B8B8B8]">
                  Status
                </span>

                <span className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  bg-[#17130A]
                  text-[#D4AF37]
                  border
                  border-[#3D3318]
                ">

                  <span className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-[#D4AF37]
                  "></span>

                  Pending

                </span>

              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

              <Link
                to="/student"
                className="
                  bg-[#D4AF37]
                  hover:bg-[#F2D675]
                  text-[#050505]
                  px-6
                  py-3
                  rounded-lg
                  font-semibold
                  transition
                  duration-200
                "
              >
                Back to Dashboard
              </Link>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setCertificateType("");
                  setPurpose("");
                  setAdditionalDetails("");
                }}
                className="
                  border
                  border-[#3A3A3A]
                  hover:border-[#D4AF37]
                  hover:text-[#D4AF37]
                  text-white
                  bg-[#0D0D0D]
                  px-6
                  py-3
                  rounded-lg
                  font-medium
                  transition
                  duration-200
                "
              >
                Make Another Request
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /* ================= REQUEST FORM ================= */

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="
        bg-[#080808]
        border-b
        border-[#292929]
        px-6
        py-4
      ">

        <div className="
          max-w-5xl
          mx-auto
          flex
          items-center
          justify-between
        ">

          {/* BRAND */}
          <div className="flex items-center gap-3">

            <div className="
              w-10
              h-10
              rounded-lg
              bg-[#D4AF37]
              text-[#050505]
              flex
              items-center
              justify-center
              font-bold
            ">
              CW
            </div>

            <div>

              <h1 className="text-xl font-bold text-white">
                College Workflow
              </h1>

              <p className="text-xs text-[#B8B8B8]">
                Student Portal
              </p>

            </div>

          </div>

          {/* DASHBOARD */}
          <Link
            to="/student"
            className="
              text-sm
              text-[#D4AF37]
              font-medium
              hover:text-[#F2D675]
              transition
            "
          >
            ← Dashboard
          </Link>

        </div>

      </nav>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-6 py-8">

        {/* PAGE HEADING */}
        <div className="mb-7">

          <div className="flex items-center gap-2 mb-3">

            <span className="
              w-2
              h-2
              rounded-full
              bg-[#D4AF37]
            "></span>

            <span className="
              text-sm
              font-medium
              text-[#D4AF37]
              uppercase
              tracking-wide
            ">
              Student Services
            </span>

          </div>

          <h2 className="text-3xl font-bold text-white">
            Certificate Request
          </h2>

          <p className="text-[#B8B8B8] mt-2">
            Request an official certificate from the college.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-[#0D0D0D]
            rounded-2xl
            shadow-xl
            border
            border-[#292929]
            p-7
            space-y-6
          "
        >

          {/* CERTIFICATE TYPE */}
          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-white
              mb-2
            ">
              Certificate Type
            </label>

            <select
              value={certificateType}
              onChange={(e) => setCertificateType(e.target.value)}
              required
              className="
                w-full
                px-4
                py-3
                bg-[#080808]
                text-white
                border
                border-[#333333]
                rounded-lg
                outline-none
                focus:border-[#D4AF37]
                focus:ring-1
                focus:ring-[#D4AF37]
                transition
              "
            >

              <option value="" className="bg-[#080808]">
                Select certificate
              </option>

              <option value="Bonafide Certificate" className="bg-[#080808]">
                Bonafide Certificate
              </option>

              <option
                value="Course Completion Certificate"
                className="bg-[#080808]"
              >
                Course Completion Certificate
              </option>

              <option value="Conduct Certificate" className="bg-[#080808]">
                Conduct Certificate
              </option>

              <option value="Study Certificate" className="bg-[#080808]">
                Study Certificate
              </option>

              <option
                value="Internship Permission Certificate"
                className="bg-[#080808]"
              >
                Internship Permission Certificate
              </option>

              <option value="Other" className="bg-[#080808]">
                Other
              </option>

            </select>

          </div>

          {/* PURPOSE */}
          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-white
              mb-2
            ">
              Purpose
            </label>

            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="
                w-full
                px-4
                py-3
                bg-[#080808]
                text-white
                border
                border-[#333333]
                rounded-lg
                outline-none
                focus:border-[#D4AF37]
                focus:ring-1
                focus:ring-[#D4AF37]
                transition
              "
            >

              <option value="" className="bg-[#080808]">
                Select purpose
              </option>

              <option value="Internship" className="bg-[#080808]">
                Internship
              </option>

              <option value="Higher Studies" className="bg-[#080808]">
                Higher Studies
              </option>

              <option value="Placement" className="bg-[#080808]">
                Placement
              </option>

              <option value="Government Purpose" className="bg-[#080808]">
                Government Purpose
              </option>

              <option value="Personal" className="bg-[#080808]">
                Personal
              </option>

              <option value="Other" className="bg-[#080808]">
                Other
              </option>

            </select>

          </div>

          {/* ADDITIONAL DETAILS */}
          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-white
              mb-2
            ">
              Additional Details
            </label>

            <textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Enter any additional information required..."
              rows="5"
              className="
                w-full
                px-4
                py-3
                bg-[#080808]
                text-white
                placeholder:text-[#777777]
                border
                border-[#333333]
                rounded-lg
                outline-none
                focus:border-[#D4AF37]
                focus:ring-1
                focus:ring-[#D4AF37]
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
            Submit Certificate Request
          </button>

        </form>

      </main>

      {/* FOOTER */}
      <footer className="
        mt-10
        border-t
        border-[#292929]
        bg-[#080808]
      ">

        <div className="
          max-w-5xl
          mx-auto
          px-6
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

          <p className="text-sm text-[#B8B8B8]">
            Student Portal
          </p>

        </div>

      </footer>

    </div>
  );
}

export default CertificateRequest;