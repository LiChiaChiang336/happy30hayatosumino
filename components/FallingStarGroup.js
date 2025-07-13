"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import FallingAnimatedStar from "./FallingAnimatedStar";

export default function FallingStarGroup() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px",
  });

  const [shouldRender, setShouldRender] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (isInView) {
      // ⚠️ 先移除再重新渲染，確保動畫 reset
      setShouldRender(false);
      const timeout = setTimeout(() => {
        setVersion((v) => v + 1);
        setShouldRender(true);
      }, 50); // 小 delay，確保 DOM 被銷毀後再重建

      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  const colors = [
    "#6760ab",
    "#3a3cca",
    "#a3c8de",
    "#71a8a1",
    "#7d92a5",
    "#d0a760",
    "#cb6947",
  ];

  const fallDistances = [370, 300, 240, 190, 140, 110, 80];

  return (
    <div
      ref={ref}
      className="flex justify-between items-end w-full max-w-4xl mx-auto px-4 min-h-[100px]"
    >
      {shouldRender &&
        colors.map((color, i) => (
          <FallingAnimatedStar
            key={`${version}-${i}`} // 👈 確保每輪都不同
            color={color}
            delay={i * 0.2}
            fallDistance={fallDistances[i]}
            size={140}
          />
        ))}
    </div>
  );
}
