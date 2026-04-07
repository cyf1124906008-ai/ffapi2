"use client";

import { ModelCard } from "@/components/docs/DocComponents";

const textModels = [
  { model: "GPT-5.4", pos: "最新旗舰", features: "OpenAI 最强模型，复杂推理与编程能力领先", ctx: "128K", output: "32K" },
  { model: "GPT-5.4 Pro", pos: "顶级专业", features: "更强推理深度，适合科研与复杂分析", ctx: "128K", output: "32K" },
  { model: "GPT-4o", pos: "旗舰多模态", features: "文本/图像/音频统一理解，性价比高", ctx: "128K", output: "16K" },
  { model: "GPT-4o Mini", pos: "轻量高速", features: "极低价格，适合大批量和实时场景", ctx: "128K", output: "16K" },
  { model: "GPT-5 Mini", pos: "新一代轻量", features: "GPT-5 架构的轻量版，能力大幅提升", ctx: "128K", output: "16K" },
  { model: "Claude Opus 4.6", pos: "最强推理", features: "Anthropic 旗舰，深度推理与代码能力顶尖", ctx: "200K", output: "128K" },
  { model: "Claude Sonnet 4.6", pos: "均衡之选", features: "速度与智能的最佳平衡，日常首选", ctx: "200K", output: "64K" },
  { model: "Claude Haiku 4.5", pos: "极速响应", features: "超低延迟，适合实时对话和嵌入式场景", ctx: "200K", output: "32K" },
  { model: "Gemini 2.5 Pro", pos: "百万上下文", features: "100 万 Token 上下文，跨模态推理强劲", ctx: "1M", output: "64K" },
  { model: "Gemini 2.5 Flash", pos: "高性价比", features: "极低价格 + 深度推理，最佳性价比", ctx: "1M", output: "64K" },
  { model: "DeepSeek V3.2", pos: "开源标杆", features: "开源最强 MoE 模型，编程与推理出色", ctx: "128K", output: "32K" },
  { model: "DeepSeek R1", pos: "推理专精", features: "专为复杂推理设计，数学和逻辑领先", ctx: "128K", output: "32K" },
  { model: "智谱 GLM-5", pos: "国产旗舰", features: "编程对齐 Claude Opus 级别，Agent 能力强", ctx: "200K", output: "128K" },
  { model: "通义千问 3.5", pos: "全能旗舰", features: "阿里最新旗舰，多语言和工具调用突出", ctx: "128K", output: "32K" },
  { model: "Kimi K2.5", pos: "长文本专家", features: "超长上下文理解与生成，中文优化出色", ctx: "200K", output: "64K" },
];

const imageModels = [
  { model: "Midjourney", pos: "艺术创作", features: "业界顶级图像生成，艺术风格丰富", res: "多分辨率" },
  { model: "Nano Banana", pos: "Google 原生", features: "Gemini 原生图像生成，理解力强", res: "最高 4K" },
  { model: "通义万相", pos: "国产领先", features: "图像生成 + 编辑，中文理解优秀", res: "多分辨率" },
  { model: "豆包绘梦 5.0", pos: "字节最新", features: "最新图像生成引擎，效果出色", res: "多分辨率" },
  { model: "Grok 图像", pos: "xAI 出品", features: "Grok 原生图像生成能力", res: "多分辨率" },
  { model: "Flux Kontext", pos: "精准控制", features: "Black Forest Labs 出品，精确编辑", res: "多分辨率" },
];

const videoModels = [
  { model: "Sora 2", pos: "OpenAI 视频", features: "文字生成视频，电影级质量", dur: "最长 60s" },
  { model: "豆包即梦 1.5 Pro", pos: "字节视频", features: "高质量视频生成，快速输出", dur: "最长 10s" },
  { model: "Veo 3.1", pos: "Google 视频", features: "Google 最新视频生成模型", dur: "最长 30s" },
  { model: "通义万相 图生视频", pos: "阿里视频", features: "图片驱动视频生成", dur: "最长 10s" },
];

export default function DocsHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">模型概览</h1>
      <p className="text-muted-foreground mb-10">
        FFapi 支持 100+ 主流 AI 模型，覆盖文本对话、图像生成、视频创作等场景。所有模型均为官方直连，定价 3 折起。
      </p>

      {/* 推荐模型 */}
      <h2 className="text-xl font-semibold mb-4">推荐模型</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <ModelCard name="Claude Opus 4.6" tagline="最强推理旗舰" desc="深度推理与编程能力业界第一，支持百万上下文" />
        <ModelCard name="GPT-5.4" tagline="OpenAI 最新旗舰" desc="复杂推理、编程、多模态理解全面领先" />
        <ModelCard name="Gemini 2.5 Flash" tagline="极致性价比" desc="超低价格 + 百万上下文 + 深度推理" />
        <ModelCard name="DeepSeek V3.2" tagline="开源最强" desc="开源 MoE 标杆，编程与推理不输闭源" />
      </div>

      {/* 文本模型 */}
      <h2 className="text-xl font-semibold mb-2">文本模型</h2>
      <p className="text-sm text-muted-foreground mb-4">
        支持对话、推理、编程、翻译等通用文本任务。兼容 OpenAI Chat Completions API 格式。
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-12">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">模型</th>
              <th className="px-4 py-3 font-medium">定位</th>
              <th className="px-4 py-3 font-medium">特点</th>
              <th className="px-4 py-3 font-medium">上下文</th>
              <th className="px-4 py-3 font-medium">最大输出</th>
            </tr>
          </thead>
          <tbody>
            {textModels.map((m) => (
              <tr key={m.model} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 font-medium whitespace-nowrap">{m.model}</td>
                <td className="px-4 py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{m.pos}</span></td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{m.features}</td>
                <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">{m.ctx}</td>
                <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">{m.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 图像模型 */}
      <h2 className="text-xl font-semibold mb-2">图像生成模型</h2>
      <p className="text-sm text-muted-foreground mb-4">
        支持文本生成图像、图像编辑、风格迁移等。兼容 Images API 格式。
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-12">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">模型</th>
              <th className="px-4 py-3 font-medium">定位</th>
              <th className="px-4 py-3 font-medium">特点</th>
              <th className="px-4 py-3 font-medium">分辨率</th>
            </tr>
          </thead>
          <tbody>
            {imageModels.map((m) => (
              <tr key={m.model} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 font-medium whitespace-nowrap">{m.model}</td>
                <td className="px-4 py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400">{m.pos}</span></td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{m.features}</td>
                <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">{m.res}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 视频模型 */}
      <h2 className="text-xl font-semibold mb-2">视频生成模型</h2>
      <p className="text-sm text-muted-foreground mb-4">
        支持文字生成视频、图片生成视频等多种创作方式。
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-12">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">模型</th>
              <th className="px-4 py-3 font-medium">定位</th>
              <th className="px-4 py-3 font-medium">特点</th>
              <th className="px-4 py-3 font-medium">时长</th>
            </tr>
          </thead>
          <tbody>
            {videoModels.map((m) => (
              <tr key={m.model} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 font-medium whitespace-nowrap">{m.model}</td>
                <td className="px-4 py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">{m.pos}</span></td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{m.features}</td>
                <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">{m.dur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
