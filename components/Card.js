"use client";

import CardStar from "./CardStar";

export default function Card({ nickname, message, date, starColor, starShape }) {
  return (
    <div className="relative bg-[#0e0e0e] shadow-[0_0_4px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.9)] p-6 w-11/12 max-w-sm mx-auto rounded-xl text-white space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{nickname}</div>
        <CardStar sides={starShape} color={starColor} />
      </div>
      <div className="text-base whitespace-pre-wrap break-words">{message}</div>
      <div className="text-xs text-gray-400 text-right">{date}</div>
    </div>
  );
}
