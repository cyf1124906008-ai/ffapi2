"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

const models = [
  { name: "GPT-5.4", provider: "OpenAI", color: "from-green-400 to-emerald-500", glow: "rgba(52,211,153,0.12)" },
  { name: "GPT-4o", provider: "OpenAI", color: "from-green-400 to-emerald-500", glow: "rgba(52,211,153,0.12)" },
  { name: "Claude Opus 4.6", provider: "Anthropic", color: "from-orange-400 to-amber-500", glow: "rgba(251,146,60,0.12)" },
  { name: "Claude Sonnet", provider: "Anthropic", color: "from-orange-400 to-amber-500", glow: "rgba(251,146,60,0.12)" },
  { name: "Gemini 2.5 Pro", provider: "Google", color: "from-blue-400 to-cyan-500", glow: "rgba(96,165,250,0.12)" },
  { name: "Gemini Flash", provider: "Google", color: "from-blue-400 to-cyan-500", glow: "rgba(96,165,250,0.12)" },
  { name: "DeepSeek V3.2", provider: "DeepSeek", color: "from-indigo-400 to-blue-500", glow: "rgba(129,140,248,0.12)" },
  { name: "DeepSeek R1", provider: "DeepSeek", color: "from-indigo-400 to-blue-500", glow: "rgba(129,140,248,0.12)" },
  { name: "GLM-5", provider: "智谱 AI", color: "from-purple-400 to-violet-500", glow: "rgba(192,132,252,0.12)" },
  { name: "Qwen 3.5", provider: "通义千问", color: "from-violet-400 to-purple-500", glow: "rgba(167,139,250,0.12)" },
  { name: "Kimi K2.5", provider: "Moonshot", color: "from-sky-400 to-blue-500", glow: "rgba(56,189,248,0.12)" },
  { name: "Grok 4", provider: "xAI", color: "from-rose-400 to-pink-500", glow: "rgba(251,113,133,0.12)" },
];

export function Models({ locale }: { locale: Locale }) {
  const d = t(locale).models;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-[#050505]" id="models">
      <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-16">
        <motion.div className="mb-16 text-center" style={{ scale: titleScale, opacity: titleOpacity }}>
          <h2 className="mb-4 text-4xl font-extrabold sm:text-5xl tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{d.title}</h2>
          <p className="text-white/40 text-lg">{d.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {models.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ scale: 1.06, y: -8, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 cursor-default overflow-hidden"
            >
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ background: m.glow }} />
              <div className="relative">
                <div className={`mb-3 h-10 w-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
                  {m.name.charAt(0)}
                </div>
                <div className="text-[13px] font-semibold text-white/90">{m.name}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{m.provider}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
