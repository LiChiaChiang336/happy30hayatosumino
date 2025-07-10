"use client";

import { useState, useContext } from "react";
import { ModalContext } from "./ModalContext";
import Modal from "./Modal";

export default function ContentWithModal() {
  const { isOpen, closeModal } = useContext(ModalContext);

  const [sides, setSides] = useState("7"); // 預設為 7 sides
  const [color, setColor] = useState("#D0A760"); // 預設為 SOLARI
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false); // 加入驗證狀態檢查name
  const [messageError, setMessageError] = useState(false); // 加入驗證狀態檢查message
  const escapeHtml = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // 新增 escapeHtml 函數，防止 XSS
  const [trap, setTrap] = useState(""); // 防止機器人留言的假隱藏欄位

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
        <h2 className="font-bold text-xl md:text-2xl leading-relaxed break-words text-center">
          Leave your message as a{" "}
          <span className="text-yellow-300 drop-shadow-[0_0_6px_rgba(150,200,255,0.9)]">
            star
          </span>{" "}
          in the Human Universe.
        </h2>
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
            <label className="mb-1 font-bold text-white text-sm md:text-xl">
              Select your star shape / chord{" "}
              <span className="text-red-500 text-sm md:text-xl">*</span>
            </label>
            <select
              className="p-2 bg-transparent border-b border-gray-500 text-white text-sm md:text-xl"
              value={sides}
              onChange={(e) => setSides(e.target.value)}
            >
              {[7, 8, 9, 10, 11, 12, 13, 14].map((val) => (
                <option key={val} value={val}>
                  {val} SIDES
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-bold text-white text-sm md:text-xl">
              Select your star color{" "}
              <span className="text-red-500 text-sm md:text-xl">*</span>
            </label>
            <select
              className="p-2 bg-transparent border-b border-gray-500 text-white text-sm md:text-xl"
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

          <button
            onClick={playChord}
            className="p-2  font-bold rounded text-white bg-[#6760AB] hover:bg-[#544DA1] text-sm md:text-xl"
          >
            Play Chord ♫
          </button>

          <div className="flex flex-col">
            <label className="mb-1 font-bold text-white text-sm md:text-xl">
              Your name{" "}
              <span className="text-red-500 text-sm md:text-xl">*</span>
            </label>
            <input
              type="text"
              maxLength={20}
              placeholder="Enter your name / nickname"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
              className={`p-2 bg-transparent border-b ${
                nameError ? "border-red-500" : "border-gray-500"
              } text-white text-sm md:text-xl`}
            />
            <div className="flex justify-between items-baseline text-sm text-gray-400 mt-1 ">
              <span className="leading-none">Max 20 characters</span>

              <span
                className={`text-sm mt-1 leading-none ${
                  name.length >= 20 ? "text-red-500" : "text-gray-400"
                }`}
              >
                {name.length}/20
              </span>
            </div>
            {/* 錯誤提示文字 */}
            {nameError && (
              <span className="text-base text-red-500 mt-1">
                Please fill the name area!
              </span>
            )}
          </div>

          {/* 這邊是隱藏的 Honeypot 欄位，用來防止機器人留言 */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden opacity-0"
          >
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              autoComplete="off"
              tabIndex={-1}
              onChange={(e) => setTrap(e.target.value)}
              value={trap}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-bold text-white text-sm md:text-xl">
              Your message{" "}
              <span className="text-red-500 text-sm md:text-xl">*</span>
            </label>
            <textarea
              maxLength={200}
              placeholder="Leave your message here"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageError(false);
              }}
              className={`p-2 bg-transparent border ${
                messageError ? "border-red-500" : "border-gray-500"
              } text-white text-sm md:text-xl resize-none`}
              rows={6}
            />
            <div className="flex justify-between items-baseline text-sm text-gray-400 mt-1">
              <span className="leading-none">Max 200 characters</span>

              <span
                className={`text-sm mt-1 leading-none ${
                  message.length >= 200 ? "text-red-500" : "text-gray-400"
                }`}
              >
                {message.length}/200
              </span>
            </div>
            {/* 錯誤提示文字 */}
            {messageError && (
              <span className="text-base text-red-500 mt-1">
                Please fill the message area!
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col justify-end gap-4 md:px-6">
          <hr className="border-[#D0A760] w-full " />
          <p className="font-bold text-sm md:text-lg text-[#D0A760] leading-relaxed break-words">
            ・Each person may leave{" "}
            <span className="text-[#CB6947] font-black">only one message</span> to light up
            the stars. Share your most heartfelt words.
          </p>
          <p className="font-bold text-sm md:text-lg text-[#D0A760] leading-relaxed break-words">
            ・This is a public message board. We record only the number of
            messages to prevent duplicate posts and do not collect your personal
            information. For your safety, please avoid sharing any private or
            sensitive data.
          </p>
          <p className="font-bold text-sm md:text-lg text-[#D0A760] leading-relaxed break-words">
            ・If you have any questions, please take a screenshot and email us
            at{" "}
            <a href="mailto:lichiachiang336@gmail.com" className="underline">
              lichiachiang336@gmail.com
            </a>
          </p>
        </div>
        {/* 按鈕區 */}
        <div className="mt-4 flex gap-4 w-full max-w-xs ">
          <button
            onClick={closeModal}
            className="w-full px-4 py-2 bg-gray-700 rounded text-sm md:text-xl "
          >
            Cancel
          </button>

          {/* Submit 按鈕 onClick 新增驗證邏輯 */}
          <button
            onClick={() => {
              const trimmedName = name.trim();
              const trimmedMessage = message.trim();

              if (!trimmedName) setNameError(true);
              if (!trimmedMessage) setMessageError(true);
              if (!trimmedName || !trimmedMessage) return;

              const safeName = escapeHtml(trimmedName);
              const safeMessage = escapeHtml(trimmedMessage);

              // 這裡可以送出 safeName 和 safeMessage
              console.log(`Submit: safeName:${safeName}, safeMessage:${safeMessage}`);
            }}
            className="w-full px-4 py-2 bg-[#6760AB] rounded hover:bg-[#544DA1] text-sm md:text-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
