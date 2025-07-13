// components/CircleTextRings.js
"use client";

import React from "react";

export default function CircleTextRings() {
  return (
    <div className="flex justify-center items-center w-full h-[40vh] md:h-[60vh] overflow-hidden">
      <svg
        viewBox="0 0 500 500"
        className="w-[clamp(280px,90vmin,520px)] h-[clamp(180px,50vh,400px)]"
      >
        <defs>
          {/* 你可以調整半徑 r 的數值，預設是 120~225，每圈 +15 */}
          <path
            id="circle1"
            d="
      M350,250
      A100,100 0 1,1 150,250
      A100,100 0 1,1 350,250
      A100,100 0 1,1 150,250
    "
          />
          <path
            id="circle2"
            d="
      M370,250
      A120,120 0 1,1 130,250
      A120,120 0 1,1 370,250
      A120,120 0 1,1 130,250
    "
          />
          <path
            id="circle3"
            d="
      M390,250
      A140,140 0 1,1 110,250
      A140,140 0 1,1 390,250
      A140,140 0 1,1 110,250
    "
          />
          <path
            id="circle4"
            d="
      M410,250
      A160,160 0 1,1 90,250
      A160,160 0 1,1 410,250
      A160,160 0 1,1 90,250
    "
          />
          <path
            id="circle5"
            d="
      M430,250
      A180,180 0 1,1 70,250
      A180,180 0 1,1 430,250
      A180,180 0 1,1 70,250
    "
          />
          <path
            id="circle6"
            d="
      M450,250
      A200,200 0 1,1 50,250
      A200,200 0 1,1 450,250
      A200,200 0 1,1 50,250
    "
          />
          <path
            id="circle7"
            d="
      M470,250
      A220,220 0 1,1 30,250
      A220,220 0 1,1 470,250
      A220,220 0 1,1 30,250
    "
          />
        </defs>

        {[
          "・HUMAN UNIVERSE ・JESUS, JOY OF MAN'S DESIRING ",
          "・GROUND IN C MINOR ・IN PARADISUM ・NOCTURNE I - PRE RAIN",
          "・NOCTURNE II - AFTER DAWN ・NOCTURNE III - ONCE INA A BLUE MOON",
          "・PAVANE POUR UNE INFANTE DÉFUNTE・NOCTURNE IN C MINOR ・RECOLLECTION ",
          "・CLAIR DE LUNE・SOLARI ・DAY ONE ・NEW BIRTH ・BOLÉRO ",
          "・7 VARIATIONS OF TWINKLE TWINKLE LITTLE STAR ・POLARIS ・CONCERT ETUDE NO.8",
          "・THE WELL-TEMPERED CLAVIER, BOOK II PRELUDE AND FUGA NO.1 ・PRELUDE ・FUGA",
          "Forgive me, distant wars, for bringing flowers home.",
        ].map((text, index) => (
          <g key={index} className={`ring ${index % 2 === 1 ? "even" : ""}`}>
            <text letterSpacing="2">
              <textPath
                href={`#circle${index + 1}`}
                startOffset="50%"
                textAnchor="start"
                className="fill-white text-[clamp(11px,1.6vmin,17px)]"
              >
                {text}
              </textPath>
            </text>
          </g>
        ))}
      </svg>

      {/* 🔁 Tailwind doesn't handle keyframes automatically, so we use global style here */}
      <style jsx>{`
        .ring {
          transform-origin: 250px 250px;
          animation: rotate-cw 60s linear infinite;
        }
        .ring.even {
          animation: rotate-ccw 60s linear infinite;
        }
        .ring:hover {
          animation-play-state: paused;
        }

        @keyframes rotate-cw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-ccw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
