"use client";

import { CodeBlock, Callout } from "@/components/docs/DocComponents";

const clients = [
  {
    category: "桌面客户端",
    items: [
      { name: "Cherry Studio", desc: "全功能 AI 客户端，支持多模型切换", steps: "设置 → API 提供商 → 添加 → 类型选 OpenAI → 填入 FFapi 地址和令牌" },
      { name: "ChatBox", desc: "简洁强大的 AI 对话客户端", steps: "设置 → AI 模型提供商 → OpenAI API Compatible → 填入地址和令牌" },
      { name: "Cursor", desc: "AI 编程 IDE，支持自定义模型", steps: "Settings → Models → OpenAI API Key → 填入令牌，Base URL 填 FFapi 地址" },
      { name: "Windsurf", desc: "AI 编程编辑器", steps: "Settings → AI → Custom API → 填入 FFapi 地址和令牌" },
    ],
  },
  {
    category: "Web 客户端",
    items: [
      { name: "LobeChat", desc: "开源 AI 聊天框架", steps: "设置 → 模型服务商 → OpenAI → 自定义端点 → 填入 FFapi 地址和令牌" },
      { name: "NextChat (ChatGPT Next Web)", desc: "一键部署的 AI 聊天应用", steps: "设置 → 接口地址填 FFapi 地址，API Key 填令牌" },
      { name: "Open WebUI", desc: "自部署 AI 前端", steps: "Admin → Settings → Connections → 添加 OpenAI 连接，填入 FFapi 地址和令牌" },
    ],
  },
  {
    category: "开发框架",
    items: [
      { name: "LangChain (Python)", desc: "最流行的 LLM 应用框架", steps: "" },
      { name: "LlamaIndex", desc: "RAG 和数据增强框架", steps: "" },
      { name: "Vercel AI SDK", desc: "Vercel 出品的 AI 开发工具包", steps: "" },
      { name: "Dify", desc: "开源 LLM 应用开发平台", steps: "设置 → 模型供应商 → OpenAI-API-compatible → 填入 FFapi 信息" },
    ],
  },
];

export default function ClientsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">第三方客户端接入</h1>
      <p className="text-muted-foreground mb-6">
        FFapi 兼容 OpenAI API 格式，以下客户端和框架均可直接使用。
      </p>

      <Callout type="tip">
        通用设置：Base URL 填 <code className="bg-white/[0.06] px-1 rounded text-emerald-300 text-xs">https://你的域名/v1</code>，API Key 填你的 FFapi 令牌。
      </Callout>

      <div className="space-y-10 mt-8">
        {clients.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-xl font-semibold mb-4">{cat.category}</h2>
            <div className="space-y-3">
              {cat.items.map((item) => (
                <div key={item.name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  {item.steps && <p className="text-xs text-muted-foreground mt-2">👉 {item.steps}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-12 mb-4">框架代码示例</h2>

      <h3 className="text-base font-semibold mb-2">LangChain</h3>
      <CodeBlock lang="python" code={`from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://你的域名/v1",
    api_key="你的FFapi令牌",
    model="gpt-4o",
)

response = llm.invoke("什么是机器学习？")
print(response.content)`} />

      <h3 className="text-base font-semibold mt-6 mb-2">Vercel AI SDK</h3>
      <CodeBlock lang="typescript" code={`import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const ffapi = createOpenAI({
  baseURL: "https://你的域名/v1",
  apiKey: "你的FFapi令牌",
});

const { text } = await generateText({
  model: ffapi("claude-sonnet-4-6"),
  prompt: "什么是机器学习？",
});

console.log(text);`} />

      <h3 className="text-base font-semibold mt-6 mb-2">LlamaIndex</h3>
      <CodeBlock lang="python" code={`from llama_index.llms.openai_like import OpenAILike

llm = OpenAILike(
    api_base="https://你的域名/v1",
    api_key="你的FFapi令牌",
    model="gemini-2.5-flash",
)

response = llm.complete("什么是机器学习？")
print(response.text)`} />
    </div>
  );
}
