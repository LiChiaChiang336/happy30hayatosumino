// Here to change Modal appearance.

"use client";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-md flex items-center justify-center z-40">
      {/* 外層只管尺寸＋置中 */}
      <div className="relative w-11/12 max-w-sm md:max-w-md mt-6">
        {/* 發光卡片：不要 overflow-y */}
        <div className="bg-[#0e0e0e] shadow-[0_0_4px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.9)] rounded-xl text-white">
          {/* 內層才是可滾動內容 */}
          <div className="max-h-[500px] overflow-y-auto p-6 pr-7 modal-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
