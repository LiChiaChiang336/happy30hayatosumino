"use client";

export default function ResultModal({
  isOpen,
  onClose,
  type,
  closeMainModal,
  closeResultModal,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-5 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-[#0e0e0e] shadow-[0_0_4px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.9)]  p-6 rounded-xl text-white w-80 text-center space-y-4">
        {type === "success" ? (
          <>
            <p className="text-lg font-bold text-[#D0A760]">
              Message submitted successfully!
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-[#84B2DB] hover:bg-[#5B93C4]  rounded"
                onClick={() => {
                  closeResultModal(); // 關掉 ResultModal
                  closeMainModal(); // 關掉留言 Modal
                  window.location.href = "/"; // 去首頁
                }}
              >
                Home Page →
              </button>
              <button
                className="px-4 py-2 bg-[#6760AB] hover:bg-[#544DA1]  rounded"
                onClick={() => {
                  closeResultModal();
                  closeMainModal();
                  window.location.href = "/board";
                }}
              >
                Star Board →
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg md:text-xl font-bold text-[#D0A760]">
              You’ve already submitted a message today. <br />
              Please try again tomorrow!
            </p>
            <button
              className="px-4 py-2 bg-[#6760AB] hover:bg-[#544DA1] text-sm md:text-xl  rounded mt-2"
              onClick={closeResultModal}
            >
              I understand
            </button>
          </>
        )}
      </div>
    </div>
  );
}
