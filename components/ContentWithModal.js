"use client";

import { useState, useContext } from "react";
import { ModalContext } from "./ModalContext";
import Modal from "./Modal";

export default function ContentWithModal() {
  const { isOpen, closeModal } = useContext(ModalContext);

  const [sides, setSides] = useState("7"); // 預設為 7 sides
  const [color, setColor] = useState("#D0A760"); // 預設為 SOLARI

  const colorOptions = [
    { hex: "#D0A760", name: "SOLARI" },
    { hex: "#CB6947", name: "POLARIS" },
    { hex: "#71A8A1", name: "NEW BIRTH" },
    { hex: "#A3C8DE", name: "PRE RAIN" },
    { hex: "#7D92A5", name: "AFTER DAWN" },
    { hex: "#3A3CCA", name: "ONCE IN A BLUE MOON" },
    { hex: "#6760AB", name: "NOCTURNE" },
  ];

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

  const playChord = () => {
    const sideNum = Number(sides);
    let freqs = chordMap[sideNum];

    if (sideNum === 13 && color === "#6760AB") {
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
      osc.stop(ctx.currentTime + 1.2);
    });
  };

  const renderStarPoints = () => {
    const spikes = Number(sides) || 7;
    const outerRadius = 40;
    const innerRadius = 20;
    const centerX = 50;
    const centerY = 50;
    let points = "";

    const step = Math.PI / spikes;

    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points += `${x},${y} `;
    }

    return points.trim();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="flex flex-col items-center gap-6 p-4">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 h-32"
        >
          <defs>
            <filter id="glow">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="7"
                floodColor={color}
                floodOpacity="0.9"
              />
              {/* floodColor={color} 控制光暈顏色與 star color 相同 */}
            </filter>
          </defs>
          <polygon
            points={renderStarPoints()}
            fill={color}
            filter="url(#glow)"
          />
        </svg>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <div className="flex flex-col">
            <label className="mb-1 text-white text-sm md:text-base lg:text-lg">
              Select your star shape (chord){" "}
              <span className="text-red-500 text-sm md:text-base lg:text-lg">
                *
              </span>
            </label>
            <select
              className="🔵 p-2 bg-transparent border-b border-gray-500 text-white text-sm md:text-base lg:text-lg"
              value={sides}
              onChange={(e) => setSides(e.target.value)}
            >
              {[7, 8, 9, 10, 11, 12, 13, 14].map((val) => (
                <option key={val} value={val}>
                  {val} sides
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-white text-sm md:text-base lg:text-lg">
              Select your star color{" "}
              <span className="text-red-500 text-sm md:text-base lg:text-lg">
                *
              </span>
            </label>
            <select
              className="🔵 p-2 bg-transparent border-b border-gray-500 text-white text-sm md:text-base lg:text-lg"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {colorOptions.map((c) => (
                <option key={c.hex} value={c.hex}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={playChord}
          className="p-2 rounded bg-[#71A8A1] text-white hover:bg-[#458A82]"
        >
          Play Chord ♫
        </button>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#6760AB] rounded hover:bg-[#544DA1]">
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}

// 調整說明：
// 1. 預設 sides=7, color=#D0A760，直接選好
// 2. label 改為完整說明，並加紅色 * 表示必填
// 3. 光暈 floodColor 使用 color，同 star 一樣
