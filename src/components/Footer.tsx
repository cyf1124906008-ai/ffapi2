"use client";

import { motion } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const d = t(locale).footer;
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050505]">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">FF</div>
              <span className="text-lg font-bold text-white">FFapi</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">{d.desc}</p>
          </div>
          {[
            { title: d.product, links: [{ label: d.pricing, href: "#pricing" }, { label: d.docs, href: "/docs" }, { label: d.status, href: "#" }] },
            { title: d.resources, links: [{ label: d.blog, href: "#" }, { label: d.github, href: "#" }, { label: d.community, href: "#" }] },
            { title: d.legal, links: [{ label: d.terms, href: "#" }, { label: d.privacy, href: "#" }] },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-white/60">{col.title}</h3>
              <ul className="space-y-2.5 text-sm text-white/30">
                {col.links.map((link) => <li key={link.label}><a href={link.href} className="hover:text-white/60 transition-colors">{link.label}</a></li>)}
              </ul>
            </div>
          ))}
        </motion.div>
        <div className="mt-14 pt-6 border-t border-white/[0.06] text-center text-sm text-white/20">
          &copy; {new Date().getFullYear()} FFapi. {d.rights}.
        </div>
      </div>
    </footer>
  );
}
