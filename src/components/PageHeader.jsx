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
    <header className="mb-7 sm:mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Page Information */}
        <div className="min-w-0 flex-1">
          {badge && (
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C7A647]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9A7926] sm:text-[11px]">
                {badge}
              </span>
            </div>
          )}

          <h1 className="break-words text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mt-1.5 max-w-2xl text-xs leading-6 text-gray-500 sm:text-sm">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {(children || backTo) && (
          <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:justify-end">
            {children}

            {backTo && (
              <Link
                to={backTo}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-[#E3CE8D] hover:bg-[#FBF7E9] hover:text-[#80651E] focus:outline-none focus:ring-2 focus:ring-[#D8B65C]/30"
              >
                {backLabel}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Subtle divider */}
      <div className="mt-5 border-b border-gray-100 sm:mt-6" />
    </header>
  );
}