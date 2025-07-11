"use client";

import HomepageBackground from "@/components/HomepageBackground";
import HomepageCard from "@/components/HomepageCard";
import HomepageTitle from "@/components/HomepageTitle";
import { useState } from "react";

export default function HomePage() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <>
      <HomepageBackground onStarClick={setSelectedAgent} />
       <HomepageTitle />
      {selectedAgent && (
        <div
          className="fixed inset-0 backdrop-blur-[2px] bg-opacity-5 flex justify-center items-center z-50"
          onClick={() => setSelectedAgent(null)} // 點背景關閉
        >
          <HomepageCard
            nickname={selectedAgent.nickname}
            message={selectedAgent.message}
            date={selectedAgent.date}
            starColor={selectedAgent.starColor}
            starShape={selectedAgent.starShape}
            onClose={() => setSelectedAgent(null)} // 傳給關閉按鈕
          />
        </div>
      )}
    </>
  );
}
