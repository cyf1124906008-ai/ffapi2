"use client";

import { Step, CodeTabs, Callout, ModelCard } from "@/components/docs/DocComponents";

export default function QuickStart() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">快速开始</h1>
      <p className="text-muted-foreground mb-10">
        5 分钟完成接入，开始调用 100+ AI 模型。
      </p>

      <Step num={1} title="注册账号">
        <p>
          访问 <a href="/console" className="text-blue-400 hover:underline">FFapi 控制台</a>，使用邮箱注册一个账号。注册后系统会赠送 <strong className="text-foreground">$1.00</strong> 免费额度。
        </p>
      </Step>

      <Step num={2} title="获取 API Key">
        <p>
          登录控制台后，进入 <strong className="text-foreground">令牌管理</strong> 页面，点击「添加令牌」创建一个新的 API Key。
        </p>
        <Callout type="warn">
          请妥善保管你的 API Key，不要泄露给他人或提交到公开仓库中。如果密钥泄露，请立即在控制台删除并重新创建。
        </Callout>
      </Step>

      <Step num={3} title="选择模型">
        <p>根据你的需求选择合适的模型：</p>
        <div className="grid gap-3 sm:grid-cols-2 mt-3">
          <ModelCard name="GPT-5.4" tagline="最新旗舰 · 复杂推理" desc="适合需要最强智能的场景" />
          <ModelCard name="Claude Sonnet 4.6" tagline="均衡之选 · 日常首选" desc="速度和智能的最佳平衡" />
          <ModelCard name="Gemini 2.5 Flash" tagline="极致性价比 · 推荐" desc="价格最低，支持百万上下文" />
          <ModelCard name="DeepSeek V3.2" tagline="开源最强 · 编程出色" desc="开源模型的天花板" />
        </div>
      </Step>

      <Step num={4} title="发起调用">
        <p>
          FFapi 完全兼容 <strong className="text-foreground">OpenAI API 格式</strong>，只需替换 <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-xs text-emerald-300">base_url</code> 和 <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-xs text-emerald-300">api_key</code> 即可。
        </p>
        <CodeTabs tabs={[
          {
            label: "Python",
            lang: "python",
            code: `from openai import OpenAI

client = OpenAI(
    api_key="你的FFapi令牌",       # 控制台创建的令牌
    base_url="https://你的域名/v1"  # 替换为实际域名
)

response = client.chat.completions.create(
    model="gpt-4o",  # 可替换为任意支持的模型
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "你好，请介绍一下自己。"}
    ],
    stream=True  # 支持流式输出
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`,
          },
          {
            label: "Node.js",
            lang: "javascript",
            code: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "你的FFapi令牌",
  baseURL: "https://你的域名/v1",
});

const response = await client.chat.completions.create({
  model: "claude-sonnet-4-6",
  messages: [
    { role: "system", content: "你是一个有帮助的助手。" },
    { role: "user", content: "你好，请介绍一下自己。" },
  ],
});

console.log(response.choices[0].message.content);`,
          },
          {
            label: "cURL",
            lang: "bash",
            code: `curl -X POST "https://你的域名/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer 你的FFapi令牌" \\
  -d '{
    "model": "gemini-2.5-flash",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的助手。"},
      {"role": "user", "content": "你好，请介绍一下自己。"}
    ],
    "stream": true
  }'`,
          },
        ]} />
        <Callout type="tip">
          任何兼容 OpenAI API 的 SDK 或框架都可以直接使用，包括 LangChain、LlamaIndex、Vercel AI SDK 等。
        </Callout>
      </Step>

      <Step num={5} title="验证调用">
        <p>如果一切正常，你会收到类似以下的响应：</p>
        <CodeTabs tabs={[{
          label: "响应示例",
          lang: "json",
          code: `{
  "id": "chatcmpl-xxx",
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "你好！我是一个 AI 助手，很高兴为你服务。"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 18,
    "total_tokens": 43
  }
}`,
        }]} />
      </Step>

      {/* 探索更多 */}
      <h2 className="text-xl font-semibold mt-12 mb-4">探索更多</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <a href="/docs/api" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/15 hover:bg-white/[0.04] transition-all">
          <h3 className="text-sm font-semibold mb-1">API 参考</h3>
          <p className="text-xs text-muted-foreground">完整的参数说明和请求格式</p>
        </a>
        <a href="/docs/models" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/15 hover:bg-white/[0.04] transition-all">
          <h3 className="text-sm font-semibold mb-1">支持的模型</h3>
          <p className="text-xs text-muted-foreground">查看全部 100+ 可用模型</p>
        </a>
        <a href="/docs/clients" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/15 hover:bg-white/[0.04] transition-all">
          <h3 className="text-sm font-semibold mb-1">第三方客户端</h3>
          <p className="text-xs text-muted-foreground">Cherry Studio、Cursor、LobeChat 等接入指南</p>
        </a>
      </div>
    </div>
  );
}
