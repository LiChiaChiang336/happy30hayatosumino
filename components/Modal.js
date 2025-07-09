// Here to change Modal appearance.

"use client";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0e0e0e] bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-[#0e0e0e] shadow-[0_0_20px_rgba(255,255,255,0.6)] mt-6 p-6 w-11/12 max-w-sm max-h-[500px] md:max-h-[660px] lg:max-h-[800px] sm:max-h-[700px] rounded-xl text-white overflow-y-auto">
        {children}
        {/* <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded">Cancel</button>
          <button className="px-4 py-2 bg-blue-600 rounded">Submit</button>
        </div> */}
      </div>
    </div>
  );
}
