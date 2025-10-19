/** biome-ignore-all lint/a11y/noStaticElementInteractions: explanation */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: explanation */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { cn } from "@/lib/utils";
import NavbarActionBlock from "../blocks/NavbarActionBlock";
import { Logo, LogoDark } from "../svg-icons/Logo";
import { buttonVariants } from "../ui/button";

/**
 * Responsive Navbar
 * - when `onDocs` is true: the header keeps the desktop layout but is hidden on small devices (matching your existing behaviour)
 * - when `onDocs` is false: shows a compact mobile header on small screens that only renders the logo, action block and a menu sheet trigger
 */
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/docs/getting-started", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "https://www.shadcn-form.com/playground", label: "Form Builder", external: true },
];

const Navbar = ({ className }: { className?: string; }) => {
  const pathname = usePathname();
  const onDocs = pathname.includes("/docs");
  const [open, setOpen] = useState(false);

  // If on docs and we're on small screens we want to hide the header completely.
  // We'll keep the existing behaviour by toggling responsive classes below.

  return (
    <>
      {/* Desktop & larger tablets header. If onDocs === true then hide on small screens using utility classes. */}
      <header
        className={cn(
          "z-50 backdrop-blur-sm bg-background/75 border-b border-border",
          onDocs ? "hidden md:flex items-center justify-between py-0 h-12 md:px-8 p-0  md:fixed md:top-0 md:right-0 lg:w-[84.7%]" : "flex items-center justify-between py-0 h-16 px-4 md:px-8 lg:px-12 w-full md:fixed top-0 left-0 right-0",
          className
        )}
      >
        <div id={"logo"} className="flex items-center gap-8">
          <Logo
            className="block dark:hidden size-10"
          />
          <LogoDark
            className="hidden dark:block size-10"
          />
          <span className="hidden lg:block font-bold text-lg w-max">Starter Kit</span>
        </div>

        <nav className="hidden md:flex items-center h-24 gap-4">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium hover:underline underline-offset-4" target={l.external ? "_blank" : undefined} rel={l.external ? "noreferrer" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div id="get-started" className="hidden md:flex items-center gap-4">
          <Link href={"/docs/getting-started"} className={cn(buttonVariants({ variant: "default", size: "default" }), "")}>Get Started</Link>
          <NavbarActionBlock onDocs={onDocs} />
        </div>

        {/* Mobile compact header when not on docs */}
        {!onDocs && (
          <div className="flex md:hidden items-center w-full justify-between px-3">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm">Starter Kit</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Action block remains block on mobile */}
              <NavbarActionBlock onDocs={onDocs} />

              {/* Menu trigger for sheet */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((s) => !s)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60"
              >
                {open ? <HiOutlineX className="size-6" /> : <HiOutlineMenu className="size-6" />}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Off-canvas sheet for mobile navigation (only used when not on docs) */}
      {!onDocs && (
        <div
          aria-hidden={!open}
          className={cn(
            "fixed inset-0 z-40 md:hidden transition-transform duration-300",
            open ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          {/* backdrop */}
          <div
            onClick={() => setOpen(false)}
            className={cn("absolute inset-0 bg-black/40 transition-opacity", open ? "opacity-100" : "opacity-0")}
          />

          {/* sheet */}
          <aside
            className={cn(
              "absolute top-0 right-0 h-full w-72 max-w-[85%] bg-background/95 border-l border-border shadow-2xl p-6 transform transition-transform",
              open ? "translate-x-0" : "translate-x-full"
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Logo
                  className="block dark:hidden size-10"
                />
                <LogoDark
                  className="hidden dark:block size-10"
                />

                <span className="font-semibold">Starter Kit</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md">
                <HiOutlineX className="size-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 px-3 rounded-md text-sm font-medium hover:bg-muted/30"
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noreferrer" : undefined}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-border pt-4">
              <Link href={"/docs/getting-started"} className={cn(buttonVariants({ variant: "default", size: "default" }), "w-full text-center block")} onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
