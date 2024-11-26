"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigationItems } from "./navigation/nav-items";
import { NavItem } from "./navigation/nav-item";
import { MobileNav } from "./navigation/mobile-nav";

export function MainNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center w-12 h-8 rounded bg-primary text-primary-foreground font-black tracking-wide shadow-md">
                DCM
              </span>
            </Link>

            <div className="hidden md:flex md:items-center md:space-x-2">
              {navigationItems.map((item) => (
                <NavItem key={item.label} item={item} />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>

        <MobileNav />
      </div>
    </nav>
  );
}