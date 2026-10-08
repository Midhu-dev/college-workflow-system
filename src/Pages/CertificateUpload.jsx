import { useState } from "react";
import { Link } from "react-router-dom";

function CertificateUpload() {
  const [certificateType, setCertificateType] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

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
              Certificate Submitted
            </h2>

            <p className="text-slate-500 mt-2">
              Your certificate has been submitted for teacher verification.
            </p>

            <div className="mt-6 bg-slate-50 rounded-xl p-5 text-left">

              <div className="flex justify-between mb-3">
                <span className="text-sm text-slate-500">
                  Certificate
                </span>

                <span className="font-semibold text-slate-800">
                  {certificateName}
                </span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-sm text-slate-500">
                  File
                </span>

                <span className="font-semibold text-slate-800">
                  {file.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                  Status
                </span>

                <span className="text-sm font-semibold text-yellow-600">
                  Verification Pending
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
                  setCertificateName("");
                  setFile(null);
                }}
                className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Upload Another
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
            Certificate Upload
          </h2>

          <p className="text-slate-500 mt-2">
            Upload your certificate for verification by the responsible teacher.
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
              onChange={(e) => {
                setCertificateType(e.target.value);
                setCertificateName(e.target.options[e.target.selectedIndex].text);
              }}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">
                Select certificate type
              </option>

              <option value="Participation">
                Participation Certificate
              </option>

              <option value="Workshop">
                Workshop Certificate
              </option>

              <option value="Internship">
                Internship Certificate
              </option>

              <option value="Competition">
                Competition Certificate
              </option>

              <option value="Hackathon">
                Hackathon Certificate
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* File Upload */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Certificate File
            </label>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition">

              <div className="text-4xl mb-3">
                📄
              </div>

              <p className="text-sm text-slate-600 mb-2">
                Select your certificate file
              </p>

              <p className="text-xs text-slate-400 mb-4">
                PDF, JPG or PNG
              </p>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
                required
                className="block w-full text-sm text-slate-600
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:bg-blue-50 file:text-blue-700
                           file:font-semibold
                           hover:file:bg-blue-100"
              />

            </div>

            {file && (
              <div className="mt-3 bg-slate-50 rounded-lg p-3">

                <p className="text-sm text-slate-700">
                  Selected file:
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {file.name}
                </p>

              </div>
            )}

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit for Verification
          </button>

        </form>

      </main>

    </div>
  );
}

export default CertificateUpload;