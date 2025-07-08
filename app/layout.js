import "./globals.css";
import HeroNavbar from "@/components/HeroNavbar";
import Footer from "@/components/footer";
import FloatingButton from "@/components/FloatingButton";

export const metadata = {
  title: "Happy 30 Hayato Sumino",
  description: "Happy 30 Hayato Sumino (Fan message board)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0E0E0E] text-[#ffffff] antialiased">
        <HeroNavbar />
        <FloatingButton />
        <main className="pt-20 pb-16">
          {/* 這裡調整 */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
