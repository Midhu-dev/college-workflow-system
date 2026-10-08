export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#292929] bg-[#080808] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#666666]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[#888888] font-medium">Campus Connect</span>
          <span>—</span>
          <span>Integrated College Workflow System</span>
        </div>
        <p className="text-[#666666]">
          Designed for faculty and student collaboration
        </p>
      </div>
    </footer>
  );
}
