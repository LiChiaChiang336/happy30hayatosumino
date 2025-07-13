"use client";

import { useEffect, useRef } from "react";

/* === 🔍 基本參數：和弦對應、線條計算 === */
// chord 音階
const chordMap = {
  7: [293.66, 349.23, 440.0],
  8: [329.63, 392.0, 493.88],
  9: [349.23, 440.0, 523.25],
  10: [392.0, 493.88, 587.33],
  11: [440.0, 554.37, 659.25],
  12: [466.16, 587.33, 698.46],
  13: [554.37, 659.25, 783.99],
  14: [587.33, 698.46, 880.0],
};

// 工具函數
function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// function hexToRgba(hex, alpha = 1) {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// }

/* === 🔍 Vector 工具 === */
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDistance(v) {
    return Math.hypot(this.x - v.x, this.y - v.y);
  }
}

/* === 🔍 Agent 星星 start === */
class Agent {
  constructor(msg, canvas, isMobile) {
    this.data = msg;
    this.color = msg.starColor || "#ffffff"; // ✅ 預防 undefined
    this.pos = new Vector(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    this.vel = new Vector(
      (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 0.6
    );
    this.radius = isMobile ? Math.random() * 4 + 4 : Math.random() * 7 + 6; // 手機 → 4~8px，其他 → 7~14px
    this.innerRatio = 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.01;
    this.hoverTarget = 0;
    this.hoverProgress = 0;
  }

  update(canvas) {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.rotation += this.rotationSpeed;
    this.hoverProgress += (this.hoverTarget - this.hoverProgress) * 0.05;
    if (this.pos.x <= 0 || this.pos.x >= canvas.width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= canvas.height) this.vel.y *= -1;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotation);

    const spikeCount = this.data.starShape || 7; // 如果 spikeCount 沒有，預設 7
    const boost = 1 + this.hoverProgress * 0.6;
    const innerR = this.radius * this.innerRatio;
    const outerR = this.radius * 2.4 * boost;

    ctx.beginPath();
    for (let i = 0; i < spikeCount * 2; i++) {
      const angle = (Math.PI * i) / spikeCount;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();

    // ⭐️ 漸層 + 陰影
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerR * 3.5);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.5, this.color + "cc");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.shadowBlur = 25;
    ctx.shadowColor = this.color;
    ctx.fill();

    ctx.restore();
  }
}
/* === 🔍 Agent 星星 end === */

/* === 🎼 音效播放 === */
function playChord(ctx, spikeCount) {
  const now = ctx.currentTime;
  (chordMap[spikeCount] || []).forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.linearRampToValueAtTime(0.0001, now + 2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(now + 2);
  });
}

/* === 🖱️ 互動事件 === */
export default function HomepageBackground({ onStarClick }) {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const agentsRef = useRef([]); // ⭐️ 存星星資料
  const hoverBlockRef = useRef(false); // 用來阻擋 hover 播放
  // console.log("[Home] agents:", agentsRef.current); // ← 放這裡，確認 starColor、spikeCount 正確

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

    audioCtxRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    /* === 🔍 API 撈資料 === */
    async function fetchData() {
      try {
        const res = await fetch("/api/home");
        const { messages } = await res.json();
        agentsRef.current = messages.map(
          (msg) => new Agent(msg, canvas, isMobile)
        );
      } catch (err) {
        // console.error("[Home] API error:", err);
      }
    }
    fetchData();

    /* === 🖱️ 滑鼠事件 === */
    const handleMouseMove = (e) => {
      const mouse = new Vector(e.clientX, e.clientY);
      const agents = agentsRef.current;

      agents.forEach((agent) => {
        const dist = mouse.getDistance(agent.pos);
        const isHovering = dist < agent.radius * 3;
        const wasHovering = agent.hoverTarget === 1;

        agent.hoverTarget = isHovering ? 1 : 0;

        // 只有在不是 click 後短時間內，才播放 hover 聲音
        if (isHovering && !wasHovering && !hoverBlockRef.current) {
          playChord(audioCtxRef.current, agent.data.starShape);
        }
      });
    };

    const handleClick = (e) => {
      const mouse = new Vector(e.clientX, e.clientY);
      const agents = agentsRef.current;
      for (let agent of agents) {
        const dist = mouse.getDistance(agent.pos);
        if (dist < agent.radius * 3) {
          // 點擊時短暫阻擋 hover 播放
          hoverBlockRef.current = true;
          setTimeout(() => {
            hoverBlockRef.current = false;
          }, 600);

          playChord(audioCtxRef.current, agent.data.starShape);
          onStarClick(agent.data);
          return;
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    /* === 🔁 動畫循環 === */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const agents = agentsRef.current;
      if (!agents.length) {
        requestAnimationFrame(animate); // ✅ 正確：繼續等待
        return;
      }

      // console.log("[Animate] agents:", agents); // ← 每一幀都檢查

      const maxDistance = isMobile ? 90 : 160;
      const nearOpacity = 0.8;
      const farOpacity = 0.2;
      const nearLineWidth = isMobile ? 1.2 : 2;
      const farLineWidth = isMobile ? 0.5 : 1;

      // 加上星星間連線
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const dist = agents[i].pos.getDistance(agents[j].pos);
          if (dist > maxDistance) continue;
          ctx.beginPath();
          ctx.moveTo(agents[i].pos.x, agents[i].pos.y);
          ctx.lineTo(agents[j].pos.x, agents[j].pos.y);
          ctx.strokeStyle = `rgba(255,255,255,${mapRange(
            dist,
            0,
            maxDistance,
            nearOpacity,
            farOpacity
          )})`;
          ctx.lineWidth = mapRange(
            dist,
            0,
            maxDistance,
            nearLineWidth,
            farLineWidth
          );
          ctx.stroke();
        }
      }

      agents.forEach((a) => {
        a.update(canvas);
        a.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    /* === ✅ 清除事件與音效 === */
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      audioCtxRef.current?.close();
    };
  }, [onStarClick]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}
