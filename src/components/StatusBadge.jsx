export default function StatusBadge({ status, className = "" }) {
  const norm = String(status || "").trim().toUpperCase();

  let styles;
  let dotColor;

  switch (norm) {
    case "PENDING":
      styles = "bg-amber-50 text-amber-800 border-amber-200";
      dotColor = "bg-amber-500";
      break;

    case "APPROVED":
    case "RESOLVED":
    case "VERIFIED":
    case "COMPLETED":
    case "PRESENT":
      styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
      dotColor = "bg-emerald-500";
      break;

    case "REJECTED":
    case "ABSENT":
      styles = "bg-red-50 text-red-700 border-red-200";
      dotColor = "bg-red-500";
      break;

    case "OD":
      styles = "bg-blue-50 text-blue-700 border-blue-200";
      dotColor = "bg-blue-500";
      break;

    case "LEAVE":
      styles = "bg-[#FBF7E9] text-[#80651E] border-[#F0E4BD]";
      dotColor = "bg-[#C7A647]";
      break;

    default:
      styles = "bg-gray-50 text-gray-600 border-gray-200";
      dotColor = "bg-gray-400";
      break;
  }

  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${styles} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`}
        aria-hidden="true"
      />

      <span className="break-words">
        {norm || "UNKNOWN"}
      </span>
    </span>
  );
}