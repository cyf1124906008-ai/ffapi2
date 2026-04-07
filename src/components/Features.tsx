"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { DollarSign, Shield, Zap, Code2, Layers, Headphones } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

const icons = [DollarSign, Shield, Zap, Code2, Layers, Headphones];
const gradients = ["from-emerald-400 to-green-500","from-blue-400 to-indigo-500","from-amber-400 to-orange-500","from-violet-400 to-purple-500","from-cyan-400 to-teal-500","from-rose-400 to-pink-500"];
const glows = ["rgba(52,211,153,0.08)","rgba(96,165,250,0.08)","rgba(251,191,36,0.08)","rgba(167,139,250,0.08)","rgba(34,211,238,0.08)","rgba(251,113,133,0.08)"];

export function Features({ locale }: { locale: Locale }) {
  const d = t(locale).features;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [0.85, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 bg-[#050505]" id="features">
      <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(139,92,246,0.05),transparent_70%)]" />
        <div className="absolute left-0 bottom-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-16">
        <motion.div className="mb-16 text-center" style={{ scale: titleScale, opacity: titleOpacity }}>
          <h2 className="mb-4 text-4xl font-extrabold sm:text-5xl tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{d.title}</h2>
          <p className="text-white/40 text-lg">{d.subtitle}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 overflow-hidden cursor-default"
              >
                <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" style={{ background: glows[i] }} />
                <div className="relative">
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[i]} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white/90">{item.title}</h3>
                  <p className="text-[13px] leading-relaxed text-white/40">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
