"use client";

import { useState, useContext } from "react";
import { ModalContext } from "./ModalContext";
import Modal from "./Modal";
import ResultModal from "./ResultModal";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // "2025-07-10"
};

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
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit button 送出中動畫狀態
  const [showResultModal, setShowResultModal] = useState(false); // 送出成功或失敗的的 modal
  const [resultType, setResultType] = useState("success"); // 送出成功或失敗的的 modal "success" or "alreadySubmitted"
  const recaptchaRef = useRef(null); // reCAPTCHA機器人用

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
    <>
      {/* reCAPTCHA機器人用 start */}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        size="invisible"
      />
      {/* reCAPTCHA機器人用 end*/}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="flex flex-col items-center gap-6 p-4">
          <h2 className="font-bold text-lg md:text-2xl leading-relaxed break-words text-center">
            Leave your message as a{" "}
            <span className="text-[#D0A760] drop-shadow-[0_0_6px_rgba(150,200,255,0.9)]">
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
              <label className="mb-1 font-bold text-white text-sm md:text-lg">
                Select your star shape / chord{" "}
                <span className="text-red-500 text-sm md:text-lg">*</span>
              </label>
              <select
                className="p-2 bg-transparent border-b border-gray-500 text-white text-sm"
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
              <label className="mb-1 font-bold text-white text-sm md:text-lg">
                Select your star color{" "}
                <span className="text-red-500 text-sm md:text-lg">*</span>
              </label>
              <select
                className="p-2 bg-transparent border-b border-gray-500 text-white text-sm"
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
              className="p-2  font-bold rounded text-white bg-[#6760AB] hover:bg-[#544DA1] text-sm "
            >
              Play Chord ♫
            </button>
             <p className="text-xs text-center text-[#D0A760]">Please turn off silent mode to hear your chord.</p>

            <div className="flex flex-col">
              <label className="mb-1 font-bold text-white text-sm md:text-lg">
                Your name{" "}
                <span className="text-red-500 text-sm md:text-lg">*</span>
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
                } text-white text-sm`}
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
              <label className="mb-1 font-bold text-white text-sm md:text-lg">
                Your message{" "}
                <span className="text-red-500 text-sm md:text-lg">*</span>
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
                } text-white text-sm resize-none`}
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

          <div className="mt-4 flex flex-col justify-end gap-3 md:px-6">
            <hr className="border-[#D0A760] w-full " />
            <p className="font-bold text-sm md:text-base text-[#D0A760] leading-relaxed break-words">
              ・Each person may leave{" "}
              <span className="text-[#CB6947] font-black">
                only one message
              </span>{" "}
              to light up the stars. Share your most heartfelt words.
            </p>
            <p className="font-bold text-sm md:text-base text-[#D0A760] leading-relaxed break-words">
              ・You can submit your message until <span className="text-[#CB6947] font-black">August 14, 2025 (UTC+8).</span>
            </p>
            <p className="font-bold text-sm md:text-base text-[#D0A760] leading-relaxed break-words">
              ・This is a public message board. We record only the number of
              messages to prevent duplicate posts and do not collect your
              personal information. For your safety, please avoid sharing any
              private or sensitive data.
            </p>
            <p className="font-bold text-sm md:text-base text-[#D0A760] leading-relaxed break-words">
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
              className="w-36 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm md:text-lg "
            >
              Cancel
            </button>

            {/* Submit 按鈕 onClick 新增驗證邏輯 */}
            <button
              onClick={async () => {
                // 這是要測試一天留言一次
                const today = getTodayString();
                const storedDate = localStorage.getItem("messageSubmitted");

                // 如果已經留言過
                if (storedDate === today) {
                  setResultType("alreadySubmitted");
                  setShowResultModal(true);
                  return;
                }

                // 原本的驗證
                const trimmedName = name.trim();
                const trimmedMessage = message.trim();
                if (!trimmedName) setNameError(true);
                if (!trimmedMessage) setMessageError(true);
                if (!trimmedName || !trimmedMessage) return;

                const safeName = escapeHtml(trimmedName);
                const safeMessage = escapeHtml(trimmedMessage);

                // 防止機器人 Honeypot 欄位被填
                if (trap && trap.trim() !== "") {
                  console.warn("Bot detected, submission blocked.");
                  return;
                }
                try {
                  setIsSubmitting(true); // 按下去後變成送出中

                  // 執行 reCAPTCHA，取得 token
                  const recaptchaToken =
                    await recaptchaRef.current.executeAsync();
                  recaptchaRef.current.reset(); // 驗證後記得 reset

                  const res = await fetch("/api/message", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      nickname: safeName,
                      message: safeMessage,
                      starShape: Number(sides),
                      starColor: color,
                      trap: trap,
                      recaptchaToken: recaptchaToken, // 給 reCAPTCHA 用
                    }),
                  });

                  const result = await res.json();
                  console.log("API Response:", result);

                  if (result.success) {
                    // alert("Message submitted successfully!");

                    // 留言成功後，localStorage 記錄今天
                    localStorage.setItem("messageSubmitted", today);
                    setName("");
                    setMessage("");
                    setResultType("success");
                    setShowResultModal(true);
                  } else {
                    // alert("Error: " + result.error);
                    setResultType("alreadySubmitted"); // 也可以根據錯誤訊息分類
                    setShowResultModal(true);
                  }
                } catch (error) {
                  console.error("Error submitting message:", error);
                  alert("Unexpected error, please try again later.");
                } finally {
                  setIsSubmitting(false); // 無論成功或失敗，都把按鈕恢復
                }

                // 這裡可以在submit送出時在console看 safeName 和 safeMessage
                // console.log(
                //   `Submit: safeName:${safeName}, safeMessage:${safeMessage}`
                // );
              }}
              disabled={isSubmitting}
              className="w-36 px-4 py-2 bg-[#6760AB] rounded hover:bg-[#544DA1] text-sm md:text-lg flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <ResultModal
            isOpen={showResultModal}
            onClose={() => setShowResultModal(false)}
            type={resultType}
            closeMainModal={closeModal} // 新增
            closeResultModal={() => setShowResultModal(false)} // 傳一個關閉小 modal 的 function
          />
        </div>
      </Modal>
    </>
  );
}
