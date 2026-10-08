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

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-100">

        <nav className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-5xl mx-auto">

            <h1 className="text-xl font-bold text-slate-800">
              College Workflow
            </h1>

            <p className="text-xs text-slate-500">
              Student Portal
            </p>

          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-6 py-10">

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">

            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
              ✓
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-5">
              Certificate Request Submitted
            </h2>

            <p className="text-slate-500 mt-2">
              Your request has been sent to the responsible authority.
            </p>

            <div className="mt-6 bg-slate-50 rounded-xl p-5 text-left">

              <div className="flex justify-between mb-3">

                <span className="text-sm text-slate-500">
                  Request ID
                </span>

                <span className="font-semibold text-slate-800">
                  #CR-001
                </span>

              </div>

              <div className="flex justify-between mb-3">

                <span className="text-sm text-slate-500">
                  Certificate
                </span>

                <span className="font-semibold text-slate-800">
                  {certificateType}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-sm text-slate-500">
                  Status
                </span>

                <span className="text-sm font-semibold text-yellow-600">
                  Pending
                </span>

              </div>

            </div>

            <div className="mt-6 flex gap-3 justify-center">

              <Link
                to="/student"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
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
                className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Make Another Request
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="bg-white border-b border-slate-200 px-6 py-4">

        <div className="max-w-5xl mx-auto flex items-center justify-between">

          <div>

            <h1 className="text-xl font-bold text-slate-800">
              College Workflow
            </h1>

            <p className="text-xs text-slate-500">
              Student Portal
            </p>

          </div>

          <Link
            to="/student"
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            ← Dashboard
          </Link>

        </div>

      </nav>

      {/* Main */}

      <main className="max-w-3xl mx-auto px-6 py-8">

        <div className="mb-7">

          <h2 className="text-3xl font-bold text-slate-800">
            Certificate Request
          </h2>

          <p className="text-slate-500 mt-2">
            Request an official certificate from the college.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7 space-y-6"
        >

          {/* Certificate Type */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Certificate Type
            </label>

            <select
              value={certificateType}
              onChange={(e) => setCertificateType(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">
                Select certificate
              </option>

              <option value="Bonafide Certificate">
                Bonafide Certificate
              </option>

              <option value="Course Completion Certificate">
                Course Completion Certificate
              </option>

              <option value="Conduct Certificate">
                Conduct Certificate
              </option>

              <option value="Study Certificate">
                Study Certificate
              </option>

              <option value="Internship Permission Certificate">
                Internship Permission Certificate
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* Purpose */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Purpose
            </label>

            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">
                Select purpose
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Higher Studies">
                Higher Studies
              </option>

              <option value="Placement">
                Placement
              </option>

              <option value="Government Purpose">
                Government Purpose
              </option>

              <option value="Personal">
                Personal
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* Additional Details */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Additional Details
            </label>

            <textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Enter any additional information required..."
              rows="5"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit Certificate Request
          </button>

        </form>

      </main>

    </div>
  );
}

export default CertificateRequest;