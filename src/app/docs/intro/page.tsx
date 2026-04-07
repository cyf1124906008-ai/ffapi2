"use client";

import { Callout } from "@/components/docs/DocComponents";

export default function IntroPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">开始使用</p>
      <h1 className="text-3xl font-bold mb-3">平台介绍</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">FFapi：一站式 AI 模型接入平台</p>

      {/* Logo 区域 */}
      <div className="flex items-center justify-center rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] py-8 mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-lg font-bold text-white shadow-lg">
            FF
          </div>
          <span className="text-3xl font-bold">FFapi</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">平台定位</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-8">
        FFapi 是一个统一的 AI 模型中转平台，提供功能丰富、灵活易用、高性价比的大模型 API 服务。
        通过 FFapi，你可以用一个 API Key 调用来自 OpenAI、Anthropic、Google、DeepSeek、智谱等
        多家厂商的 100+ AI 模型，无需分别注册和管理多个平台账号。FFapi 致力于构建高效通用的
        "一站式模型即服务" AI 开发新范式。
      </p>

      <h2 className="text-xl font-semibold mb-4">平台优势</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: "🔌", title: "统一接口", desc: "完全兼容 OpenAI API 格式，一个 Key 调用所有模型。已有项目只需替换 Base URL 即可无缝迁移。" },
          { icon: "💰", title: "超低价格", desc: "所有模型定价官方 3 折起，只为成功请求付费。多档分组折扣叠加，旗舰版低至官方 2.1 折。" },
          { icon: "⚡", title: "高性能", desc: "全球节点优化，平均首 Token 延迟 < 500ms。多渠道负载均衡，自动故障转移，99.9% 可用性。" },
          { icon: "🛡️", title: "安全可靠", desc: "所有请求官方直连，不缓存用户数据。完整的令牌权限管理、用量监控和消费日志。" },
          { icon: "🎯", title: "模型丰富", desc: "覆盖文本对话、代码生成、图像创作、视频生成、语音识别等全场景，持续跟进最新模型。" },
          { icon: "🔧", title: "开发友好", desc: "兼容所有 OpenAI 生态工具链：LangChain、LlamaIndex、Vercel AI SDK、Cherry Studio 等。" },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-5">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h3 className="text-[14px] font-semibold mb-2">{item.title}</h3>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-[1.7]">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">支持的模型厂商</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">
        FFapi 目前接入了以下 AI 模型厂商的 API，覆盖文本、图像、视频、语音等全模态：
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/[0.08] mb-10">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/[0.08] text-left bg-gray-50 dark:bg-white/[0.02] text-gray-500">
              <th className="px-4 py-3 font-medium">厂商</th>
              <th className="px-4 py-3 font-medium">代表模型</th>
              <th className="px-4 py-3 font-medium">模态</th>
              <th className="px-4 py-3 font-medium">模型数量</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-300">
            {[
              { vendor: "OpenAI", models: "GPT-5.4、GPT-4o、Codex、Sora", modal: "文本 / 图像 / 视频", count: "14" },
              { vendor: "Anthropic", models: "Claude Opus 4.6、Sonnet 4.6、Haiku 4.5", modal: "文本", count: "14" },
              { vendor: "Google", models: "Gemini 3.1 Pro、2.5 Flash、Veo", modal: "文本 / 图像 / 视频", count: "27" },
              { vendor: "DeepSeek", models: "V3.2、R1 推理", modal: "文本", count: "5" },
              { vendor: "智谱 AI", models: "GLM-5.1、GLM-5、GLM-4.7", modal: "文本", count: "7" },
              { vendor: "通义千问", models: "Qwen 3.5、万相图像/视频", modal: "文本 / 图像 / 视频", count: "15" },
              { vendor: "字节豆包", models: "Seed 2.0、绘梦 5.0、即梦 1.5", modal: "文本 / 图像 / 视频", count: "16" },
              { vendor: "xAI", models: "Grok 4", modal: "文本 / 图像", count: "4" },
              { vendor: "Moonshot", models: "Kimi K2.5", modal: "文本", count: "3" },
              { vendor: "更多", models: "MiniMax、MiMo、Midjourney、Flux", modal: "多模态", count: "9" },
            ].map((row) => (
              <tr key={row.vendor} className="border-b border-gray-100 dark:border-white/[0.04]">
                <td className="px-4 py-2.5 font-medium">{row.vendor}</td>
                <td className="px-4 py-2.5">{row.models}</td>
                <td className="px-4 py-2.5">{row.modal}</td>
                <td className="px-4 py-2.5 text-center">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-4">适用场景</h2>
      <ul className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] space-y-2 mb-8">
        <li><strong className="text-gray-900 dark:text-gray-100">AI 应用开发</strong> — 聊天机器人、智能客服、内容生成等应用接入多模型能力</li>
        <li><strong className="text-gray-900 dark:text-gray-100">AI Agent / 工作流</strong> — 构建多步骤 Agent，利用 Function Calling 编排工具链</li>
        <li><strong className="text-gray-900 dark:text-gray-100">RAG 知识库</strong> — 结合向量检索和大模型生成，搭建企业知识问答系统</li>
        <li><strong className="text-gray-900 dark:text-gray-100">代码辅助</strong> — 利用 Codex / Claude Opus 级别模型提升开发效率</li>
        <li><strong className="text-gray-900 dark:text-gray-100">多媒体创作</strong> — 图像生成（Midjourney / DALL·E）、视频制作（Sora / Veo）</li>
        <li><strong className="text-gray-900 dark:text-gray-100">学术研究</strong> — 多模型对比评估、Prompt 工程实验</li>
      </ul>

      <Callout type="tip" title="下一步">
        准备好了吗？前往 <a href="/docs/quickstart" className="text-blue-600 dark:text-blue-400 underline">快速开始</a> 完成注册并发起你的第一个 API 调用。
      </Callout>
    </div>
  );
}
