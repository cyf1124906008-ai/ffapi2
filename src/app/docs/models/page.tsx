"use client";

export default function ModelsPage() {
  const categories = [
    {
      title: "OpenAI", color: "blue",
      models: [
        "gpt-5.4 · GPT-5.4 最新旗舰",
        "gpt-5.4-pro · GPT-5.4 Pro 顶级版",
        "gpt-5.4-cursor · GPT-5.4 Cursor 编程专用",
        "gpt-5.3-codex · GPT-5.3 Codex 编程引擎",
        "gpt-5-mini · GPT-5 Mini 轻量版",
        "gpt-5-pro · GPT-5 Pro 专业版",
        "gpt-4o · GPT-4o 旗舰多模态",
        "gpt-4o-mini · GPT-4o Mini 轻量版",
        "gpt-4.1 · GPT-4.1 增强版",
        "gpt-4.1-mini · GPT-4.1 Mini 轻量版",
        "gpt-oss-120b · GPT 开源 120B",
        "sora-2 · Sora 2 视频生成",
        "sora-2-all · Sora 2 全功能版",
        "sora-2-pro · Sora 2 Pro 专业版",
      ],
    },
    {
      title: "Anthropic (Claude)", color: "orange",
      models: [
        "claude-opus-4-6 · 4.6 Opus 最新旗舰",
        "claude-opus-4-6-thinking · 4.6 Opus 深度推理",
        "claude-opus-4-6-1m · 4.6 Opus 百万上下文",
        "claude-opus-4-6-cursor · 4.6 Opus Cursor 编程",
        "claude-sonnet-4-6 · 4.6 Sonnet 最新均衡",
        "claude-sonnet-4-6-thinking · 4.6 Sonnet 深度推理",
        "claude-sonnet-4-6-cursor · 4.6 Sonnet Cursor 编程",
        "claude-opus-4-5-20251101 · 4.5 Opus 旗舰",
        "claude-sonnet-4-5-20250929 · 4.5 Sonnet 均衡版",
        "claude-haiku-4-5-20251001 · 4.5 Haiku 极速版",
      ],
    },
    {
      title: "Google (Gemini)", color: "cyan",
      models: [
        "gemini-2.5-pro · 2.5 Pro 专业版（百万上下文）",
        "gemini-2.5-flash · 2.5 Flash 极速版",
        "gemini-2.5-flash-lite · 2.5 Flash Lite 超轻量",
        "gemini-3-pro-preview · 3 Pro 预览版",
        "gemini-3-flash-preview · 3 Flash 预览版",
        "gemini-3.1-pro-preview · 3.1 Pro 预览版",
        "gemini-3-pro-image-preview · Nano Banana 图像生成",
        "gemini-3.1-flash-image-preview · Nano Banana 2 图像",
        "veo_3_1 · Veo 3.1 视频生成",
      ],
    },
    {
      title: "DeepSeek", color: "indigo",
      models: [
        "deepseek-v3.2-251201 · V3.2 最新版",
        "deepseek-v3.2-exp · V3.2 实验版",
        "deepseek-v3.1-terminus · V3.1 终极版",
        "deepseek-v3-250324 · V3 通用版",
        "deepseek-r1-250528 · R1 推理模型",
      ],
    },
    {
      title: "智谱 (GLM)", color: "purple",
      models: [
        "glm-5.1 · GLM-5.1 最新版",
        "glm-5 · GLM-5 新一代旗舰",
        "glm-5-turbo · GLM-5 Turbo 极速版",
        "glm-4.7 · GLM-4.7 进阶版",
        "glm-4.6 · GLM-4.6 增强版",
        "glm-4.5 · GLM-4.5 通用版",
        "glm-4.5-air · GLM-4.5 Air 轻量版",
      ],
    },
    {
      title: "通义千问 (Qwen)", color: "violet",
      models: [
        "qwen3.5 · 通义千问 3.5 最新旗舰",
        "qwen3.5-plus · 3.5 Plus 增强版",
        "qwen3-max · 3 Max 旗舰",
        "qwen3-vl-plus · 3 视觉增强版",
        "qwen3-coder-480b-a35b-instruct · 编程 480B",
        "qwen-image-max · 万相 图像生成旗舰",
        "qwen-image-edit-max · 万相 图像编辑旗舰",
        "wan2.6-i2v · 万相 图生视频",
      ],
    },
    {
      title: "字节豆包", color: "amber",
      models: [
        "doubao-seed-2-0-pro-260215 · Seed 2.0 Pro 旗舰",
        "doubao-seed-2-0-code-preview-260215 · Seed 2.0 编程预览",
        "doubao-seed-1-8-251228 · Seed 1.8 增强版",
        "doubao-seedream-5-0-260128 · 绘梦 5.0 图像生成",
        "doubao-seedance-1-5-pro-251215 · 即梦 1.5 Pro 视频",
      ],
    },
    {
      title: "更多模型", color: "gray",
      models: [
        "grok-4-fast · xAI Grok 4 极速版",
        "kimi-k2.5 · Moonshot Kimi K2.5 最新版",
        "kimi-k2-thinking · Kimi K2 深度推理",
        "MiniMax-M2.5 · MiniMax M2.5 增强版",
        "MiMo-V2-Pro · MiMo V2 Pro 专业版",
        "mj_imagine · Midjourney 图像生成",
        "flux-kontext-max · Flux Kontext 图像编辑",
      ],
    },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    gray: "bg-white/[0.04] text-muted-foreground border-white/[0.08]",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">支持的模型</h1>
      <p className="text-muted-foreground mb-10">
        FFapi 当前支持 114 个模型，覆盖文本、图像、视频、语音等场景。以下按厂商分类展示（仅列出主要模型）。
      </p>

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h2 className="text-lg font-semibold mb-3">{cat.title}</h2>
            <div className="flex flex-wrap gap-2">
              {cat.models.map((m) => {
                const [id, desc] = m.split(" · ");
                return (
                  <div key={id} className={`rounded-lg border px-3 py-1.5 text-xs ${colorMap[cat.color]}`}>
                    <span className="font-mono font-medium">{id}</span>
                    {desc && <span className="ml-1.5 opacity-70">{desc}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        完整模型列表和实时价格请访问 <a href="/console" className="text-blue-400 hover:underline">控制台 → 模型广场</a>。
      </p>
    </div>
  );
}
