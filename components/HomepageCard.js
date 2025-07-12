"use client";

import HomepageCardStar from "./HomepageCardStar";

export default function HomepageCard({
  nickname,
  message,
  date,
  starColor,
  starShape,
  onClose,
}) {
  return (
    <div
      className="relative bg-[#0e0e0e] shadow-[0_0_4px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.9)]  p-6 w-11/12 max-w-sm max-h-[500px] mx-auto rounded-xl text-white overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-1 right-3 text-white text-3xl hover:opacity-70"
        aria-label="Close"
      >
        ×
      </button>
      {/* 可滾動內容區域 */}
      <div className="h-full overflow-y-auto pr-2 space-y-2 " >
        <div className="flex justify-between items-center">
          <div className="text-base md:text-lg font-bold">{nickname}</div>
          <HomepageCardStar starShape={starShape} starColor={starColor} />{" "}
          {/* ✅ 名稱統一 */}
        </div>
        <div className="text-sm md:text-base whitespace-pre-wrap break-words">
          {message}
        </div>
        <div className="text-xs text-gray-400 text-right">{date}</div>
      </div>
    </div>
  );
}
