"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ResultModal({
  isOpen,
  onClose,
  type,
  closeMainModal,
  closeResultModal,
}) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0e0e0e] flex justify-center items-center z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="bg-[#0e0e0e] shadow-[0_0_4px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.9)] p-6 rounded-xl text-white w-80 text-center space-y-6"
      >
        {type === "success" ? (
          <>
            {/* 留言成功畫面（原樣保留） */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="space-y-2"
            >
              <p className="text-lg font-bold text-[#D0A760]">
                Thank you for being part of the Human Universe.
              </p>
              <p className="text-base">
                {" "}
                A new star now carries your words across the night.
              </p>
            </motion.div>

            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-[#84B2DB] hover:bg-[#5B93C4]  rounded"
                onClick={() => {
                  closeResultModal(); // 關掉 ResultModal
                  closeMainModal(); // 關掉留言 Modal
                  router.push("/"); // 去首頁
                }}
              >
                Home Page →
              </button>
              <button
                className="px-4 py-2 bg-[#6760AB] hover:bg-[#544DA1]  rounded"
                onClick={() => {
                  closeResultModal();
                  closeMainModal();
                  router.push("/board");
                }}
              >
                Star Board →
              </button>
            </div>
          </>
        ) : type === "eventClosed" ? (
          <>
            {/* 活動已結束畫面 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="space-y-3"
            >
              <p className="text-lg md:text-xl font-bold text-[#D0A760]">
                The message board has closed.
              </p>
              <p className="text-base leading-relaxed">
                The Human Universe message board accepted messages until{" "}
                <span className="font-bold text-[#CB6947]">
                  August 14, 2025 (UTC+8).
                </span>{" "}
                You can still explore the stars and read all the messages left
                by fans.
              </p>
            </motion.div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 bg-[#84B2DB] hover:bg-[#5B93C4] rounded"
                onClick={() => {
                  closeResultModal();
                  closeMainModal();
                  router.push("/");
                }}
              >
                Home Page →
              </button>
              <button
                className="px-4 py-2 bg-[#6760AB] hover:bg-[#544DA1] rounded"
                onClick={() => {
                  closeResultModal();
                  closeMainModal();
                  router.push("/board");
                }}
              >
                Star Board →
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 已留言過畫面（維持原本的 alreadySubmitted） */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="text-lg md:text-xl font-bold text-[#D0A760]"
            >
              You’ve already submitted a message. <br />
              If you have any question please contact us!
            </motion.p>
            <button
              className="px-4 py-2 bg-[#6760AB] hover:bg-[#544DA1] text-sm md:text-xl  rounded mt-2"
              onClick={closeResultModal}
            >
              I understand
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
