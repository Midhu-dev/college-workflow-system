import { Link } from "react-router-dom";

export default function EmptyState({
  icon = "📭",
  title = "No records found",
  message = "There are no items to display right now.",
  actionText,
  actionLink,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`bg-[#0D0D0D] border border-[#292929] rounded-2xl p-10 sm:p-14 text-center max-w-xl mx-auto my-6 ${className}`}
    >
      <div className="mx-auto w-14 h-14 rounded-2xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-white tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-[#888888] mt-2 max-w-sm mx-auto leading-relaxed">
        {message}
      </p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center justify-center mt-6 px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-semibold transition-colors shadow-sm"
        >
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center mt-6 px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-semibold transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
