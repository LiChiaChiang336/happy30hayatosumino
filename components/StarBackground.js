"use client";

import { useState, useEffect } from "react";
import styles from "./starbackground.module.css";

export default function StarBackground({ starCount = 140 }) {
  const [stars, setStars] = useState([]); // 狀態寫在 function 內
  useEffect(() => {
    // 產生 starCount 顆星星，每顆隨機位置
    const newStars = Array.from({ length: starCount }).map((_, i) => {
      const top = Math.random() * 100; // 0 ~ 100%
      const left = Math.random() * 100;
      const delay = Math.random() * 3; // 每顆星星閃爍不同步
       const duration = 2 + Math.random() * 2; // 每顆星星閃爍速度：2 ~ 4 秒

      return (
        <div
          key={i}
          className={styles.star}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    });
    setStars(newStars); // 更新狀態
  }, [starCount]); // starCount 改變時重新產生
  return <div className={styles.starsContainer}>{stars}</div>;
}
