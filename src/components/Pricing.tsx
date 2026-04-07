"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

const pricingData = [
  { model: "GPT-4o", input: "$0.75", output: "$3.00" },
  { model: "GPT-4o Mini", input: "$0.045", output: "$0.18" },
  { model: "GPT-5.4", input: "$0.75", output: "$4.80" },
  { model: "Claude Sonnet 4.6", input: "$0.90", output: "$4.50" },
  { model: "Claude Opus 4.6", input: "$4.50", output: "$22.50" },
  { model: "Gemini 2.5 Flash", input: "$0.045", output: "$0.36" },
  { model: "DeepSeek V3.2", input: "$0.08", output: "$0.24" },
  { model: "GLM-5", input: "$0.15", output: "$0.60" },
];

export function Pricing({ locale }: { locale: Locale }) {
  const d = t(locale).pricing;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [0.85, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 bg-[#050505]" id="pricing">
      <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(52,211,153,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-16">
        <motion.div className="mb-16 text-center" style={{ scale: titleScale, opacity: titleOpacity }}>
          <h2 className="mb-4 text-4xl font-extrabold sm:text-5xl tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{d.title}</h2>
          <p className="text-white/40 text-lg">{d.subtitle}</p>
        </motion.div>

        <motion.div style={{ scale: cardScale, opacity: cardOpacity }} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden backdrop-blur-sm">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h3 className="font-semibold text-white/80">{d.models}</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-white/40 text-xs">
                <th className="px-6 py-3 font-medium">Model</th>
                <th className="px-6 py-3 font-medium text-right">{d.inputLabel} {d.unit}</th>
                <th className="px-6 py-3 font-medium text-right">{d.outputLabel} {d.unit}</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((row, i) => (
                <motion.tr
                  key={row.model}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  viewport={{ once: true }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-white/80">{row.model}</td>
                  <td className="px-6 py-3 text-right font-mono text-emerald-400/90">{row.input}</td>
                  <td className="px-6 py-3 text-right font-mono text-emerald-400/90">{row.output}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center border-t border-white/[0.06] px-6 py-5">
            <a href={`${BACKEND_URL}/register`}>
              <Button className="bg-gradient-to-r from-blue-500 to-violet-600 text-white px-8 py-5 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                {d.cta}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
