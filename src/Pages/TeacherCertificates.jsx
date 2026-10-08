import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeacherCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);
  const [remarks, setRemarks] = useState("");

  const loadCertificates = () => {
    const storedCertificates =
      JSON.parse(localStorage.getItem("certificates")) || [];

    setCertificates(storedCertificates);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const updateCertificate = (status) => {
    if (!selectedCertificate) {
      return;
    }

    const updatedCertificates = certificates.map(
      (certificate) =>
        certificate.id === selectedCertificate.id
          ? {
              ...certificate,
              status,
              remarks,
              reviewedAt: new Date().toLocaleString(),
            }
          : certificate
    );

    localStorage.setItem(
      "certificates",
      JSON.stringify(updatedCertificates)
    );

    setCertificates(updatedCertificates);
    setSelectedCertificate(null);
    setRemarks("");
  };

  const pendingCertificates = certificates.filter(
    (certificate) => certificate.status === "Pending"
  );

  const verifiedCertificates = certificates.filter(
    (certificate) => certificate.status === "Verified"
  );

  const rejectedCertificates = certificates.filter(
    (certificate) => certificate.status === "Rejected"
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
              Certificate Verification
            </h1>

            <p className="text-[#B8B8B8] mt-1 text-sm">
              Review certificates submitted by students
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
          md:grid-cols-3
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
                  Pending
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-[#F2D675]
                  mt-2
                ">
                  {pendingCertificates.length}
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
                ⏳
              </div>

            </div>

          </div>

          {/* Verified */}
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
                  Verified
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-[#D4AF37]
                  mt-2
                ">
                  {verifiedCertificates.length}
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

          {/* Rejected */}
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
                  Rejected
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-[#E08A8A]
                  mt-2
                ">
                  {rejectedCertificates.length}
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
                text-xl
              ">
                ✕
              </div>

            </div>

          </div>

        </div>

        {/* ================= CERTIFICATES ================= */}
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
              📜
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Student Certificates
              </h2>

              <p className="text-sm text-[#777777] mt-1">
                Review and verify uploaded documents
              </p>
            </div>

          </div>

          {certificates.length === 0 ? (

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
                📜
              </div>

              <h3 className="
                text-lg
                font-semibold
                text-white
              ">
                No Certificates
              </h3>

              <p className="text-[#888888] mt-1 text-sm">
                Uploaded certificates will appear here.
              </p>

            </div>

          ) : (

            <div className="
              space-y-5
              border-t
              border-[#292929]
              pt-6
            ">

              {certificates.map((certificate) => (

                <div
                  key={certificate.id}
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

                      {/* Certificate Name + Status */}
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
                          {certificate.certificateName}
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
                              certificate.status === "Pending"
                                ? "bg-[#111111] text-[#F2D675] border-[#333333]"
                                : certificate.status === "Verified"
                                ? "bg-[#17130A] text-[#D4AF37] border-[#3D3318]"
                                : "bg-[#171010] text-[#E08A8A] border-[#422222]"
                            }
                          `}
                        >
                          {certificate.status}
                        </span>

                      </div>

                      {/* Student Information */}
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
                          {certificate.student}
                        </p>

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            Register No:
                          </strong>{" "}
                          {certificate.registerNo}
                        </p>

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            File:
                          </strong>{" "}
                          {certificate.fileName}
                        </p>

                        <p className="text-[#888888]">
                          <strong className="text-[#D0D0D0]">
                            Uploaded:
                          </strong>{" "}
                          {certificate.uploadedAt}
                        </p>

                      </div>

                      {/* View Certificate */}
                      {certificate.fileData && (
                        <a
                          href={certificate.fileData}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            inline-flex
                            items-center
                            gap-2
                            mt-5
                            px-4
                            py-2
                            rounded-lg
                            bg-[#17130A]
                            border
                            border-[#3D3318]
                            text-[#D4AF37]
                            text-sm
                            font-semibold
                            hover:bg-[#D4AF37]
                            hover:text-[#050505]
                            transition
                          "
                        >
                          View Certificate →
                        </a>
                      )}

                      {/* Remarks */}
                      {certificate.remarks && (
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
                            TEACHER REMARKS
                          </p>

                          <p className="
                            text-sm
                            text-[#D0D0D0]
                            leading-6
                          ">
                            {certificate.remarks}
                          </p>

                        </div>
                      )}

                    </div>

                    {/* ================= ACTION ================= */}
                    {certificate.status === "Pending" && (
                      <div className="flex items-start">

                        <button
                          onClick={() => {
                            setSelectedCertificate(
                              certificate
                            );
                            setRemarks("");
                          }}
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
                          Review Certificate
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

      {/* ================= REVIEW MODAL ================= */}
      {selectedCertificate && (
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
                    Certificate Review
                  </p>

                </div>

                <h2 className="
                  text-xl
                  font-bold
                  text-white
                ">
                  Review Certificate
                </h2>

                <p className="
                  text-sm
                  text-[#888888]
                  mt-1
                ">
                  {selectedCertificate.certificateName}
                </p>

              </div>

              <button
                onClick={() => {
                  setSelectedCertificate(null);
                  setRemarks("");
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

            {/* Open Certificate */}
            <a
              href={selectedCertificate.fileData}
              target="_blank"
              rel="noreferrer"
              className="
                block
                text-center
                bg-[#17130A]
                border
                border-[#3D3318]
                text-[#D4AF37]
                py-3
                rounded-lg
                font-semibold
                mb-5
                hover:bg-[#D4AF37]
                hover:text-[#050505]
                transition
              "
            >
              Open Certificate
            </a>

            {/* Remarks */}
            <label className="
              block
              text-sm
              font-semibold
              text-white
              mb-2
            ">
              Remarks
            </label>

            <textarea
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              rows="4"
              placeholder="Enter remarks..."
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
                  setSelectedCertificate(null);
                  setRemarks("");
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
                onClick={() => updateCertificate("Rejected")}
                className="
                  flex-1
                  py-3
                  rounded-lg
                  bg-[#171010]
                  border
                  border-[#422222]
                  text-[#E08A8A]
                  font-semibold
                  hover:bg-[#241414]
                  transition
                "
              >
                Reject
              </button>

              <button
                onClick={() => updateCertificate("Verified")}
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
                Verify
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

export default TeacherCertificates;