"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function FallingAnimatedStar({
  color = "#6760ab",
  startShape = 7,
  endShape = 14,
  delay = 0,
  fallDistance = 100,
  size = 64,
}) {
  const svgRef = useRef(null);
  const [points, setPoints] = useState("");

  const generatePoints = (spikes) => {
    const step = Math.PI / spikes;
    let pts = "";
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? 40 : 20;
      const angle = i * step - Math.PI / 2;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      pts += `${x},${y} `;
    }
    return pts.trim();
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay });
    for (let s = startShape; s <= endShape; s++) {
      tl.to({}, {
        duration: 0.15,
        onStart: () => setPoints(generatePoints(s)),
      });
    }

    gsap.fromTo(
      svgRef.current,
      { y: -fallDistance },
      {
        y: 0,
        duration: 2.2,
        delay,
        ease: "power2.out",
      }
    );
  }, [startShape, endShape, delay, fallDistance]);

  const filterId = `glow-${color.replace("#", "")}`;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="drop-shadow-xl"
    >
      <defs>
        <filter id={filterId}>
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={color} floodOpacity="0.9" />
        </filter>
      </defs>
      <polygon points={points} fill={color} filter={`url(#${filterId})`} />
    </svg>
  );
}
