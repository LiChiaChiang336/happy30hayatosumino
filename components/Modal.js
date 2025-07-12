// Here to change Modal appearance.

"use client";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-5 backdrop-blur-md flex items-center justify-center z-40">
      <div className="relative bg-[#0e0e0e] shadow-[0_0_4px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.9)] mt-6 p-6 w-11/12 max-w-sm md:max-w-md max-h-[500px] rounded-xl text-white overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
