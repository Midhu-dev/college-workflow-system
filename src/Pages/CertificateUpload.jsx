import { useState } from "react";
import { Link } from "react-router-dom";

function CertificateUpload() {
  const [certificateName, setCertificateName] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!certificateName || !certificateFile) {
      setMessage(
        "Please enter the certificate name and upload the certificate."
      );
      return;
    }

    const existingCertificates =
      JSON.parse(localStorage.getItem("certificates")) || [];

    const reader = new FileReader();

    reader.onload = () => {
      const newCertificate = {
        id: Date.now(),
        student: "Midhun K",
        registerNo: "AI2025",
        certificateName,
        fileName: certificateFile.name,
        fileData: reader.result,
        status: "Pending",
        uploadedAt: new Date().toLocaleString(),
        remarks: "",
      };

      localStorage.setItem(
        "certificates",
        JSON.stringify([
          ...existingCertificates,
          newCertificate,
        ])
      );

      setCertificateName("");
      setCertificateFile(null);
      setMessage("Certificate uploaded successfully!");

      document.getElementById("certificateFile").value = "";
    };

    reader.readAsDataURL(certificateFile);
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
              Upload Certificate
            </h1>

            <p className="text-sm text-[#B8B8B8] mt-1">
              Upload your certificate for teacher verification
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
      <main className="max-w-2xl mx-auto px-6 py-10">

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
              📜
            </div>

            <h2 className="text-xl font-bold text-white">
              Certificate Details
            </h2>

            <p className="text-sm text-[#B8B8B8] mt-1">
              Provide the certificate information and upload the document.
            </p>

          </div>

          {/* MESSAGE */}
          {message && (
            <div className={`
              mb-6
              p-4
              rounded-lg
              border
              text-sm
              ${
                message.includes("successfully")
                  ? "bg-[#17130A] border-[#3D3318] text-[#D4AF37]"
                  : "bg-[#17130A] border-[#3D3318] text-[#F2D675]"
              }
            `}>

              <div className="flex items-start gap-3">

                <span className="
                  mt-0.5
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

            {/* CERTIFICATE NAME */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-white
                mb-2
              ">
                Certificate Name
              </label>

              <input
                type="text"
                value={certificateName}
                onChange={(e) =>
                  setCertificateName(e.target.value)
                }
                placeholder="Example: Java Certification"
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
                  transition
                "
              />

            </div>

            {/* FILE */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-white
                mb-2
              ">
                Certificate File
              </label>

              <div className="
                bg-[#080808]
                border
                border-[#333333]
                rounded-lg
                p-1
                focus-within:border-[#D4AF37]
                transition
              ">

                <input
                  id="certificateFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    setCertificateFile(e.target.files[0])
                  }
                  className="
                    w-full
                    px-3
                    py-2
                    text-sm
                    text-[#B8B8B8]
                    file:mr-4
                    file:py-2
                    file:px-4
                    file:rounded-md
                    file:border-0
                    file:bg-[#D4AF37]
                    file:text-[#050505]
                    file:font-semibold
                    file:cursor-pointer
                    hover:file:bg-[#F2D675]
                    file:transition
                  "
                />

              </div>

              <p className="text-xs text-[#777777] mt-2">
                Supported formats: PDF, JPG, JPEG, PNG
              </p>

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
              Upload Certificate
            </button>

          </form>

        </div>

        {/* INFO */}
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
              shrink-0
            ">
              i
            </div>

            <div>

              <p className="text-sm font-semibold text-white">
                Verification Process
              </p>

              <p className="text-xs text-[#B8B8B8] mt-1 leading-relaxed">
                Your uploaded certificate will remain pending until it is
                reviewed and verified by the responsible faculty member.
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

export default CertificateUpload;