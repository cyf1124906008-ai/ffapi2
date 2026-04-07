"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    title: "一站式",
    subtitle: "AI 模型接入平台",
    desc: "",
  },
  {
    title: "100+",
    subtitle: "主流大模型",
    desc: "GPT-5.4 · Claude Opus 4.6 · Gemini 3.1 · DeepSeek · GLM-5",
  },
  {
    title: "官方 3 折",
    subtitle: "更低价格，更强性能",
    desc: "按量付费，只为成功请求付费",
  },
  {
    title: "一行代码",
    subtitle: "无缝切换任意模型",
    desc: "完全兼容 OpenAI API 格式，替换 Base URL 即刻接入",
  },
  {
    title: "99.9%",
    subtitle: "高可用保障",
    desc: "多渠道负载均衡 · 自动故障转移 · 全球节点优化",
  },
];

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = scenesRef.current.filter(Boolean);

    // 创建主时间轴：pin 整个容器，scrub 跟随滚动
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${panels.length * 100}vh`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    panels.forEach((panel, i) => {
      const title = panel.querySelector(".scene-title");
      const subtitle = panel.querySelector(".scene-subtitle");
      const desc = panel.querySelector(".scene-desc");

      if (i > 0) {
        // 淡入当前场景
        tl.fromTo(
          panel,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4 },
          `scene${i}`
        );
        tl.fromTo(
          title,
          { y: 80, scale: 0.8 },
          { y: 0, scale: 1, duration: 0.5 },
          `scene${i}`
        );
        tl.fromTo(
          subtitle,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4 },
          `scene${i}+=0.15`
        );
        if (desc) {
          tl.fromTo(
            desc,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3 },
            `scene${i}+=0.25`
          );
        }
      }

      // 停留一段时间
      tl.to({}, { duration: 0.3 });

      if (i < panels.length - 1) {
        // 淡出当前场景
        tl.to(title, { y: -60, scale: 1.1, duration: 0.3 }, `exit${i}`);
        tl.to(subtitle, { y: -30, autoAlpha: 0, duration: 0.2 }, `exit${i}`);
        if (desc) {
          tl.to(desc, { autoAlpha: 0, duration: 0.15 }, `exit${i}`);
        }
        tl.to(panel, { autoAlpha: 0, duration: 0.2 }, `exit${i}+=0.15`);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.08),transparent_70%)]" />
      </div>

      {scenes.map((scene, i) => (
        <div
          key={i}
          ref={(el) => { if (el) scenesRef.current[i] = el; }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ visibility: i === 0 ? "visible" : "hidden" }}
        >
          <div className="text-center px-6 max-w-5xl">
            <div className="scene-title text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-[-0.04em] leading-[0.9] text-white">
              {scene.title}
            </div>
            <div className="scene-subtitle mt-4 text-2xl sm:text-3xl md:text-4xl font-light text-white/50 tracking-tight">
              {scene.subtitle}
            </div>
            {scene.desc && (
              <div className="scene-desc mt-6 text-base sm:text-lg text-white/25 max-w-xl mx-auto">
                {scene.desc}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 滚动进度条 */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {scenes.map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
        ))}
      </div>

      {/* 底部滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-white/20 tracking-widest uppercase">
        Scroll
      </div>
    </div>
  );
}
