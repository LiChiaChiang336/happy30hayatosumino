"use client";

import StarBackground from "@/components/StarBackground";

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarBackground starCount={140} />
      <div className="relative z-10 flex items-center justify-center min-h-screen text-white px-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold">
            🚧 Site Under Maintenance 🚧
          </h1>
          <p className=" text-sm md:text-lg">
            We are currently performing scheduled updates. Please check back
            soon!
          </p>
          <p className=" text-sm md:text-base text-gray-400">
            If you have any questions, feel free to contact us via email.
          </p>
        </div>
      </div>
    </div>
  );
}
