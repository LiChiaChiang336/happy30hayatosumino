"use client";

import StarBackground from "@/components/StarBackground";

export default function InspirationPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarBackground starCount={140} />

      <div className="relative z-10 flex items-center justify-center min-h-screen text-white px-6">
        <div className="text-center space-y-4 w-11/12 max-w-md mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold">
            ✨ Coming soon... ✨
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            This section is still under construction. Stay tuned for inspiration
            and stories!
          </p>
        </div>
      </div>
    </div>
  );
}
