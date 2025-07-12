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
    <div className="fixed inset-0 bg-gray bg-opacity-5 backdrop-blur-md flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="bg-[#0e0e0e] shadow-[0_0_4px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.9)] p-6 rounded-xl text-white w-80 text-center space-y-6"
      >
        {type === "success" ? (
          <>
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
                   router.push("/");// 去首頁
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
        ) : (
          <>
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
