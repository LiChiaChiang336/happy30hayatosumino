"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";


export default function HeroNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home Page", href: "/" },
    { name: "Star Board", href: "/board" },
    { name: "Inspiration", href: "/about" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Navbar
      disableAnimation
      isBordered
      className="fixed top-0 left-0 right-0 z-50 px-2 py-4 bg-[#0E0E0E]"
    >
      {/* 左邊：網站名稱 */}
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold text-lg sm:text-xl ">
            Happy 30 Hayato Sumino
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* 右側：自訂漢堡按鈕（手機版顯示） */}
      <NavbarContent className="lg:hidden ml-auto" justify="end">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </NavbarContent>

      {/* 中間：桌機版選單置中 */}
      <NavbarContent
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex gap-14"
        justify="center"
      >
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              key={item.name}
              href={item.href}
              color="foreground"
              className="text-base md:text-lg relative overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* 手機版展開菜單 */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full z-50 bg-[#0E0E0E] lg:hidden mt-6">
          <div className="flex flex-col items-center">
            {menuItems.map((item) => (
              <div key={item.name} className="px-4 py-2">
                <Link
                  href={item.href}
                  className="block text-lg py-2 hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </Navbar>
  );
}
