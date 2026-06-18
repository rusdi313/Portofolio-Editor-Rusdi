import React from "react";

const SectionHeader = ({ number, title, isDark = false }) => {
  return (
    <div className={`w-full ${isDark ? "text-slate-400" : "text-slate-800"} mb-12`}>
      <hr className={`w-full border-t ${isDark ? "border-white/10" : "border-black/10"} mb-4`} />
      <div className="grid grid-cols-3 text-[10px] md:text-xs font-medium uppercase tracking-widest px-4 md:px-0">
        <div className="flex items-center gap-2">
          <span>◆</span>
          <span>({number})</span>
        </div>
        <div className="text-center">
          <span>({title})</span>
        </div>
        <div className="text-right">
          <span>© 2025</span>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
