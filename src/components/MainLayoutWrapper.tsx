"use client";

import { usePathname } from "next/navigation";
import { Navigation, MobileNavigation } from "@/components/Navigation";
import { UserDropdown } from "@/components/auth/UserDropdown";
import { cn } from "@/lib/utils";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide on auth pages
  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <header className="bg-surface-container-low docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-full">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer p-2 hover:bg-surface-container-highest transition-colors duration-200 rounded-full">search</span>
            <h1 className="font-manrope font-bold text-primary text-xl tracking-wide">The Executive</h1>
          </div>
          {/* Desktop Navigation */}
          <Navigation />
          <UserDropdown />
        </div>
      </header>

      {children}

      {/* BottomNavBar (Visible on Mobile) */}
      <MobileNavigation />

      {/* Floating Action Button */}
      <button className="fixed right-8 bottom-8 md:bottom-12 md:right-12 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 duration-200 z-40">
        <span className="material-symbols-outlined">add</span>
      </button>
    </>
  );
}
