"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Zap, Shield, DollarSign, Globe, Cpu, Languages } from "lucide-react";
import { Button } from "./ui/button";

const translations = {
  en: {
    nav: { models: "Models", pricing: "Pricing", developers: "Developers", getStarted: "Get Started" },
    hero: { badge: "Neural Gateway v4.6", title1: "Intelligence.", title2: "Unbound.", desc: "The world's most capable AI models, unified through a single, enterprise-grade interface.", cta: "Start Building", learnMore: "Learn more" },
    features: { badge: "Engineered for Scale.", title: "The New Standard.", desc: "Precision-tuned infrastructure that powers the next generation of AI applications.", f1_title: "Global Neural Fabric", f1_desc: "Distributed across 20+ edge locations. Sub-500ms latency, guaranteed by our proprietary routing engine.", f2_title: "Privacy First", f2_desc: "Enterprise-grade encryption and SOC2 compliance out of the box.", f3_title: "Instant Scale", f3_desc: "From 1 to 1 billion requests. Our infrastructure scales with you.", f4_title: "Economic Efficiency", f4_desc: "Save up to 70% on inference costs compared to direct providers. Unified billing." },
    models: { title: "One API. All the Models.", desc: "Access the latest from OpenAI, Anthropic, Google, and more with zero code changes." },
    pricing: { title: "Simple Pricing.", desc: "Pay only for what you use. No commitments.", input: "Input", output: "Output", per: "/1M tokens", sales: "Contact Sales", custom: "Need custom volume pricing?" },
    footer: { desc: "The next generation of AI infrastructure. Built for developers who demand precision and performance.", rights: "© 2026 FFapi Neural Systems. All rights reserved." }
  },
  zh: {
    nav: { models: "模型库", pricing: "价格", developers: "开发者", getStarted: "立即开始" },
    hero: { badge: "神经网关 v4.6", title1: "智能.", title2: "无界.", desc: "全球最顶尖的 AI 模型，通过统一的企业级接口完美呈现。", cta: "开始构建", learnMore: "了解更多" },
    features: { badge: "为规模而生", title: "行业新标准", desc: "经过精密调校的基础设施，驱动下一代 AI 应用。", f1_title: "全球神经织网", f1_desc: "分布于全球 20 多个边缘节点。专有路由引擎确保低于 500ms 的响应延迟。", f2_title: "隐私至上", f2_desc: "内置企业级加密和 SOC2 合规性，保障数据安全。", f3_title: "即时扩展", f3_desc: "从 1 次到 10 亿次请求，我们的架构随您的业务共同成长。", f4_title: "极致成本", f4_desc: "相比直接供应商，推理成本最高可降低 70%。统一计费，简化管理。" },
    models: { title: "一个接口，全量模型", desc: "无需更改代码，即可访问 OpenAI、Anthropic、Google 等最新模型。" },
    pricing: { title: "价格透明", desc: "按需付费，无需任何长期承诺。", input: "输入", output: "输出", per: "/百万 Token", sales: "联系销售", custom: "需要定制化的大规模定价方案？" },
    footer: { desc: "下一代 AI 基础设施。为追求极致性能与精度的开发者而生。", rights: "© 2026 FFapi Neural Systems. 保留所有权利。" }
  }
};

const models = [
  { name: "GPT-5.4", vendor: "OpenAI", color: "#10b981" },
  { name: "GPT-4o", vendor: "OpenAI", color: "#10b981" },
  { name: "Claude Opus 4.6", vendor: "Anthropic", color: "#f97316" },
  { name: "Claude Sonnet 4.6", vendor: "Anthropic", color: "#f97316" },
  { name: "Gemini 3.1 Pro", vendor: "Google", color: "#3b82f6" },
  { name: "DeepSeek V3.2", vendor: "DeepSeek", color: "#818cf8" },
];

const pricingData = [
  { model: "GPT-4o", input: "$0.75", output: "$3.00" },
  { model: "GPT-5.4", input: "$0.75", output: "$4.80" },
  { model: "Claude Sonnet 4.6", input: "$0.90", output: "$4.50" },
  { model: "DeepSeek V3.2", input: "$0.08", output: "$0.24" },
];

export function LandingPage() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const t = translations[lang];
  
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.6], [1, 0.98]);

  return (
    <div className="relative z-10 selection:bg-accent/20">
      <div className="noise" />

      {/* ============ NAVIGATION ============ */}
      <nav className="fixed top-0 z-[100] w-full px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between glass-apple rounded-full px-6 py-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center text-black font-black text-[10px]">FF</div>
            <span className="font-semibold text-sm tracking-tight">FFapi</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#models" className="text-[12px] font-medium text-white/50 hover:text-white transition-colors">{t.nav.models}</a>
            <a href="#pricing" className="text-[12px] font-medium text-white/50 hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="#" className="text-[12px] font-medium text-white/50 hover:text-white transition-colors">{t.nav.developers}</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-2 text-[11px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === 'en' ? 'ZH' : 'EN'}
            </button>
            <Button size="sm" className="bg-white text-black rounded-full px-4 h-8 text-[11px] font-bold hover:bg-white/90 active:scale-95 transition-transform">
              {t.nav.getStarted}
            </Button>
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="text-center max-w-4xl">
          <motion.div 
            key={lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="text-caption text-accent font-semibold">{t.hero.badge}</span>
          </motion.div>
          
          <div className="overflow-hidden">
            <h1 className="reveal-text text-[10vw] md:text-[120px] font-display text-gradient">
              {t.hero.title1}<br />
              {t.hero.title2}
            </h1>
          </div>

          <motion.p 
            key={`desc-${lang}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto font-medium leading-tight"
          >
            {t.hero.desc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-8"
          >
            <Button className="bg-[#0071e3] text-white px-8 py-6 rounded-full text-sm font-semibold hover:bg-[#0077ed] active:scale-95 transition-all">
              {t.hero.cta}
            </Button>
            <a href="#" className="group text-[#0071e3] font-semibold text-sm flex items-center gap-1 hover:underline">
              {t.hero.learnMore} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ BENTO FEATURES ============ */}
      <section className="section py-40 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="reveal-text text-4xl md:text-6xl font-display mb-6">{t.features.title}</h2>
            <p className="text-lg text-[#86868b] max-w-xl mx-auto">{t.features.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 glass-card-apple p-12 flex flex-col justify-between min-h-[460px] relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-3xl font-semibold mb-4">{t.features.f1_title}</h3>
                <p className="text-[#86868b] max-w-sm leading-relaxed">{t.features.f1_desc}</p>
              </div>
              <div className="absolute right-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] group-hover:bg-accent/15 transition-all duration-1000" />
            </div>

            <div className="md:col-span-4 glass-card-apple p-10 flex flex-col justify-between group">
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{t.features.f2_title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{t.features.f2_desc}</p>
              </div>
            </div>

            <div className="md:col-span-4 glass-card-apple p-10 flex flex-col justify-between group">
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{t.features.f3_title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed">{t.features.f3_desc}</p>
              </div>
            </div>

            <div className="md:col-span-8 glass-card-apple p-12 flex flex-col justify-between min-h-[460px] relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-3xl font-semibold mb-4">{t.features.f4_title}</h3>
                <p className="text-[#86868b] max-w-sm leading-relaxed">{t.features.f4_desc}</p>
              </div>
              <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] group-hover:bg-emerald-500/15 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MODELS ============ */}
      <section id="models" className="section py-40 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <h2 className="reveal-text text-4xl md:text-6xl font-display">{t.models.title}</h2>
            <p className="text-[#86868b] max-w-xs">{t.models.desc}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {models.map((m, i) => (
              <div key={i} className="glass-card-apple p-6 flex flex-col items-center text-center hover:bg-white/[0.03] transition-colors cursor-pointer group">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: m.color }}>
                  {m.name.charAt(0)}
                </div>
                <div className="text-sm font-semibold mb-1">{m.name}</div>
                <div className="text-[10px] text-[#86868b] uppercase tracking-widest">{m.vendor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="section py-40 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-24">
            <h2 className="reveal-text text-4xl md:text-6xl font-display mb-6">{t.pricing.title}</h2>
            <p className="text-lg text-[#86868b]">{t.pricing.desc}</p>
          </div>

          <div className="glass-card-apple overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="space-y-12">
                {pricingData.map((p) => (
                  <div key={p.model} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.05] pb-8 last:border-0 last:pb-0">
                    <div>
                      <div className="text-xl font-semibold">{p.model}</div>
                      <div className="text-xs text-[#86868b] mt-1">Enterprise-grade inference</div>
                    </div>
                    <div className="flex gap-12">
                      <div className="text-right">
                        <div className="text-[10px] text-[#86868b] uppercase tracking-widest mb-1">{t.pricing.input}</div>
                        <div className="text-lg font-medium">{p.input}<span className="text-xs text-[#86868b]">{t.pricing.per}</span></div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#86868b] uppercase tracking-widest mb-1">{t.pricing.output}</div>
                        <div className="text-lg font-medium">{p.output}<span className="text-xs text-[#86868b]">{t.pricing.per}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.02] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-sm text-[#86868b]">{t.pricing.custom}</div>
              <Button className="bg-white text-black rounded-full px-10 py-6 font-semibold hover:bg-white/90 active:scale-95 transition-transform">
                {t.pricing.sales}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-24 px-6 bg-[#000000] border-t border-white/[0.05]">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center text-black font-black text-[10px]">FF</div>
                <span className="font-semibold text-sm tracking-tight">FFapi</span>
              </div>
              <p className="text-sm text-[#86868b] leading-relaxed">
                {t.footer.desc}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div>
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6">{t.nav.models}</h4>
                <ul className="space-y-3 text-sm text-[#86868b]">
                  <li><a href="#" className="hover:text-white transition-colors">{t.nav.models}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t.nav.pricing}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t.nav.developers}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6">Company</h4>
                <ul className="space-y-3 text-sm text-[#86868b]">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6">Social</h4>
                <ul className="space-y-3 text-sm text-[#86868b]">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-white/[0.05] text-[11px] text-[#424245] flex flex-col md:flex-row justify-between gap-4">
            <span>{t.footer.rights}</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Site Map</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
