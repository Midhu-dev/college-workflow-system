import { Link } from "react-router-dom";

export default function PageHeader({
  badge = "Portal",
  title,
  description,
  backTo,
  backLabel = "← Dashboard",
  children,
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {badge && (
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[11px] font-semibold tracking-widest text-[#D4AF37] uppercase">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {title}
          </h1>

          {description && (
            <p className="text-sm text-[#888888] mt-1.5 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {children}

          {backTo && (
            <Link
              to={backTo}
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-[#0D0D0D] border border-[#292929] text-xs font-semibold text-[#B8B8B8] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              {backLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
