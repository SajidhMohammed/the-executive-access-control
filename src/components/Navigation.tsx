"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/products", label: "Products" },
    { href: "/users", label: "Users" },
    { href: "/logs", label: "Logs" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? "text-primary font-semibold border-b-2 border-primary pb-1 font-inter text-[0.875rem]"
                : "text-on-surface-variant font-medium hover:bg-surface-container-highest transition-colors duration-200 px-2 py-1 rounded font-inter text-[0.875rem]"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", icon: "dashboard", label: "Dashboard" },
    { href: "/products", icon: "inventory_2", label: "Products" },
    { href: "/users", icon: "group", label: "Users" },
    { href: "/logs", icon: "history_edu", label: "Logs" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-surface-container-lowest/80 backdrop-blur-xl floating mx-4 mb-6 rounded-full overflow-hidden shadow-[0px_16px_32px_rgba(25,28,30,0.06)] flex justify-around items-center w-auto py-3 px-2">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive
                  ? "flex flex-col items-center justify-center bg-primary text-on-primary rounded-full px-4 py-2 scale-90 duration-200"
                  : "flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:text-primary transition-all"
              }
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="font-inter font-semibold text-[0.6875rem] uppercase tracking-wider">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
