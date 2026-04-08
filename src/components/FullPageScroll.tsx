"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Zap, Shield, DollarSign, Code2, Layers, Headphones } from "lucide-react";
import { LOGIN_PATH, REGISTER_PATH } from "@/lib/auth-links";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const models = [
  { name: "GPT-5.4", vendor: "OpenAI", color: "#10b981" },
  { name: "Claude Opus 4.6", vendor: "Anthropic", color: "#f97316" },
  { name: "Gemini 3.1 Pro", vendor: "Google", color: "#3b82f6" },
  { name: "DeepSeek V3.2", vendor: "DeepSeek", color: "#818cf8" },
  { name: "GLM-5", vendor: "智谱 AI", color: "#a855f7" },
  { name: "Qwen 3.5", vendor: "通义千问", color: "#8b5cf6" },
  { name: "Grok 4", vendor: "xAI", color: "#f43f5e" },
  { name: "Kimi K2.5", vendor: "Moonshot", color: "#06b6d4" },
];

const features = [
  { icon: DollarSign, title: "官方 3 折起", desc: "所有模型定价官方 3 折，旗舰版叠加 7 折，最低 2.1 折。只为成功请求付费，零隐藏费用。", color: "#10b981" },
  { icon: Shield, title: "99.9% 可用性", desc: "多渠道负载均衡，自动故障转移。全球节点优化，平均首 Token 延迟 < 500ms。", color: "#3b82f6" },
  { icon: Code2, title: "OpenAI 格式兼容", desc: "完全兼容 OpenAI API 格式，只需替换 Base URL。已有项目零改动迁移。", color: "#8b5cf6" },
  { icon: Layers, title: "100+ 模型覆盖", desc: "文本对话、图像生成、视频创作、语音识别。10+ 厂商，全模态覆盖。", color: "#f97316" },
  { icon: Zap, title: "极速响应", desc: "全球加速节点，流式输出零中断。Gemini Flash 低至 $0.045/百万 Token。", color: "#eab308" },
  { icon: Headphones, title: "7×24 支持", desc: "专业技术团队实时响应，完整的用量监控和消费日志。", color: "#ec4899" },
];

const pricingData = [
  { model: "GPT-4o", price: "$0.75" },
  { model: "Claude Sonnet 4.6", price: "$0.90" },
  { model: "Gemini 2.5 Flash", price: "$0.045" },
  { model: "DeepSeek V3.2", price: "$0.08" },
  { model: "GLM-5", price: "$0.15" },
  { model: "Claude Opus 4.6", price: "$4.50" },
];

const codeSnippet = `from openai import OpenAI

client = OpenAI(
    api_key="你的FFapi令牌",
    base_url="https://api.ffapi.com/v1"
)

# 一行换模型，其他不用改
response = client.chat.completions.create(
    model="claude-sonnet-4-6",
    messages=[{"role": "user", "content": "你好"}],
    stream=True
)`;

const clients = ["Cherry Studio", "Cursor", "LobeChat", "NextChat", "LangChain", "Vercel AI SDK", "ChatBox", "Dify"];

export function FullPageScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [navDark, setNavDark] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const orb = orbRef.current;
    if (!wrap || !orb) return;

    const sections = gsap.utils.toArray<HTMLElement>(".fp-section");
    const totalScroll = sections.length * 180; // 每场景 1.8 屏滚动距离

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => `+=${totalScroll}vh`,
        pin: true,
        scrub: 2,
        anticipatePin: 1,
        onUpdate: (self) => setNavDark(self.progress > 0.05),
      },
    });

    // === 场景 0: 首屏停留 + 背景渐变 ===
    mainTl.to({}, { duration: 1 });
    mainTl.to(wrap, { backgroundColor: "#0a0a0a", duration: 0.6 });
    mainTl.to(sections[0], { autoAlpha: 0, scale: 0.95, duration: 0.4 }, "<");
    mainTl.to(orb, {
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      boxShadow: "0 0 100px rgba(99,102,241,0.25)",
      width: 56, height: 56,
      duration: 0.5,
    }, "<");

    // === 通用场景动画 ===
    const orbMoves = [
      {},
      { x: 250, y: -120, scale: 0.5, rotate: 45 },
      { x: -200, y: 100, scale: 1.4, rotate: -30 },
      { x: 300, y: -80, scale: 0.6, rotate: 90 },
      { x: -250, y: -100, scale: 0.8, rotate: -60 },
      { x: 0, y: 150, scale: 1.0, rotate: 120 },
      { x: 200, y: 80, scale: 0.7, rotate: -45 },
      { x: -150, y: -120, scale: 1.2, rotate: 60 },
      { x: 0, y: -80, scale: 0.9, rotate: -90 },
      { x: 150, y: 60, scale: 0.5, rotate: 135 },
      { x: -100, y: -50, scale: 1.1, rotate: -120 },
      { x: 0, y: 0, scale: 2, rotate: 0 },
    ];

    sections.forEach((section, i) => {
      if (i === 0) return;
      const els = section.querySelectorAll(".fp-anim");

      // 淡入
      mainTl.fromTo(section, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
      els.forEach((el, ei) => {
        mainTl.fromTo(el,
          { y: 40 + ei * 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4 },
          `<+=${ei * 0.08}`
        );
      });

      // 圆球移动
      if (orbMoves[i]) {
        mainTl.to(orb, { ...orbMoves[i], duration: 0.6 }, "<");
      }

      // 停留
      mainTl.to({}, { duration: 1.2 });

      // 淡出（最后一个不淡出）
      if (i < sections.length - 1) {
        mainTl.to(section, { autoAlpha: 0, duration: 0.3 });
      }
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      {/* 导航栏 */}
      <nav className={`fixed top-0 z-50 w-full transition-colors duration-700 ${navDark ? "text-white" : "text-[#222]"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white transition-all duration-500 ${navDark ? "bg-gradient-to-br from-blue-500 to-violet-600" : "bg-[#222]"}`}>FF</div>
            <span className="font-bold text-[15px]">FFapi</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[13px]">
            <a href="/docs" className="opacity-50 hover:opacity-100 transition-opacity">文档</a>
            <a href="/docs/pricing" className="opacity-50 hover:opacity-100 transition-opacity">定价</a>
            <a href={LOGIN_PATH} className="opacity-50 hover:opacity-100 transition-opacity">登录</a>
            <a href={REGISTER_PATH} className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${navDark ? "bg-white text-black hover:bg-white/90" : "bg-[#222] text-white hover:bg-[#333]"}`}>注册</a>
          </div>
        </div>
      </nav>

      {/* 主容器 */}
      <div ref={wrapRef} className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: "#e8e8e0" }}>
        {/* 品牌圆球 */}
        <div ref={orbRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-16 w-16 rounded-full pointer-events-none transition-none" style={{ background: "linear-gradient(135deg, #222, #444)", boxShadow: "0 0 40px rgba(0,0,0,0.1)" }} />

        {/* ===== 场景 0: 首屏 ===== */}
        <div className="fp-section absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="font-black tracking-[-0.05em] leading-[0.85] text-[#111]" style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}>
              FF<span className="inline-block w-20 sm:w-24" /><span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">api</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-[#111]/40 font-light tracking-tight">一站式 AI 模型接入平台</p>
          </div>
        </div>

        {/* ===== 场景 1: That connects ===== */}
        <div className="fp-section absolute inset-0 flex items-center justify-center z-10" style={{ visibility: "hidden" }}>
          <div className="text-center px-6">
            <h2 className="fp-anim font-black tracking-[-0.04em] leading-[0.85] text-white" style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}>That connects</h2>
            <p className="fp-anim mt-6 text-2xl sm:text-3xl text-white/40 font-light">所有主流 AI 模型</p>
            <p className="fp-anim mt-4 text-sm text-white/15">一个 API Key · 一个 Base URL · 无限可能</p>
          </div>
        </div>

        {/* ===== 场景 2: 模型展示 ===== */}
        <div className="fp-section absolute inset-0 flex items-center justify-center z-10" style={{ visibility: "hidden" }}>
          <div className="w-full max-w-5xl px-6">
            <h2 className="fp-anim text-center font-black text-white tracking-[-0.03em] mb-12" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>100+ Models</h2>
            <div className="fp-anim grid grid-cols-2 sm:grid-cols-4 gap-3">
              {models.map((m) => (
                <div key={m.name} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-center">
                  <div className="mx-auto mb-2 h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: m.color }}>{m.name.charAt(0)}</div>
                  <div className="text-sm font-semibold text-white/80">{m.name}</div>
                  <div className="text-[11px] text-white/30">{m.vendor}</div>
                </div>
              ))}
            </div>
            <p className="fp-anim mt-8 text-center text-sm text-white/20">OpenAI · Anthropic · Google · DeepSeek · 智谱 · 通义千问 · 字节豆包 · xAI · Moonshot · MiniMax</p>
          </div>
        </div>

        {/* ===== 场景 3: 官方 3 折 ===== */}
        <div className="fp-section absolute inset-0 flex items-center justify-center z-10" style={{ visibility: "hidden" }}>
          <div className="text-center px-6">
            <h2 className="fp-anim font-black tracking-[-0.04em] leading-[0.85] text-white" style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}>
              官方 <span className="text-indigo-400">3 折</span>
            </h2>
            <p className="fp-anim mt-6 text-xl sm:text-2xl text-white/40 font-light">同样的模型，更低的价格</p>
            <p className="fp-anim mt-3 text-sm text-white/20">按量付费 · 只为成功请求付费 · 无订阅费</p>
          </div>
        </div>

        {/* ===== 场景 4: 定价表 ===== */}
        <div className="fp-section absolute inset-0 flex items-center justify-center z-10" style={{ visibility: "hidden" }}>
          <div className="w-full max-w-2xl px-6">
            <h2 className="fp-anim text-center font-bold text-white/60 text-lg mb-8">热门模型 · 输入价格 / 百万 Token</h2>
            <div className="fp-anim space-y-0">
              {pricingData.map((p) => (
                <div key={p.model} className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <span className="text-white/70 text-sm">{p.model}</span>
                  <span className="text-emerald-400 font-mono text-lg font-bold">{p.price}</span>
                </div>
              ))}
            </div>
            <div className="fp-anim mt-6 flex justify-center gap-3">
              {["标准版 · 3折", "专业版 · 2.55折", "旗舰版 · 2.1折"].map((g, i) => (
                <span key={g} className={`text-[11px] px-3 py-1 rounded-full ${i === 0 ? "bg-white/[0.06] text-white/40" : i === 1 ? "bg-blue-500/10 text-blue-400" : "bg-violet-500/10 text-violet-400"}`}>{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 场景 5-10: 6个功能特性（每个一屏）===== */}
        {features.map((feat, fi) => {
          const Icon = feat.icon;
          return (
            <div key={fi} className="fp-section absolute inset-0 flex items-center justify-center z-10" style={{ visibility: "hidden" }}>
              <div className="text-center px-6 max-w-3xl">
                <div className="fp-anim mx-auto mb-8 h-20 w-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: feat.color + "20" }}>
                  <Icon className="h-10 w-10" style={{ color: feat.color }} />
                </div>
                <h2 className="fp-anim font-black tracking-[-0.03em] text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>{feat.title}</h2>
                <p className="fp-anim text-lg sm:text-xl text-white/40 leading-relaxed max-w-xl mx-auto">{feat.desc}</p>
              </div>
            </div>
          );
        })}

        {/* ===== 场景 11: 代码示例 ===== */}
        <div className="fp-section absolute inset-0 flex items-center justify-center z-10" style={{ visibility: "hidden" }}>
          <div className="w-full max-w-3xl px-6">
            <h2 className="fp-anim text-center font-black text-white tracking-[-0.03em] mb-2" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>三行代码接入</h2>
            <p className="fp-anim text-center text-white/30 mb-8">替换 base_url 和 api_key，就这么简单</p>
            <div className="fp-anim rounded-2xl border border-white/[0.06] bg-[#0d0d14] overflow-hidden">
              <div className="border-b border-white/[0.06] px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-500/60" /><div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" /><div className="h-2.5 w-2.5 rounded-full bg-green-500/60" /></div>
                <span className="text-[11px] text-white/20 ml-2 font-mono">main.py</span>
              </div>
              <pre className="p-6 text-[13px] leading-relaxed overflow-x-auto"><code className="text-emerald-300/80 font-mono">{codeSnippet}</code></pre>
            </div>
          </div>
        </div>

        {/* ===== 场景 12: 兼容客户端 ===== */}
        <div className="fp-section absolute inset-0 flex items-center justify-center z-10" style={{ visibility: "hidden" }}>
          <div className="text-center px-6 max-w-4xl">
            <h2 className="fp-anim font-black tracking-[-0.03em] text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>兼容一切</h2>
            <p className="fp-anim text-white/30 mb-10">所有支持 OpenAI API 的工具和框架都能直接使用</p>
            <div className="fp-anim flex flex-wrap justify-center gap-3">
              {clients.map((c) => (
                <span key={c} className="px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm text-white/50 hover:text-white/80 hover:border-white/20 transition-all cursor-default">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 场景 13: Start Building ===== */}
        <div className="fp-section absolute inset-0 flex items-center justify-center z-10" style={{ visibility: "hidden" }}>
          <div className="text-center px-6">
            <h2 className="fp-anim font-black tracking-[-0.04em] leading-[0.85] text-white" style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}>
              Start <span className="text-indigo-400">Building</span>
            </h2>
            <p className="fp-anim mt-6 text-xl sm:text-2xl text-white/40 font-light">注册即送免费额度，3 分钟完成接入</p>
            <div className="fp-anim mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={REGISTER_PATH}>
                <Button size="lg" className="group bg-white text-black px-10 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]">
                  <span className="flex items-center">免费开始<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
                </Button>
              </a>
              <a href="/docs">
                <Button variant="outline" size="lg" className="border-white/[0.15] text-white/60 px-10 py-6 text-lg rounded-full hover:bg-white/[0.05] hover:text-white transition-all">查看文档</Button>
              </a>
            </div>
          </div>
        </div>

        {/* 左侧竖排品牌 */}
        <div className={`absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.3em] uppercase z-30 transition-colors duration-700 ${navDark ? "text-white/10" : "text-black/10"}`}>FFapi · AI Models Platform</div>

        {/* 右下角 */}
        <div className={`absolute right-6 bottom-6 text-[11px] font-mono z-30 transition-colors duration-700 ${navDark ? "text-white/10" : "text-black/10"}`}>Based in China · Serving Worldwide</div>
      </div>
    </>
  );
}
