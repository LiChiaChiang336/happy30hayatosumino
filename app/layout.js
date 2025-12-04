"use client";

import "./globals.css";
import HeroNavbar from "@/components/HeroNavbar";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import { ModalProvider } from "@/components/ModalContext";
import ContentWithModal from "@/components/ContentWithModal";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "Happy 30 Hayato Sumino",
//   description: "Happy 30 Hayato Sumino (Fan message board)",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isMaintenance = pathname === "/maintenance";
  const isHome = pathname === "/";

  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col bg-[#0E0E0E] text-[#ffffff] antialiased ${
          isHome ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        <ModalProvider>
          {!isMaintenance && <HeroNavbar />}
          {!isMaintenance && <FloatingButton />}
          <main className="flex-grow relative overflow-hidden flex-1">
            {/* 這裡調整 */}
            {!isMaintenance && <ContentWithModal />}
            {children}
          </main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
