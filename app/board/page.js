"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function BoardPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCreatedAt, setLastCreatedAt] = useState(null); // 分頁用
  const [hasMore, setHasMore] = useState(true); // 沒有更多資料時隱藏按鈕
  const [order, setOrder] = useState("desc"); // 新到舊

  const fetchMessages = async (startAfter = null) => {
    try {
      setIsLoading(true);

      // 拼 API 查詢參數
      let url = `/api/board?limit=10&order=${order}`;
      if (startAfter) {
        url += `&startAfter=${encodeURIComponent(startAfter)}`;
      }

      console.log("[BoardPage] 讀取留言 API:", url);

      const res = await fetch(url);
      const data = await res.json();

      if (!data.messages) {
        // console.error("API response error:", data); // 除錯用
        return;
      }

      if (data.messages.length < 10) {
        setHasMore(false); // 沒拿到滿額，表示沒有下一頁
      }

      // 新增資料前，先過濾掉已存在的 id，避免重複
      setMessages((prev) => {
        const newMessages = data.messages.filter(
          (msg) => !prev.some((m) => m.id === msg.id)
        );
        return [...prev, ...newMessages];
      });

      // 不管 asc / desc 都取最後一筆
      const nextStartAfter = data.messages[data.messages.length - 1]?.createdAt;
      if (nextStartAfter) {
        setLastCreatedAt(nextStartAfter);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 初次載入
  useEffect(() => {
    fetchMessages();
  }, [order]);

  // 切換新到舊、舊到新排序時，重新載入
  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder); // 只改 order，剩下交給 useEffect
    setMessages([]);
    setLastCreatedAt(null);
    setHasMore(true);
  };

  return (
    <div className="mt-20 mb-40 px-4 space-y-14 ">
      <h1 className="text-center text-2xl font-bold text-white mb-8">
        Star Board
      </h1>

      {/* 排序切換 */}
      <div className="flex justify-center mb-8">
        <select
          value={order}
          onChange={handleOrderChange}
          className="p-2 bg-[#6760AB] hover:bg-[#544DA1] text-white rounded"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

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
