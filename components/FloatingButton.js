"use client";

import { useState, useContext } from "react";
import { ModalContext } from "./ModalContext";

// 正中心正七邊形 SVG
function DoublePolygonIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {/* <polygon points="50,20 74.64,30.20 81.94,52.74 67.06,73.78 32.94,73.78 18.06,52.74 25.36,30.20" /> */}
      <polygon points="50.0,14.0 78.14,26.55 84.1,58.01 65.62,83.44 34.38,83.44 15.9,58.01 21.86,26.55" />
    </svg>
  );
}

export default function FloatingButton() {
  const { openModal } = useContext(ModalContext);

  return (
    <>
      {/* SVG 按鈕 */}
      <button
        onClick={openModal}
        className="fixed bottom-16 right-6 z-30 w-24 h-24 lg:w-32 lg:h-32 bg-[#0E0E0E] text-white rounded-full flex items-center justify-center group"
      >
        <div className="relative w-20 h-20 lg:w-28 lg:h-28">
          {/* 外層光暈容器 */}
          <div className="absolute inset-0 rounded-full animate-pulse shadow-[0_0_20px_5px_rgba(255,255,255,0.2)]" />

          <DoublePolygonIcon className="absolute inset-0 w-full h-full" />

          <div className="absolute inset-0 w-full h-full transition-transform duration-300  group-hover:rotate-[25.06deg]">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-full h-full"
            >
              {/* 取消放大版 */}
              {/* <polygon points="50,12 78.12,25.17 86.63,53.65 68.93,79.24 31.07,79.24 13.37,53.65 21.88,25.17" /> */}
              <polygon points="50.0,14.0 78.14,26.55 84.1,58.01 65.62,83.44 34.38,83.44 15.9,58.01 21.86,26.55" />
            </svg>
          </div>

          <span className="absolute inset-0 flex items-center justify-center text-sm lg:text-base">
            Write
          </span>
        </div>
      </button>

      {/* Modal */}
      {/* {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#3e3e3e] p-6 w-11/12 max-w-sm h-[560px] rounded-lg text-white">
            <h2 className="text-lg mb-4">Leave a Message</h2>
            <textarea className="w-full h-32 p-2 text-black" placeholder="Type your message..." />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-700 rounded">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 rounded">Submit</button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
