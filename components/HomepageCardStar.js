"use client";

import { useEffect, useState } from "react";

export default function HomepageCardStar({ starShape = 7, starColor = "#D0A760" }) {
  const [points, setPoints] = useState("");
  const filterId = `glow-${starShape}-${starColor.replace("#", "")}`;

  useEffect(() => {
    // console.log("[HomepageCardStar] 正在計算 starShape:", starShape, " starColor:", starColor);
    const spikes = Number(starShape) || 7;
    const outerRadius = 40;
    const innerRadius = 20;
    const centerX = 50;
    const centerY = 50;
    let pts = "";

    const step = Math.PI / spikes;

    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      pts += `${x},${y} `;
    }

    setPoints(pts.trim());
  }, [starShape, starColor]); // ✅ 依賴 starShape, starColor

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-20 h-20"
    >
      <defs>
        <filter id={filterId}>
          <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor={starColor} floodOpacity="0.9" />
        </filter>
      </defs>
      <polygon points={points} fill={starColor} filter={`url(#${filterId})`} />
    </svg>
  );
}
