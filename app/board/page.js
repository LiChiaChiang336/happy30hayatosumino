"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function BoardPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCreatedAt, setLastCreatedAt] = useState(null); // 分頁用
  const [hasMore, setHasMore] = useState(true); // 沒有更多資料時隱藏按鈕

  const fetchMessages = async (startAfter = null) => {
    try {
      setIsLoading(true);

      // ✅ 拼 API 查詢參數
      let url = `/api/board?limit=10&order=desc`;
      if (startAfter) {
        url += `&startAfter=${encodeURIComponent(startAfter)}`;
      }

      console.log("[BoardPage] 讀取留言 API:", url);

      const res = await fetch(url);
      const data = await res.json();

      if (!data.messages) {
        console.error("API response error:", data);
        return;
      }

      if (data.messages.length < 10) {
        setHasMore(false); // 沒拿到滿額，表示沒有下一頁
      }

      // ✅ 合併舊留言 + 新留言
      setMessages((prev) => [...prev, ...data.messages]);

      // ✅ 取得最後一筆的 createdAt
      const lastMsg = data.messages[data.messages.length - 1];
      if (lastMsg) {
        setLastCreatedAt(lastMsg.createdAt);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 頁面載入時抓第一頁
  useEffect(() => {
    fetchMessages();
  }, []);

  // const dummyMessages = [
  //   {
  //     id: "1",
  //     nickname: "我是嘉💜",
  //     message: "我們超棒的😭！また会える日を楽しみにしていますね\n🌟 Take care & stay happy💜！！！💕💕💕\n我們超棒的😭！また会える日を楽しみにしていますね\n🌟 Take care & stay happy💜！！！💕💕💕\n我們超棒的😭！また会える日を楽しみにしていますね\n🌟 Take care & stay happy💜！！！💕💕💕\n",
  //     date: "2025-07-10",
  //     starColor: "#6760AB",
  //     starShape: 13,
  //   },
  //   {
  //     id: "2",
  //     nickname: "Moonlight",
  //     message: "Shine bright like the stars. ✨",
  //     date: "2025-07-10",
  //     starColor: "#D0A760",
  //     starShape: 7,
  //   },
  //   {
  //     id: "3",
  //     nickname: "Comet",
  //     message: "Across galaxies, your music reaches us.",
  //     date: "2025-07-09",
  //     starColor: "#CB6947",
  //     starShape: 9,
  //   },
  // ];

  return (
    <div className="mt-20 mb-20 px-4 space-y-14 ">
      <h1 className="text-center text-2xl font-bold text-white mb-8">
        Star Board
      </h1>

      {/* 留言卡片 */}
      {messages.map((msg) => (
        <Card
          key={msg.id}
          nickname={msg.nickname}
          message={msg.message}
          date={msg.date}
          starColor={msg.starColor}
          starShape={msg.starShape}
        />
      ))}
      {/* {dummyMessages.map((msg) => (
        <Card
          key={msg.id}
          nickname={msg.nickname}
          message={msg.message}
          date={msg.date}
          starColor={msg.starColor}
          starShape={msg.starShape}
        />
      ))} */}
      {/* 分頁按鈕 */}
      {hasMore && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => fetchMessages(lastCreatedAt)}
            disabled={isLoading}
            className="px-4 py-2 bg-[#6760AB] hover:bg-[#544DA1] text-white rounded"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
