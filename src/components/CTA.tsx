"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export function CTA({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  return (
    <section className="relative py-32 overflow-hidden bg-[#050505]">
      <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1200px] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),rgba(139,92,246,0.06),transparent_70%)] blur-[40px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 pt-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-6 text-4xl font-extrabold sm:text-5xl tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
        >
          {isZh ? "现在就开始构建" : "Start Building Now"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mb-10 text-lg text-white/40 max-w-xl mx-auto leading-relaxed"
        >
          {isZh ? "注册即送免费额度，3 分钟完成接入。无需信用卡，无需订阅。" : "Free credits on signup. Integrate in 3 minutes. No credit card, no subscription."}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
          <a href={`${BACKEND_URL}/register`}>
            <Button size="lg" className="group bg-gradient-to-r from-blue-500 to-violet-600 text-white px-10 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(99,102,241,0.4)]">
              <span className="flex items-center">{isZh ? "免费开始" : "Get Started Free"}<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
