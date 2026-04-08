"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGIN_PATH, REGISTER_PATH } from "@/lib/auth-links";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function Navbar({
  locale,
  onLocaleChange,
}: {
  locale: Locale;
  onLocaleChange: (l: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const d = t(locale).nav;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.08] bg-background/70 backdrop-blur-2xl shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-blue-500/20">
            FF
          </div>
          <span className="text-xl font-bold">FFapi</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {d.pricing}
          </a>
          <a
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {d.docs}
          </a>
          <button
            onClick={() => onLocaleChange(locale === "zh" ? "en" : "zh")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Globe className="h-4 w-4" />
            {locale === "zh" ? "EN" : "中文"}
          </button>
          <a href={LOGIN_PATH}>
            <Button variant="ghost" size="sm" className="text-sm">
              {d.login}
            </Button>
          </a>
          <a href={REGISTER_PATH}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              {d.register}
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t border-white/[0.08] bg-background/95 backdrop-blur-2xl md:hidden"
        >
          <div className="flex flex-col gap-4 p-4">
            <a
              href="#pricing"
              className="text-sm text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {d.pricing}
            </a>
            <a
              href="/docs"
              className="text-sm text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {d.docs}
            </a>
            <button
              onClick={() => {
                onLocaleChange(locale === "zh" ? "en" : "zh");
                setOpen(false);
              }}
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              <Globe className="h-4 w-4" />
              {locale === "zh" ? "EN" : "中文"}
            </button>
            <div className="flex gap-2 pt-2">
              <a href={LOGIN_PATH} className="flex-1">
                <Button variant="ghost" size="sm" className="w-full">
                  {d.login}
                </Button>
              </a>
              <a href={REGISTER_PATH} className="flex-1">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white"
                >
                  {d.register}
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
