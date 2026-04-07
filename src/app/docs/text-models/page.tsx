"use client";
export default function TextModelsPage() {
  const models = [
    { name: "GPT-5.4", vendor: "OpenAI", pos: "最新旗舰", ctx: "128K", output: "32K", desc: "OpenAI 当前最强模型，在复杂推理、数学、编程、多语言任务上全面领先。支持 Function Calling、JSON Mode、Vision 等全部能力。适合对质量要求最高的场景。" },
    { name: "GPT-5.4 Pro", vendor: "OpenAI", pos: "顶级专业", ctx: "128K", output: "32K", desc: "GPT-5.4 的增强版本，拥有更深层的推理能力和更高的一致性。适合科研分析、法律审查、医疗咨询等专业领域。价格较高，建议按需使用。" },
    { name: "GPT-4o", vendor: "OpenAI", pos: "多模态旗舰", ctx: "128K", output: "16K", desc: "OpenAI 的多模态旗舰模型，支持文本、图像、音频的统一理解和生成。响应速度快，性价比高，是日常使用的优选。" },
    { name: "GPT-4o Mini", vendor: "OpenAI", pos: "轻量高速", ctx: "128K", output: "16K", desc: "GPT-4o 的轻量版，价格极低（$0.045/1M tokens），延迟极小。适合大批量处理、实时对话、分类打标等对成本敏感的场景。" },
    { name: "Claude Opus 4.6", vendor: "Anthropic", pos: "最强推理", ctx: "200K", output: "128K", desc: "Anthropic 最新旗舰模型，在深度推理、长文本理解、代码生成等方面业界领先。支持 200K 超长上下文和 128K 输出，非常适合复杂的 Agent 任务和代码工程。" },
    { name: "Claude Sonnet 4.6", vendor: "Anthropic", pos: "均衡之选", ctx: "200K", output: "64K", desc: "速度与智能的最佳平衡。日常对话、内容创作、代码辅助的首选。价格适中，响应快速，支持深度推理（thinking）模式。" },
    { name: "Claude Haiku 4.5", vendor: "Anthropic", pos: "极速版", ctx: "200K", output: "32K", desc: "Claude 系列中最快的模型，延迟极低。适合实时对话、分类任务、简单问答等对速度要求高的场景。" },
    { name: "Gemini 2.5 Pro", vendor: "Google", pos: "百万上下文", ctx: "1M", output: "64K", desc: "Google 最强模型，支持 100 万 Token 的超长上下文。跨模态推理能力突出，适合处理超长文档、大型代码库分析等场景。" },
    { name: "Gemini 2.5 Flash", vendor: "Google", pos: "极致性价比", ctx: "1M", output: "64K", desc: "价格最低的高性能模型之一（$0.045/1M tokens），同时支持百万上下文和深度推理。是性价比之王，强烈推荐。" },
    { name: "DeepSeek V3.2", vendor: "DeepSeek", pos: "开源标杆", ctx: "128K", output: "32K", desc: "开源 MoE 架构模型，在编程、数学推理方面接近甚至超越部分闭源模型。价格极低，适合追求性价比的开发者。" },
    { name: "DeepSeek R1", vendor: "DeepSeek", pos: "推理专精", ctx: "128K", output: "32K", desc: "专为复杂推理场景设计，在数学竞赛、逻辑推理、科学问题上表现突出。采用 Chain-of-Thought 推理模式。" },
    { name: "GLM-5", vendor: "智谱 AI", pos: "国产旗舰", ctx: "200K", output: "128K", desc: "智谱最新旗舰模型，编程能力对齐 Claude Opus 级别。擅长 Agent 长程规划与执行，200K 超长上下文。" },
    { name: "通义千问 3.5", vendor: "阿里巴巴", pos: "全能旗舰", ctx: "128K", output: "32K", desc: "阿里巴巴最新旗舰大模型，在多语言理解、工具调用、长文本生成方面表现优异。" },
    { name: "Kimi K2.5", vendor: "Moonshot", pos: "长文本专家", ctx: "200K", output: "64K", desc: "月之暗面出品，擅长超长文本的理解和生成，中文优化出色。适合文档分析、内容创作等场景。" },
    { name: "Grok 4", vendor: "xAI", pos: "极速推理", ctx: "128K", output: "32K", desc: "xAI 出品的高速推理模型，响应速度极快。在代码生成和实时对话场景表现优异。" },
  ];

  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">模型介绍</p>
      <h1 className="text-3xl font-bold mb-3">文本模型</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">支持对话、推理、编程、翻译、摘要等通用文本任务。所有模型均兼容 OpenAI Chat Completions API 格式。</p>

      <div className="space-y-6">
        {models.map((m) => (
          <div key={m.name} className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
              <div>
                <h3 className="text-[16px] font-semibold">{m.name}</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">{m.vendor}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-medium">{m.pos}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-500 font-mono">ctx: {m.ctx}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-500 font-mono">out: {m.output}</span>
              </div>
            </div>
            <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-[1.8]">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
