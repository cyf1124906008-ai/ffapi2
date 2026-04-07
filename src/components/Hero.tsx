"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export function Hero({ locale }: { locale: Locale }) {
  const d = t(locale).hero;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090a]"
    >
      {/* 极光层 */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: bgY }}>
        <div className="animate-aurora absolute left-1/2 top-[15%] -translate-x-1/2 h-[900px] w-[1400px] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.25),rgba(139,92,246,0.15),transparent_70%)] blur-[80px]" />
        <div className="animate-aurora absolute -left-[10%] bottom-[10%] h-[500px] w-[700px] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.2),rgba(6,182,212,0.1),transparent_70%)] blur-[80px]" style={{ animationDelay: "-7s" }} />
        <div className="animate-aurora absolute -right-[5%] top-[30%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(168,85,247,0.18),rgba(236,72,153,0.08),transparent_70%)] blur-[80px]" style={{ animationDelay: "-14s" }} />
      </motion.div>

      {/* 网格 */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_30%,transparent_100%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#08090a] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-blue-500/[0.06] blur-[80px] animate-glow-pulse" />

      {/* 内容 — 用 CSS 动画代替 motion initial，确保始终可见 */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-sm text-white/60 backdrop-blur-md animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <Sparkles className="h-4 w-4 text-blue-400" />
          {d.badge}
        </div>

        {/* Title */}
        <h1
          className="mb-8 text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-6xl md:text-7xl lg:text-[5.5rem] animate-fade-up"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <span className="bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent">
            {d.title}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mx-auto mb-12 max-w-2xl text-lg text-white/50 sm:text-xl leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          {d.subtitle}
        </p>

        {/* CTA */}
        <div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          <a href={`${BACKEND_URL}/register`}>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-violet-600 text-white px-10 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(99,102,241,0.4)]"
            >
              <span className="relative z-10 flex items-center">
                {d.cta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </a>
          <a href="/docs">
            <Button
              variant="outline"
              size="lg"
              className="border-white/[0.08] text-white/70 px-10 py-6 text-lg rounded-2xl hover:bg-white/[0.05] hover:text-white transition-all duration-300"
            >
              {d.ctaSecondary}
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-24 animate-fade-up" style={{ animationDelay: "1s", animationFillMode: "both" }}>
          <div className="mx-auto mb-10 max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="grid grid-cols-3 gap-12">
            {[
              { value: "100+", label: locale === "zh" ? "支持模型" : "Models" },
              { value: "99.9%", label: locale === "zh" ? "可用性" : "Uptime" },
              { value: "<500ms", label: locale === "zh" ? "平均延迟" : "Avg Latency" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold sm:text-4xl bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up" style={{ animationDelay: "1.5s", animationFillMode: "both" }}>
        <div className="animate-float h-12 w-7 rounded-full border-2 border-white/[0.12] flex items-start justify-center pt-2.5">
          <div className="h-2.5 w-1 rounded-full bg-white/25" />
        </div>
      </div>
    </section>
  );
}
