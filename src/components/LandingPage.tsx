/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Languages,
  Loader2,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { LOGIN_PATH, REGISTER_PATH } from "@/lib/auth-links";

let globalScrollProgress = 0;

const globalCss = `
  body {
    background-color: #000000;
    color: #ffffff;
    margin: 0;
    overflow-x: hidden;
  }
  .noise {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }
  .reveal-text {
    display: block;
    opacity: 1 !important;
    transform: none !important;
  }
  .font-display {
    letter-spacing: -0.03em;
    line-height: 1.05;
    font-weight: 600;
  }
  .text-caption {
    font-size: 12px;
    letter-spacing: 0.01em;
    color: #86868b;
    font-weight: 500;
  }
  .glass-apple {
    background: rgba(22, 22, 23, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
  }
  .glass-card-apple {
    background: #161617;
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.25, 1), border-color 0.5s ease;
  }
  .glass-card-apple:hover {
    border-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.01);
  }
  .text-gradient {
    background: linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  ::selection {
    background: rgba(0, 243, 255, 0.2);
    color: #ffffff;
  }
  .fade-in {
    opacity: 1 !important;
  }
  .mask-fade-left {
    -webkit-mask-image: linear-gradient(to right, transparent, black 50%);
    mask-image: linear-gradient(to right, transparent, black 50%);
  }
  .mask-fade-right {
    -webkit-mask-image: linear-gradient(to left, transparent, black 50%);
    mask-image: linear-gradient(to left, transparent, black 50%);
  }
  .mask-fade-top {
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 50%);
    mask-image: linear-gradient(to bottom, transparent, black 50%);
  }
  .liquid-glass {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
    backdrop-filter: blur(40px) saturate(200%);
    -webkit-backdrop-filter: blur(40px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 30px 60px rgba(0, 0, 0, 0.5);
    border-radius: 32px;
  }
  .liquid-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
    animation: blobFloat 12s infinite cubic-bezier(0.4, 0, 0.2, 1) alternate;
    pointer-events: none;
  }
  @keyframes blobFloat {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(80px, 60px) scale(1.4); }
  }
  .marquee-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 200vw;
    left: -50vw;
    display: flex;
    overflow: hidden;
    z-index: -1;
    mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marqueeScroll 30s linear infinite;
  }
  @keyframes marqueeScroll {
    to { transform: translateX(-50%); }
  }
  @keyframes borderPulse {
    0%, 100% { border-color: rgba(255,255,255,0.08); box-shadow: 0 0 0 transparent; }
    50% { border-color: rgba(0, 243, 255, 0.4); box-shadow: 0 0 30px rgba(0, 243, 255, 0.15); }
  }
  .playground-glow {
    animation: borderPulse 4s infinite ease-in-out;
  }
  .site-shell {
    position: relative;
    min-height: 100vh;
    background:
      radial-gradient(circle at 50% -8%, rgba(255,255,255,0.09), transparent 24%),
      linear-gradient(180deg, #06080c 0%, #05070a 28%, #030406 68%, #020304 100%);
    --mouse-x: 50%;
    --mouse-y: 18%;
  }
  .bg-stage {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .bg-stage::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.09), transparent 16%),
      radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 22%);
    opacity: 0.75;
  }
  .bg-stage::after {
    content: "";
    position: absolute;
    left: 8%;
    right: 8%;
    top: 82px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
    opacity: 0.45;
  }
  .bg-vignette {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 34%, transparent 0%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.56) 100%);
  }
  .bg-grid-layer {
    position: absolute;
    inset: 0;
    opacity: 0.08;
    background-image:
      linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 120px 120px;
    mask-image: linear-gradient(to bottom, transparent, black 16%, black 76%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 16%, black 76%, transparent);
  }
  .bg-rings {
    position: absolute;
    inset: -8%;
    background:
      radial-gradient(circle at 50% 58%, transparent 0 36%, rgba(255,255,255,0.05) 36.4%, transparent 37.1%),
      radial-gradient(circle at 50% 58%, transparent 0 54%, rgba(255,255,255,0.025) 54.3%, transparent 55%);
    opacity: 0.22;
    filter: blur(0.2px);
  }
  .bg-orb {
    position: absolute;
    border-radius: 999px;
    filter: blur(70px);
    opacity: 0.42;
    mix-blend-mode: screen;
    animation: orbDrift 16s ease-in-out infinite alternate;
  }
  .bg-orb.left {
    left: -10%;
    top: 18%;
    width: 38vw;
    height: 44vw;
    max-width: 560px;
    max-height: 620px;
    background: radial-gradient(circle, rgba(76, 255, 175, 0.16), rgba(76, 255, 175, 0.02) 58%, transparent 74%);
  }
  .bg-orb.right {
    right: -8%;
    top: 14%;
    width: 34vw;
    height: 40vw;
    max-width: 520px;
    max-height: 560px;
    background: radial-gradient(circle, rgba(118, 103, 255, 0.16), rgba(118, 103, 255, 0.02) 56%, transparent 72%);
    animation-duration: 20s;
    animation-direction: alternate-reverse;
  }
  .bg-sweep {
    position: absolute;
    left: 14%;
    right: 14%;
    top: 10%;
    height: 42%;
    border-radius: 999px;
    background:
      radial-gradient(ellipse at center, rgba(49, 109, 255, 0.11), transparent 58%),
      radial-gradient(ellipse at 50% 18%, rgba(255,255,255,0.09), transparent 34%);
    filter: blur(48px);
    opacity: 0.34;
    transform: translateY(-8%);
    animation: sweepFloat 20s ease-in-out infinite alternate;
  }
  @keyframes orbDrift {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(3%, 2%, 0) scale(1.06); }
  }
  @keyframes sweepFloat {
    0% { transform: translateY(-8%) scaleX(1); opacity: 0.28; }
    100% { transform: translateY(-2%) scaleX(1.04); opacity: 0.38; }
  }
  .interactive-panel {
    position: relative;
    isolation: isolate;
    transform-style: preserve-3d;
    transition:
      transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 320ms ease,
      background-color 320ms ease,
      box-shadow 320ms ease;
    will-change: transform;
    --spot-x: 50%;
    --spot-y: 50%;
    --rotate-x: 0deg;
    --rotate-y: 0deg;
    --panel-tint: rgba(255,255,255,0.14);
    --panel-shadow: rgba(255,255,255,0.08);
  }
  .interactive-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    background:
      radial-gradient(circle at var(--spot-x) var(--spot-y), var(--panel-tint) 0%, transparent 45%),
      linear-gradient(135deg, rgba(255,255,255,0.14), transparent 38%, transparent 70%, rgba(255,255,255,0.05));
    transition: opacity 280ms ease;
    z-index: 0;
  }
  .interactive-panel::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    background: linear-gradient(120deg, transparent 15%, rgba(255,255,255,0.18) 48%, transparent 82%);
    transform: translateX(-28%);
    transition: opacity 280ms ease, transform 540ms cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 0;
  }
  .interactive-panel:hover {
    transform:
      perspective(1200px)
      rotateX(var(--rotate-x))
      rotateY(var(--rotate-y))
      translateY(-10px)
      scale(1.015);
    box-shadow:
      0 24px 60px rgba(0,0,0,0.38),
      0 0 0 1px rgba(255,255,255,0.08),
      0 0 40px var(--panel-shadow);
  }
  .interactive-panel:hover::before,
  .interactive-panel:hover::after {
    opacity: 1;
  }
  .interactive-panel:hover::after {
    transform: translateX(28%);
  }
  .interactive-panel > * {
    position: relative;
    z-index: 1;
  }
  .interactive-card-float {
    animation: cardFloat 7s ease-in-out infinite;
  }
  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  .model-icon-shell {
    position: relative;
    overflow: hidden;
  }
  .model-icon-shell::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    border: 1px solid rgba(255,255,255,0.18);
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 260ms ease, transform 260ms ease;
  }
  .interactive-panel:hover .model-icon-shell::after {
    opacity: 1;
    transform: scale(1.04);
  }
  .price-row {
    position: relative;
    overflow: hidden;
    border-radius: 22px;
    border: 1px solid transparent;
    transition:
      transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 260ms ease,
      background-color 260ms ease;
  }
  .price-row::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    transform: translateX(-100%);
    transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .price-row:hover {
    transform: translateY(-4px);
    border-color: rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
  }
  .price-row:hover::before {
    transform: translateX(100%);
  }
`;

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "default" | "sm" | "lg";
};

type ModelCard = {
  name: string;
  vendor: string;
  color: string;
  iconUrl?: string;
  IconComponent?: LucideIcon;
};

type InteractivePanelProps = {
  children: React.ReactNode;
  className?: string;
  tint?: string;
  style?: React.CSSProperties;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "default", ...props }, ref) => {
    let baseClass =
      "group inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50";

    if (size === "sm") baseClass += " h-8 px-4 text-[11px]";
    else if (size === "lg") baseClass += " h-12 px-8 text-base";
    else baseClass += " h-9 px-4 text-sm";

    return (
      <button ref={ref} className={cn(baseClass, className)} {...props} />
    );
  },
);
Button.displayName = "Button";

function InteractivePanel({
  children,
  className,
  tint = "rgba(255,255,255,0.16)",
  style,
}: InteractivePanelProps) {
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((x - 50) / 50) * 7;
    const rotateX = ((50 - y) / 50) * 7;

    event.currentTarget.style.setProperty("--spot-x", `${x}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y}%`);
    event.currentTarget.style.setProperty("--rotate-x", `${rotateX}deg`);
    event.currentTarget.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--spot-x", "50%");
    event.currentTarget.style.setProperty("--spot-y", "50%");
    event.currentTarget.style.setProperty("--rotate-x", "0deg");
    event.currentTarget.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <div
      className={cn("interactive-panel", className)}
      style={
        {
          "--panel-tint": tint,
          "--panel-shadow": tint,
          ...style,
        } as React.CSSProperties
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform float uProgress;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    float pulse = sin(position.x * 2.0 + uTime) * cos(position.y * 2.0 + uTime * 0.5);
    vec3 pos = position + normal * pulse * 0.05 * (1.0 - uProgress);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vPosition = pos;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform float uProgress;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 glassColor = vec3(0.04, 0.04, 0.06);
    float synapse = sin(vPosition.x * 5.0 + uTime) * sin(vPosition.y * 5.0 + uTime);
    synapse = smoothstep(0.95, 1.0, synapse);
    vec3 synapseColor = vec3(0.0, 0.7, 1.0) * synapse * (1.0 - uProgress) * 0.2;
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
    vec3 reflection = vec3(1.0) * fresnel * 0.3;
    float grid = step(0.99, sin(vUv.x * 60.0) * sin(vUv.y * 60.0));
    vec3 gridColor = vec3(1.0) * grid * 0.03 * (1.0 - uProgress);
    vec3 finalColor = mix(glassColor + reflection + synapseColor + gridColor, glassColor + reflection * 0.1, uProgress);
    vec3 lightDir = normalize(vec3(5.0, 5.0, 10.0));
    float spec = pow(max(dot(normal, normalize(lightDir + viewDir)), 0.0), 128.0);
    finalColor += vec3(1.0) * spec * 0.4;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const translations = {
  en: {
    nav: {
      models: "Models",
      playground: "Playground",
      pricing: "Pricing",
      developers: "Developers",
      getStarted: "Get Started",
    },
    hero: {
      badge: "Neural Gateway v4.6",
      title1: "Intelligence.",
      title2: "Unbound.",
      desc: "The world's most capable AI models, unified through a single, enterprise-grade interface.",
      cta: "Start Building",
      learnMore: "Learn more",
    },
    features: {
      title: "The New Standard.",
      desc: "Precision-tuned infrastructure that powers the next generation of AI applications.",
      f1_title: "Global Neural Fabric",
      f1_desc: "Distributed across 20+ edge locations. Sub-500ms latency.",
      f2_title: "Privacy First",
      f2_desc: "Enterprise-grade encryption and SOC2 compliance out of the box.",
      f3_title: "Instant Scale",
      f3_desc: "From 1 to 1 billion requests. Our infrastructure scales with you.",
      f4_title: "Economic Efficiency",
      f4_desc: "Save up to 70% on inference costs compared to direct providers.",
    },
    models: {
      title: "One API. All the Models.",
      desc: "Access the latest from OpenAI, Anthropic, Google, and more with zero code changes.",
    },
    playground: {
      badge: "Live Demo",
      title: "Test the Intelligence.",
      desc: "Experience a live model response through a server-side FFapi playground proxy.",
      placeholder:
        "Ask me anything... (e.g., Explain quantum computing in 2 sentences)",
      runBtn: "Run",
      runningBtn: "Thinking...",
      sysPrefix: "System > ",
      error: "Connection error. Please try again.",
    },
    pricing: {
      title: "Simple Pricing.",
      desc: "Pay only for what you use. No commitments.",
      input: "Input",
      output: "Output",
      per: "/1M tokens",
      sales: "Contact Sales",
      custom: "Need custom volume pricing?",
    },
    footer: {
      desc: "The next generation of AI infrastructure. Built for developers who demand precision and performance.",
      rights: "© 2026 FFapi Neural Systems. All rights reserved.",
    },
  },
  zh: {
    nav: {
      models: "模型库",
      playground: "演练场",
      pricing: "价格",
      developers: "开发者",
      getStarted: "立即开始",
    },
    hero: {
      badge: "神经网关 v4.6",
      title1: "智能.",
      title2: "无界.",
      desc: "全球最顶尖的 AI 模型，通过统一的企业级接口完美呈现。",
      cta: "开始构建",
      learnMore: "了解更多",
    },
    features: {
      title: "行业新标准",
      desc: "经过精密调校的基础设施，驱动下一代 AI 应用。",
      f1_title: "全球神经织网",
      f1_desc: "分布于全球 20 多个边缘节点。专有路由引擎确保低于 500ms 的响应延迟。",
      f2_title: "隐私至上",
      f2_desc: "内置企业级加密和 SOC2 合规性，保障数据安全。",
      f3_title: "即时扩展",
      f3_desc: "从 1 次到 10 亿次请求，我们的架构随您的业务共同成长。",
      f4_title: "极致成本",
      f4_desc: "相比直接供应商，推理成本最高可降低 70%。",
    },
    models: {
      title: "一个接口，全量模型",
      desc: "无需更改代码，即可访问 OpenAI、Anthropic、Google 等最新模型。",
    },
    playground: {
      badge: "实时演示",
      title: "测试网关智能",
      desc: "通过服务端代理安全调用模型，不把密钥暴露到浏览器。",
      placeholder: "向模型提问... (例如：用两句话解释量子计算)",
      runBtn: "运行",
      runningBtn: "思考中...",
      sysPrefix: "系统 > ",
      error: "连接异常，请重试。",
    },
    pricing: {
      title: "价格透明",
      desc: "按需付费，无需任何长期承诺。",
      input: "输入",
      output: "输出",
      per: "/百万 Token",
      sales: "联系销售",
      custom: "需要定制化的大规模定价方案？",
    },
    footer: {
      desc: "下一代 AI 基础设施。为追求极致性能与精度的开发者而生。",
      rights: "© 2026 FFapi Neural Systems. 保留所有权利。",
    },
  },
} as const;

const vendorMarquee = [
  {
    name: "OpenAI",
    icon: "/providers/openai.svg",
  },
  {
    name: "Google",
    icon: "/providers/gemini.svg",
  },
  {
    name: "Anthropic",
    icon: "/providers/anthropic.svg",
  },
  {
    name: "Meta",
    icon: "https://api.iconify.design/logos:meta-icon.svg",
  },
  {
    name: "Mistral",
    icon: "https://api.iconify.design/simple-icons:mistral.svg?color=white",
  },
  {
    name: "DeepSeek",
    icon: "/providers/deepseek.png",
  },
  {
    name: "Cohere",
    icon: "https://api.iconify.design/simple-icons:cohere.svg?color=white",
  },
];

const modelData: ModelCard[] = [
  {
    name: "GPT-5.4",
    vendor: "OpenAI",
    color: "#10b981",
    iconUrl: "/providers/openai.svg",
  },
  {
    name: "GLM-5.1",
    vendor: "Zhipu AI",
    color: "#8b5cf6",
    iconUrl: "/providers/zhipu.svg",
  },
  {
    name: "Claude Opus 4.6",
    vendor: "Anthropic",
    color: "#f97316",
    iconUrl: "/providers/anthropic.svg",
  },
  {
    name: "Claude Sonnet 4.6",
    vendor: "Anthropic",
    color: "#f97316",
    iconUrl: "/providers/anthropic.svg",
  },
  {
    name: "Gemini 3.1 Pro",
    vendor: "Google",
    color: "#3b82f6",
    iconUrl: "/providers/gemini.svg",
  },
  {
    name: "DeepSeek V3.2",
    vendor: "DeepSeek",
    color: "#818cf8",
    iconUrl: "/providers/deepseek.png",
  },
];

const pricingData = [
  { model: "GPT-5.2", input: "$1.75", output: "$14.00" },
  { model: "GPT-5.4", input: "$0.75", output: "$4.80" },
  { model: "Claude Sonnet 4.6", input: "$0.90", output: "$4.50" },
  { model: "DeepSeek V3.2", input: "$0.08", output: "$0.24" },
];

async function callPlaygroundAPI(prompt: string): Promise<string> {
  const response = await fetch("/api/playground", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = (await response.json().catch(() => null)) as
    | { text?: string; error?: string }
    | null;

  if (!response.ok) {
    throw new Error(data?.error || `Playground request failed: ${response.status}`);
  }

  return data?.text || "Empty response from model.";
}

function LandingPageContent() {
  const [lang, setLang] = useState<"en" | "zh">("zh");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[lang];

  const handleRunPlayground = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse("");

    try {
      const result = await callPlaygroundAPI(prompt);
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse(
        error instanceof Error ? error.message : t.playground.error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 selection:bg-accent/20 fade-in">
      <div className="noise" />

      <nav className="fixed top-0 z-[100] w-full px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-2 glass-apple">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[10px] font-black text-black">
              FF
            </div>
            <span className="text-sm font-semibold tracking-tight">FFapi</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#models"
              className="text-[12px] font-medium text-white/50 transition-colors hover:text-white"
            >
              {t.nav.models}
            </a>
            <a
              href="#playground"
              className="text-[12px] font-medium text-white/50 transition-colors hover:text-white"
            >
              {t.nav.playground}
            </a>
            <a
              href="#pricing"
              className="text-[12px] font-medium text-white/50 transition-colors hover:text-white"
            >
              {t.nav.pricing}
            </a>
            <a
              href="/docs"
              className="text-[12px] font-medium text-white/50 transition-colors hover:text-white"
            >
              {t.nav.developers}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white"
              aria-label="Switch language"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "en" ? "ZH" : "EN"}
            </button>
            <a href={REGISTER_PATH}>
              <Button
                size="sm"
                className="h-8 rounded-full bg-white px-4 text-[11px] font-bold text-black transition-transform hover:bg-white/90 active:scale-95"
              >
                {t.nav.getStarted}
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-caption font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              {t.hero.badge}
            </span>
          </div>
          <div className="overflow-hidden">
            <h1 className="reveal-text font-display text-[10vw] text-gradient md:text-[120px]">
              {t.hero.title1}
              <br />
              {t.hero.title2}
            </h1>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-xl leading-tight font-medium text-[#86868b] md:text-2xl">
            {t.hero.desc}
          </p>
          <div className="mt-12 flex items-center justify-center gap-8">
            <a href={REGISTER_PATH}>
              <Button className="rounded-full bg-[#0071e3] px-8 py-6 text-sm font-semibold text-white transition-all hover:bg-[#0077ed] active:scale-95">
                {t.hero.cta}
              </Button>
            </a>
            <a
              href="/docs"
              className="group flex items-center gap-1 text-sm font-semibold text-[#0071e3] hover:underline"
            >
              {t.hero.learnMore}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="section px-6 py-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-24 text-center">
            <h2 className="reveal-text mb-6 font-display text-4xl md:text-6xl">
              {t.features.title}
            </h2>
            <p className="mx-auto max-w-xl text-lg text-[#86868b]">
              {t.features.desc}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <InteractivePanel
              tint="rgba(59,130,246,0.18)"
              className="glass-card-apple group relative col-span-8 flex min-h-[460px] flex-col justify-between overflow-hidden p-12"
            >
              <div className="mask-fade-left pointer-events-none absolute right-0 top-0 h-full w-[65%] opacity-30 mix-blend-screen transition-opacity duration-700 group-hover:opacity-60">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                  alt="Network particles"
                  className="h-full w-full object-cover object-right grayscale"
                />
              </div>
              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-semibold">
                  {t.features.f1_title}
                </h3>
                <p className="max-w-sm leading-relaxed text-[#86868b]">
                  {t.features.f1_desc}
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-full bg-gradient-to-t from-blue-500/5 to-transparent" />
              <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] transition-all duration-1000 group-hover:bg-blue-500/15" />
            </InteractivePanel>
            <InteractivePanel
              tint="rgba(168,85,247,0.16)"
              className="glass-card-apple group relative col-span-4 flex flex-col justify-between overflow-hidden p-10"
            >
              <div className="mask-fade-top pointer-events-none absolute inset-0 h-full w-full opacity-10 mix-blend-screen transition-opacity duration-700 group-hover:opacity-30">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop"
                  alt="Grid flow"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    {t.features.f2_title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#86868b]">
                    {t.features.f2_desc}
                  </p>
                </div>
              </div>
            </InteractivePanel>
            <InteractivePanel
              tint="rgba(250,204,21,0.14)"
              className="glass-card-apple group relative col-span-4 flex flex-col justify-between overflow-hidden p-10"
            >
              <div className="mask-fade-top pointer-events-none absolute inset-0 h-full w-full opacity-10 mix-blend-screen transition-opacity duration-700 group-hover:opacity-30">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop"
                  alt="Speed nodes"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    {t.features.f3_title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#86868b]">
                    {t.features.f3_desc}
                  </p>
                </div>
              </div>
            </InteractivePanel>
            <InteractivePanel
              tint="rgba(16,185,129,0.16)"
              className="glass-card-apple group relative col-span-8 flex min-h-[460px] flex-col justify-between overflow-hidden p-12"
            >
              <div className="mask-fade-right pointer-events-none absolute left-0 top-0 h-full w-[65%] opacity-30 mix-blend-screen transition-opacity duration-700 group-hover:opacity-60">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
                  alt="Data core"
                  className="h-full w-full object-cover object-left grayscale"
                />
              </div>
              <div className="relative z-10 flex flex-col items-end text-right">
                <h3 className="mb-4 text-3xl font-semibold">
                  {t.features.f4_title}
                </h3>
                <p className="max-w-sm leading-relaxed text-[#86868b]">
                  {t.features.f4_desc}
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-emerald-500/5 to-transparent" />
              <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] transition-all duration-1000 group-hover:bg-emerald-500/15" />
            </InteractivePanel>
          </div>
        </div>
      </section>

      <section
        id="models"
        className="section relative overflow-hidden bg-[#0a0a0a]/50 px-6 py-32"
      >
        <div className="marquee-wrapper opacity-50">
          <div className="marquee-track">
            {[...vendorMarquee, ...vendorMarquee].map((m, i) => (
              <div key={`${m.name}-${i}`} className="flex items-center gap-4 px-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-sm">
                  <img
                    src={m.icon}
                    alt={m.name}
                    className="h-6 w-6 object-contain drop-shadow-lg"
                  />
                </div>
                <span className="font-display text-4xl font-bold tracking-tighter text-transparent bg-gradient-to-r from-white/80 to-white/30 bg-clip-text">
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <h2 className="reveal-text font-display text-4xl drop-shadow-md md:text-6xl">
              {t.models.title}
            </h2>
            <p className="max-w-xs text-[#86868b]">{t.models.desc}</p>
          </div>

          <div className="liquid-glass relative overflow-hidden p-8 md:p-12">
            <div className="liquid-blob -left-32 -top-32 h-96 w-96 bg-emerald-500/20" />
            <div
              className="liquid-blob left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform bg-blue-500/20"
              style={{ animationDelay: "-3s" }}
            />
            <div
              className="liquid-blob -bottom-32 -right-32 h-96 w-96 bg-purple-500/20"
              style={{
                animationDelay: "-5s",
                animationDirection: "reverse",
              }}
            />

            <div className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              {modelData.map((model, index) => {
                const Icon = model.IconComponent;

                return (
                  <InteractivePanel
                    key={model.name}
                    tint={`color-mix(in srgb, ${model.color} 28%, rgba(255,255,255,0.08))`}
                    className="interactive-card-float group flex cursor-pointer flex-col items-center rounded-2xl border border-white/[0.08] bg-black/30 p-6 text-center shadow-2xl backdrop-blur-md"
                    style={{ animationDelay: `${index * 0.6}s` }}
                  >
                    <div
                      className="model-icon-shell mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                      style={{
                        boxShadow: `0 0 24px color-mix(in srgb, ${model.color} 18%, transparent)`,
                      }}
                    >
                      {model.iconUrl ? (
                        <img
                          src={model.iconUrl}
                          alt={model.vendor}
                          className="h-10 w-10 object-contain drop-shadow-lg transition-transform duration-500 group-hover:rotate-6"
                        />
                      ) : Icon ? (
                        <Icon
                          className="h-10 w-10 transition-transform duration-500 group-hover:rotate-6"
                          style={{ color: model.color }}
                        />
                      ) : null}
                    </div>
                    <div className="mb-1.5 text-sm font-semibold text-white/90">
                      {model.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50">
                      {model.vendor}
                    </div>
                  </InteractivePanel>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="playground"
        className="section relative overflow-hidden px-6 py-20"
      >
        <div className="glass-card-apple playground-glow relative mx-auto max-w-4xl overflow-hidden border border-white/[0.08] transition-transform duration-500 hover:scale-[1.01]">
          <div className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1] mix-blend-screen">
            <img
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop"
              alt="Matrix code background"
              className="h-full w-full object-cover grayscale"
            />
          </div>
          <div className="relative z-10 bg-gradient-to-b from-white/[0.02] to-transparent p-8 md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-caption font-semibold uppercase tracking-widest text-blue-400 drop-shadow-[0_0_10px_rgba(147,197,253,0.5)]">
                {t.playground.badge}
              </span>
            </div>
            <h2 className="mb-3 font-display text-3xl md:text-4xl">
              {t.playground.title}
            </h2>
            <p className="mb-8 text-sm text-[#86868b]">{t.playground.desc}</p>

            <div className="group/terminal overflow-hidden rounded-xl border border-white/[0.1] bg-black/60 shadow-inner backdrop-blur-md transition-all duration-300 focus-within:border-blue-500/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <div className="flex items-center gap-3 border-b border-white/[0.05] bg-white/[0.03] px-4 py-3 transition-colors group-focus-within/terminal:bg-blue-900/20">
                <div className="mr-2 flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <Terminal className="h-4 w-4 text-[#86868b] transition-colors group-focus-within/terminal:text-blue-400" />
                <span className="font-mono text-xs text-[#86868b] transition-colors group-focus-within/terminal:text-blue-300">
                  /api/playground
                </span>
              </div>

              <div className="flex flex-col gap-4 p-4">
                <textarea
                  className="min-h-[80px] w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/20 md:text-base"
                  placeholder={t.playground.placeholder}
                  value={prompt}
                  onChange={(event) => {
                    setPrompt(event.target.value);
                    event.target.style.height = "auto";
                    event.target.style.height = `${event.target.scrollHeight}px`;
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void handleRunPlayground();
                    }
                  }}
                  disabled={isLoading}
                />

                <div className="flex justify-end">
                  <Button
                    onClick={() => void handleRunPlayground()}
                    disabled={isLoading || !prompt.trim()}
                    className="rounded-md bg-blue-600 text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] active:scale-95"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isLoading ? t.playground.runningBtn : t.playground.runBtn}
                  </Button>
                </div>
              </div>

              {response ? (
                <div className="relative overflow-hidden border-t border-blue-500/20 bg-blue-900/20 p-4">
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <p className="mb-2 font-mono text-xs text-blue-400">
                    {t.playground.sysPrefix}
                    200 OK
                  </p>
                  <p className="relative z-10 whitespace-pre-wrap font-mono text-sm leading-relaxed text-blue-50">
                    {response}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="section px-6 py-40">
        <div className="mx-auto max-w-4xl">
          <div className="mb-24 text-center">
            <h2 className="reveal-text mb-6 font-display text-4xl md:text-6xl">
              {t.pricing.title}
            </h2>
            <p className="text-lg text-[#86868b]">{t.pricing.desc}</p>
          </div>
          <div className="glass-card-apple overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="space-y-4">
                {pricingData.map((price) => (
                  <div
                    key={price.model}
                    className="price-row flex flex-col justify-between gap-4 border-b border-white/[0.05] px-4 py-6 last:border-0 md:flex-row md:items-center"
                  >
                    <div>
                      <div className="text-xl font-semibold">{price.model}</div>
                      <div className="mt-1 text-xs text-[#86868b]">
                        Enterprise-grade inference
                      </div>
                    </div>
                    <div className="flex gap-12">
                      <div className="text-right">
                        <div className="mb-1 text-[10px] uppercase tracking-widest text-[#86868b]">
                          {t.pricing.input}
                        </div>
                        <div className="text-lg font-medium">
                          {price.input}{" "}
                          <span className="text-xs text-[#86868b]">
                            {t.pricing.per}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="mb-1 text-[10px] uppercase tracking-widest text-[#86868b]">
                          {t.pricing.output}
                        </div>
                        <div className="text-lg font-medium">
                          {price.output}{" "}
                          <span className="text-xs text-[#86868b]">
                            {t.pricing.per}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-8 bg-white/[0.02] p-8 md:flex-row md:p-12">
              <div className="text-sm text-[#86868b]">{t.pricing.custom}</div>
              <a href={REGISTER_PATH}>
                <Button className="rounded-full bg-white px-10 py-6 font-semibold text-black transition-transform hover:bg-white/90 active:scale-95">
                  {t.pricing.sales}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.05] bg-[#000000] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-16 md:flex-row">
            <div className="max-w-xs">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[10px] font-black text-black">
                  FF
                </div>
                <span className="text-sm font-semibold tracking-tight">FFapi</span>
              </div>
              <p className="text-sm leading-relaxed text-[#86868b]">
                {t.footer.desc}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-16 md:grid-cols-3">
              <div>
                <h4 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">
                  {t.nav.models}
                </h4>
                <ul className="space-y-3 text-sm text-[#86868b]">
                  <li>
                    <a href="#models" className="transition-colors hover:text-white">
                      {t.nav.models}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#playground"
                      className="transition-colors hover:text-white"
                    >
                      {t.nav.playground}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="transition-colors hover:text-white"
                    >
                      {t.nav.pricing}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">
                  Company
                </h4>
                <ul className="space-y-3 text-sm text-[#86868b]">
                  <li>
                    <a href="/docs" className="transition-colors hover:text-white">
                      Docs
                    </a>
                  </li>
                  <li>
                    <a
                      href={LOGIN_PATH}
                      className="transition-colors hover:text-white"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href={REGISTER_PATH}
                      className="transition-colors hover:text-white"
                    >
                      Register
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">
                  Platform
                </h4>
                <ul className="space-y-3 text-sm text-[#86868b]">
                  <li>
                    <a href="/docs/api" className="transition-colors hover:text-white">
                      API
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/models"
                      className="transition-colors hover:text-white"
                    >
                      Models
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/quickstart"
                      className="transition-colors hover:text-white"
                    >
                      Quickstart
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/[0.05] pt-8 text-[11px] text-[#424245] md:flex-row">
            <span>{t.footer.rights}</span>
            <div className="flex gap-6">
              <a href="/docs/faq" className="transition-colors hover:text-white">
                FAQ
              </a>
              <a href="/docs/api" className="transition-colors hover:text-white">
                API Reference
              </a>
              <a
                href="/docs/changelog"
                className="transition-colors hover:text-white"
              >
                Changelog
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function LandingPage() {
  const [progressWidth, setProgressWidth] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId = 0;
    const mountNode = canvasRef.current;
    const shellNode = shellRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (mountNode) {
      mountNode.appendChild(renderer.domElement);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.1));

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(10, 10, 10);
    scene.add(spotLight);

    const group = new THREE.Group();
    group.scale.setScalar(2.4);
    scene.add(group);

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
    };

    const outerGeometry = new THREE.IcosahedronGeometry(1, 1);
    const outerMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    const mesh = new THREE.Mesh(outerGeometry, outerMaterial);

    const coreGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.1,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);

    group.add(mesh);
    group.add(core);

    const clock = new THREE.Clock();

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      globalScrollProgress =
        scrollHeight > 0
          ? (window.scrollY || document.documentElement.scrollTop) / scrollHeight
          : 0;
      setProgressWidth(globalScrollProgress * 100);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!shellNode) return;
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      shellNode.style.setProperty("--mouse-x", `${x}%`);
      shellNode.style.setProperty("--mouse-y", `${y}%`);
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const progress = globalScrollProgress;

      uniforms.uTime.value = elapsed;
      uniforms.uProgress.value = progress;

      mesh.rotation.y = elapsed * 0.08 + progress * Math.PI;
      mesh.rotation.z = elapsed * 0.03;
      core.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.03);
      coreMaterial.opacity = 0.1 * (1.0 - progress);

      let targetX = 0;
      let targetY = 0;
      let targetRotation = 0;
      let targetScale = 2.4;

      if (progress < 0.3) {
        const stage = progress / 0.3;
        targetX = THREE.MathUtils.lerp(0, 1.2, stage);
        targetY = THREE.MathUtils.lerp(0, -0.4, stage);
        targetRotation = THREE.MathUtils.lerp(0, 0.1, stage);
      } else if (progress < 0.6) {
        const stage = (progress - 0.3) / 0.3;
        targetX = THREE.MathUtils.lerp(1.2, -1.5, stage);
        targetY = THREE.MathUtils.lerp(-0.4, 0, stage);
        targetRotation = THREE.MathUtils.lerp(0.1, 0, stage);
        targetScale = THREE.MathUtils.lerp(2.4, 2.64, stage);
      } else {
        targetX = -1.5;
        targetScale = 2.64;
      }

      group.position.set(
        THREE.MathUtils.lerp(group.position.x, targetX, 0.08),
        THREE.MathUtils.lerp(group.position.y, targetY, 0.08),
        0,
      );
      group.rotation.z = THREE.MathUtils.lerp(
        group.rotation.z,
        targetRotation,
        0.08,
      );
      group.scale.setScalar(
        THREE.MathUtils.lerp(group.scale.x, targetScale, 0.08),
      );

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(animationId);

      group.remove(mesh);
      group.remove(core);
      outerGeometry.dispose();
      outerMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();

      if (mountNode?.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <style>{globalCss}</style>
      <div ref={shellRef} className="site-shell font-sans text-white">
        <div className="bg-stage">
          <div className="bg-sweep" />
          <div className="bg-orb left" />
          <div className="bg-orb right" />
          <div className="bg-grid-layer" />
          <div className="bg-rings" />
          <div className="bg-vignette" />
        </div>
        <div ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />
        <LandingPageContent />
        <div
          className="fixed bottom-0 left-0 z-50 h-1 bg-[#00f3ff] transition-none"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </>
  );
}
