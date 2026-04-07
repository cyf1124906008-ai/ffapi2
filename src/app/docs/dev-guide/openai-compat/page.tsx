"use client";
import { CodeBlock, Callout } from "@/components/docs/DocComponents";

export default function OpenAICompatPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">开发指南</p>
      <h1 className="text-3xl font-bold mb-3">OpenAI API 兼容</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">FFapi 完全兼容 OpenAI API 格式，已有项目迁移只需改两行代码。</p>

      <h2 className="text-xl font-semibold mb-4">迁移指南</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">
        如果你的项目已经在使用 OpenAI API，迁移到 FFapi 只需要修改两个参数：
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/[0.08] mb-6">
        <table className="w-full text-[13px]">
          <thead><tr className="border-b border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] text-gray-500"><th className="px-4 py-3 font-medium text-left">参数</th><th className="px-4 py-3 font-medium text-left">原值（OpenAI）</th><th className="px-4 py-3 font-medium text-left">新值（FFapi）</th></tr></thead>
          <tbody className="text-gray-600 dark:text-gray-300">
            <tr className="border-b border-gray-100 dark:border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-[12px]">api_key</td><td className="px-4 py-2.5 font-mono text-[12px]">sk-proj-xxx（OpenAI Key）</td><td className="px-4 py-2.5 font-mono text-[12px]">你的 FFapi 令牌</td></tr>
            <tr><td className="px-4 py-2.5 font-mono text-[12px]">base_url</td><td className="px-4 py-2.5 font-mono text-[12px]">https://api.openai.com/v1</td><td className="px-4 py-2.5 font-mono text-[12px]">https://你的域名/v1</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-base font-semibold mb-3">迁移前</h3>
      <CodeBlock lang="python" code={`from openai import OpenAI

client = OpenAI(
    api_key="sk-proj-xxxxx"     # OpenAI 官方 Key
    # base_url 默认是 https://api.openai.com/v1
)`} />

      <h3 className="text-base font-semibold mb-3 mt-6">迁移后</h3>
      <CodeBlock lang="python" code={`from openai import OpenAI

client = OpenAI(
    api_key="你的FFapi令牌",            # 改这里
    base_url="https://你的域名/v1"       # 加这行
)

# 其他代码完全不用改！model 参数保持不变`} />

      <Callout type="tip" title="零代码迁移">
        如果你使用环境变量配置，只需修改环境变量即可，代码无需任何改动。
      </Callout>

      <h2 className="text-xl font-semibold mb-4 mt-10">兼容性说明</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">
        FFapi 兼容以下 OpenAI API 功能：
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/[0.08] mb-6">
        <table className="w-full text-[13px]">
          <thead><tr className="border-b border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] text-gray-500"><th className="px-4 py-3 font-medium text-left">功能</th><th className="px-4 py-3 font-medium text-left">兼容状态</th><th className="px-4 py-3 font-medium text-left">备注</th></tr></thead>
          <tbody className="text-gray-600 dark:text-gray-300">
            {[
              ["Chat Completions", "✅ 完全兼容", "支持所有文本模型"],
              ["Streaming (SSE)", "✅ 完全兼容", "stream=true"],
              ["Function Calling / Tools", "✅ 完全兼容", "支持 GPT / Claude 工具调用"],
              ["JSON Mode", "✅ 完全兼容", "response_format: json_object"],
              ["Vision (图像理解)", "✅ 完全兼容", "支持 GPT-4o / Gemini / Claude"],
              ["Images Generation", "✅ 完全兼容", "DALL·E / Midjourney"],
              ["Embeddings", "✅ 完全兼容", "text-embedding-3-small 等"],
              ["Audio (TTS/STT)", "✅ 完全兼容", "语音合成和识别"],
              ["Models List", "✅ 完全兼容", "GET /v1/models"],
              ["Assistants API", "❌ 不支持", "请使用 Chat Completions 替代"],
              ["Batch API", "❌ 不支持", "请使用并发请求替代"],
              ["Fine-tuning", "❌ 不支持", "请在原厂商平台进行微调"],
            ].map(([feat, status, note]) => (
              <tr key={feat} className="border-b border-gray-100 dark:border-white/[0.04]"><td className="px-4 py-2.5 font-medium">{feat}</td><td className="px-4 py-2.5">{status}</td><td className="px-4 py-2.5">{note}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-10">跨模型调用</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">
        FFapi 的最大优势是你可以用同一套 OpenAI SDK 代码调用任何厂商的模型，只需改 <code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">model</code> 参数：
      </p>
      <CodeBlock lang="python" code={`# 同一个 client，调用不同厂商的模型
response = client.chat.completions.create(
    model="gpt-4o",              # OpenAI
    # model="claude-opus-4-6",   # Anthropic
    # model="gemini-2.5-flash",  # Google
    # model="deepseek-v3.2-251201",  # DeepSeek
    # model="glm-5",             # 智谱
    messages=[{"role": "user", "content": "你好"}]
)`} />
    </div>
  );
}
