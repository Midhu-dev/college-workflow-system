import { useState } from "react";
import { Link } from "react-router-dom";

function TeacherCertificates() {
  const [certificates, setCertificates] = useState([
    {
      id: "#CU-001",
      student: "Rahul M",
      category: "Certificate Upload",
      title: "Hackathon Certificate",
      description:
        "Certificate received for participating in Hackathon 2026.",
      submitted: "Oct 7, 2026",
      status: "Pending",
      file: "hackathon-certificate.pdf",
    },
    {
      id: "#CU-002",
      student: "Priya S",
      category: "Certificate Upload",
      title: "Workshop Certificate",
      description:
        "Certificate received for attending an AI workshop.",
      submitted: "Oct 6, 2026",
      status: "Pending",
      file: "ai-workshop-certificate.pdf",
    },
    {
      id: "#CR-001",
      student: "Kavin R",
      category: "Certificate Request",
      title: "Bonafide Certificate",
      description:
        "Student has requested a bonafide certificate for internship purposes.",
      submitted: "Oct 6, 2026",
      status: "Pending",
      file: null,
    },
    {
      id: "#CR-002",
      student: "Arun Kumar",
      category: "Certificate Request",
      title: "Course Completion Certificate",
      description:
        "Student has requested a course completion certificate.",
      submitted: "Oct 5, 2026",
      status: "Pending",
      file: null,
    },
  ]);

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const handleStatusChange = (id, status) => {
    setCertificates(
      certificates.map((certificate) =>
        certificate.id === id
          ? { ...certificate, status }
          : certificate
      )
    );

    setSelectedCertificate(null);
  };

  const pendingCount = certificates.filter(
    (certificate) => certificate.status === "Pending"
  ).length;

  const processedCount = certificates.filter(
    (certificate) => certificate.status !== "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              College Workflow
            </h1>

            <p className="text-xs text-slate-500">
              Teacher Portal
            </p>
          </div>

          <Link
            to="/teacher"
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            ← Dashboard
          </Link>

        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Certificate Management
          </h2>

          <p className="text-slate-500 mt-2">
            Verify uploaded certificates and process student
            certificate requests.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">
              Total
            </p>

            <p className="text-3xl font-bold text-slate-800 mt-2">
              {certificates.length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">
              Processed
            </p>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {processedCount}
            </p>
          </div>

        </div>

        {/* Certificate List */}
        <div className="space-y-4">

          {certificates.map((certificate) => (

            <div
              key={certificate.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                    {certificate.category ===
                    "Certificate Upload"
                      ? "📤"
                      : "📋"}
                  </div>

                  <div>

                    <div className="flex items-center gap-3 flex-wrap">

                      <h3 className="text-lg font-semibold text-slate-800">
                        {certificate.title}
                      </h3>

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          certificate.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : certificate.status ===
                              "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {certificate.status}
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-2">
                      {certificate.category} •{" "}
                      {certificate.student}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Submitted {certificate.submitted}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {certificate.id}
                    </p>

                  </div>

                </div>

                {certificate.status === "Pending" && (
                  <button
                    onClick={() =>
                      setSelectedCertificate(certificate)
                    }
                    className="self-start lg:self-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                  >
                    Review
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      </main>

      {/* Review Modal */}
      {selectedCertificate && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-7">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-sm text-slate-400">
                  {selectedCertificate.id}
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                  {selectedCertificate.title}
                </h3>

              </div>

              <button
                onClick={() => setSelectedCertificate(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>

            </div>

            {/* Details */}
            <div className="space-y-5">

              <div>
                <p className="text-sm text-slate-500">
                  Student
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {selectedCertificate.student}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Type
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {selectedCertificate.category}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Description
                </p>

                <div className="bg-slate-50 rounded-xl p-4 mt-2">
                  <p className="text-sm text-slate-700 leading-6">
                    {selectedCertificate.description}
                  </p>
                </div>
              </div>

              {selectedCertificate.file && (
                <div>
                  <p className="text-sm text-slate-500">
                    Uploaded File
                  </p>

                  <div className="mt-2 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4">

                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        📄
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {selectedCertificate.file}
                      </span>
                    </div>

                    <button className="text-sm text-blue-600 font-medium">
                      View
                    </button>

                  </div>
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="mt-7 pt-5 border-t border-slate-200">

              <p className="text-sm font-semibold text-slate-700 mb-3">
                Update Status
              </p>

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() =>
                    handleStatusChange(
                      selectedCertificate.id,
                      "Approved"
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  ✓ Approve
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(
                      selectedCertificate.id,
                      "Rejected"
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  ✕ Reject
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default TeacherCertificates;