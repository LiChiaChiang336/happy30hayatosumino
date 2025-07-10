import "./globals.css";
import HeroNavbar from "@/components/HeroNavbar";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import { ModalProvider } from "@/components/ModalContext";
import ContentWithModal from "@/components/ContentWithModal";


export const metadata = {
  title: "Happy 30 Hayato Sumino",
  description: "Happy 30 Hayato Sumino (Fan message board)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0E0E0E] text-[#ffffff] antialiased">
        <ModalProvider>
          <HeroNavbar />
          <FloatingButton />
          <main>
            {/* 這裡調整 */}
            <ContentWithModal />
            {children}
          </main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}