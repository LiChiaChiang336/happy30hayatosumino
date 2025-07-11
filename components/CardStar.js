"use client";

import { useCallback, useEffect, useState } from "react";

// 和弦資料
const chordMap = {
  7: [293.66, 349.23, 440.0, 587.33],
  8: [466.16, 587.33, 698.46, 880.0],
  9: [349.23, 554.37, 659.25, 880.0],
  10: [349.23, 523.25, 622.25, 880.0],
  11: [392.0, 440.0, 587.33, 739.99],
  12: [440.0, 493.88, 659.25, 830.61],
  13: [349.23, 440.0, 493.88, 659.25],
  14: [293.66, 369.99, 440.0, 587.33],
};

export default function CardStar({ sides = 7, color = "#D0A760" }) {
  const [points, setPoints] = useState("");
    const filterId = `glow-${sides}-${color.replace("#", "")}`;

  // 只在 client 算一次星星座標
  useEffect(() => {
    const spikes = Number(sides) || 7;
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
  }, [sides]);

  // 播放和弦
  const playChord = useCallback(() => {
    let freqs = chordMap[sides];
    if (sides === 13 && color === "#6760AB") {
      freqs = [329.63, 392.0, 466.16, 659.25];
    }
    if (!freqs) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gain.gain.linearRampToValueAtTime(0.0001, now + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(now + 1.2);
    });
  }, [sides, color]);

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-20 h-20 cursor-pointer"
      onClick={playChord}
    >
      <defs>
        <filter id={filterId}>
          <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor={color} floodOpacity="0.9" />
        </filter>
      </defs>
      <polygon points={points} fill={color} filter={`url(#${filterId})`}  />
    </svg>
  );
}
