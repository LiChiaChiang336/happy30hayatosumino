"use client";

import StarBackground from "@/components/StarBackground";
import CircleTextRings from "@/components/CircleTextRings";
import Image from "next/image";
import FallingStarGroup from "@/components/FallingStarGroup";

export default function InspirationPage() {
  return (
    <>
      <div className="relative min-h-screen snap-y snap-mandatory overflow-y-scroll ">
        <StarBackground starCount={140} />

        {/* 內容區：層級高於背景 */}
        <div className="relative z-10 w-11/12 max-w-3xl mx-auto mt-20 mb-20 px-4 space-y-24">
          {/* 第一區塊 */}
          <section className=" snap-center min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center px-6">
            <div className="text-center space-y-2 w-11/12 max-w-md mx-auto">
              <h2 className="text-xl md:text-2xl font-bold">
                Everything begins with the
              </h2>
              <h2 className="text-xl font-bold">Human Universe...</h2>
              <p className="text-sm md:text-base text-gray-500 m-0">
                sparked by the moment Hayato shared his inspiration through
                Musica Universalis.
              </p>
            </div>
            {/* 加個外層 div 固定 SVG 排版，避免影響上方區塊 */}
            <div className="w-full flex justify-center items-center">
              <CircleTextRings />
            </div>
            <p className="text-sm md:text-base text-gray-500 m-0">
              Hover to pause
            </p>
          </section>

          {/* 第二區塊 */}
          <section className="snap-center flex flex-col items-center justify-center ">
            <div className="text-center w-11/12 max-w-md mx-auto">
              <p className="text-sm md:text-base text-gray-300 leading-relaxed m-0 pb-0 md:pb-6">
                The seven star colors on this site are drawn from a Hubble image
                of supernova remnant N 49, captured by NASA on July 14 — the day
                Hayato was born.
              </p>
              <div className="relative w-full max-w-lg h-[480px] mx-auto mt-1 md:mt-2">
                <Image
                  src="/images/NASA.jpg"
                  alt="NASA birthday photo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <p className="text-[10px] text-xs text-gray-400 text-center leading-relaxed">
                Image Credit: NASA, ESA, and the Hubble Heritage Team
                (STScI/AURA) Source: [NASA Official Page]
                <a
                  href="https://science.nasa.gov/asset/hubble/celestial-fireworks-sheets-of-debris-from-a-stellar-explosion-n-49-dem-l-190/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (https://science.nasa.gov/asset/hubble/celestial-fireworks-sheets-of-debris-from-a-stellar-explosion-n-49-dem-l-190/)
                </a>
              </p>
            </div>
          </section>

          {/* 第三區塊 */}
          <section className=" snap-center flex items-center justify-center px-6 ">
            <div className="text-center space-y-4 w-11/12 max-w-md mx-auto">
              <h2 className="text-xl md:text-3xl font-semibold">
                Celestial Chords <br />& Stellar Shapes
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed m-0">
                A cosmic coincidence that inspired this palette, with each color
                named after a track from his Human Universe album.
              </p>
              <FallingStarGroup />

              <p className="text-sm md:text-base text-gray-300 leading-relaxed m-0">
                In this universe, each star shape represents a chord. Everyone
                can choose a star with 7 to 14 points, each corresponding to one
                of eight chords, inspired by Hayato Sumino&apos;s Human
                Universe. And of course, there&apos;s a mysterious ninth chord
                hidden somewhere—waiting to be discovered.
              </p>
            </div>
          </section>

          {/* 第四區塊 */}
          <section className=" snap-center min-h-[70vh] md:min-h-[80vh] flex items-center justify-center px-6">
            <div className="text-center space-y-4 w-11/12 max-w-md mx-auto">
              <h2 className="text-xl md:text-2xl font-bold">角野隼斗さん</h2>
              <h2 className="text-lg md:text-xl font-bold">
                30歳のお誕生日おめでとうございます。
              </h2>
              <p
                className="text-sm md:text-base text-[#dcdfe6] leading-relaxed"
                style={{
                  textShadow:
                    "0 0 3px rgba(255, 255, 255, 0.9), 0 0 7px rgba(200, 200, 255, 0.6), 0 0 14px rgba(125, 146, 165, 0.3)",
                }}
              >
                May each day be as beautiful as music, and may your wishes shine
                and come true like the stars.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
