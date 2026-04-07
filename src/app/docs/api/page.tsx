"use client";

import { ParamTable, CodeTabs, CodeBlock, Callout } from "@/components/docs/DocComponents";

export default function ApiReference() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">API 参考</h1>
      <p className="text-muted-foreground mb-10">
        FFapi 完全兼容 OpenAI API 格式。以下是核心端点的详细说明。
      </p>

      {/* 基本信息 */}
      <h2 className="text-xl font-semibold mb-4">基本信息</h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-8">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-white/[0.04]">
              <td className="px-4 py-2.5 font-medium w-32">Base URL</td>
              <td className="px-4 py-2.5 font-mono text-xs text-emerald-300">https://你的域名/v1</td>
            </tr>
            <tr className="border-b border-white/[0.04]">
              <td className="px-4 py-2.5 font-medium">认证方式</td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">Authorization: Bearer YOUR_API_KEY</td>
            </tr>
            <tr className="border-b border-white/[0.04]">
              <td className="px-4 py-2.5 font-medium">Content-Type</td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">application/json</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">响应格式</td>
              <td className="px-4 py-2.5 text-xs text-muted-foreground">JSON（流式为 SSE text/event-stream）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 对话补全 */}
      <h2 className="text-xl font-semibold mb-1">对话补全</h2>
      <p className="text-sm text-muted-foreground mb-4">
        <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-xs text-blue-300">POST /v1/chat/completions</code> — 核心端点，支持所有文本模型。
      </p>

      <h3 className="text-base font-semibold mb-3">请求参数</h3>
      <ParamTable params={[
        { name: "model", type: "string", required: true, desc: "模型标识符，如 gpt-4o、claude-sonnet-4-6" },
        { name: "messages", type: "array", required: true, desc: "对话消息列表，支持 system / user / assistant / tool 四种角色" },
        { name: "stream", type: "boolean", required: false, default: "false", desc: "是否启用 SSE 流式输出" },
        { name: "temperature", type: "number", required: false, default: "1.0", desc: "采样温度 [0.0 - 2.0]，越高越随机" },
        { name: "top_p", type: "number", required: false, default: "1.0", desc: "核采样参数 [0.0 - 1.0]" },
        { name: "max_tokens", type: "integer", required: false, desc: "最大输出 Token 数，不设则由模型决定" },
        { name: "tools", type: "array", required: false, desc: "可用工具/函数列表（Function Calling）" },
        { name: "tool_choice", type: "string", required: false, default: "auto", desc: "工具选择策略：auto / none / required" },
        { name: "response_format", type: "object", required: false, desc: "输出格式，设为 {\"type\": \"json_object\"} 可强制 JSON 输出" },
        { name: "n", type: "integer", required: false, default: "1", desc: "生成几个候选回复" },
        { name: "stop", type: "string|array", required: false, desc: "停止生成的标记" },
      ]} />

      <h3 className="text-base font-semibold mt-8 mb-3">messages 角色说明</h3>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">角色</th>
              <th className="px-4 py-3 font-medium">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-blue-300">system</td><td className="px-4 py-2.5 text-xs text-muted-foreground">系统消息，设定 AI 的行为和角色（可选）</td></tr>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-blue-300">user</td><td className="px-4 py-2.5 text-xs text-muted-foreground">用户消息（必须至少有一条）</td></tr>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-blue-300">assistant</td><td className="px-4 py-2.5 text-xs text-muted-foreground">AI 回复，用于多轮对话时传入历史</td></tr>
            <tr><td className="px-4 py-2.5 font-mono text-xs text-blue-300">tool</td><td className="px-4 py-2.5 text-xs text-muted-foreground">工具调用结果（Function Calling 返回）</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-base font-semibold mb-3">请求示例</h3>
      <CodeTabs tabs={[
        {
          label: "基础调用", lang: "json",
          code: `{
  "model": "gpt-4o",
  "messages": [
    {"role": "system", "content": "你是一个有帮助的助手。"},
    {"role": "user", "content": "什么是量子计算？"}
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}`,
        },
        {
          label: "流式调用", lang: "json",
          code: `{
  "model": "claude-sonnet-4-6",
  "messages": [
    {"role": "user", "content": "写一首关于春天的诗"}
  ],
  "stream": true
}`,
        },
        {
          label: "多轮对话", lang: "json",
          code: `{
  "model": "gemini-2.5-flash",
  "messages": [
    {"role": "system", "content": "你是一位Python专家。"},
    {"role": "user", "content": "如何读取CSV文件？"},
    {"role": "assistant", "content": "你可以使用 pandas 库..."},
    {"role": "user", "content": "如果文件很大怎么办？"}
  ]
}`,
        },
        {
          label: "Function Calling", lang: "json",
          code: `{
  "model": "gpt-4o",
  "messages": [
    {"role": "user", "content": "北京今天天气怎么样？"}
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "获取指定城市的天气信息",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {"type": "string", "description": "城市名称"}
          },
          "required": ["city"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}`,
        },
      ]} />

      <h3 className="text-base font-semibold mt-8 mb-3">响应格式</h3>
      <CodeBlock lang="json" code={`{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "量子计算是一种利用量子力学原理进行计算的技术..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}`} />

      <h3 className="text-base font-semibold mt-8 mb-3">finish_reason 值说明</h3>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-8">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-blue-300 w-40">stop</td><td className="px-4 py-2.5 text-xs text-muted-foreground">正常结束</td></tr>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-blue-300">length</td><td className="px-4 py-2.5 text-xs text-muted-foreground">达到 max_tokens 限制</td></tr>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-blue-300">tool_calls</td><td className="px-4 py-2.5 text-xs text-muted-foreground">模型请求调用工具</td></tr>
            <tr><td className="px-4 py-2.5 font-mono text-xs text-blue-300">content_filter</td><td className="px-4 py-2.5 text-xs text-muted-foreground">内容被安全过滤</td></tr>
          </tbody>
        </table>
      </div>

      {/* 其他端点 */}
      <h2 className="text-xl font-semibold mt-12 mb-4">其他端点</h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">端点</th>
              <th className="px-4 py-3 font-medium">方法</th>
              <th className="px-4 py-3 font-medium">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-emerald-300">/v1/chat/completions</td><td className="px-4 py-2.5 text-xs">POST</td><td className="px-4 py-2.5 text-xs text-muted-foreground">对话补全（核心端点）</td></tr>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-emerald-300">/v1/embeddings</td><td className="px-4 py-2.5 text-xs">POST</td><td className="px-4 py-2.5 text-xs text-muted-foreground">文本向量嵌入</td></tr>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-emerald-300">/v1/images/generations</td><td className="px-4 py-2.5 text-xs">POST</td><td className="px-4 py-2.5 text-xs text-muted-foreground">图像生成</td></tr>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-emerald-300">/v1/audio/speech</td><td className="px-4 py-2.5 text-xs">POST</td><td className="px-4 py-2.5 text-xs text-muted-foreground">文字转语音</td></tr>
            <tr className="border-b border-white/[0.04]"><td className="px-4 py-2.5 font-mono text-xs text-emerald-300">/v1/audio/transcriptions</td><td className="px-4 py-2.5 text-xs">POST</td><td className="px-4 py-2.5 text-xs text-muted-foreground">语音转文字</td></tr>
            <tr><td className="px-4 py-2.5 font-mono text-xs text-emerald-300">/v1/models</td><td className="px-4 py-2.5 text-xs">GET</td><td className="px-4 py-2.5 text-xs text-muted-foreground">获取可用模型列表</td></tr>
          </tbody>
        </table>
      </div>

      <Callout type="info">
        所有端点均兼容 OpenAI 官方 API 格式。如果你已经在使用 OpenAI SDK，只需替换 base_url 和 api_key 即可无缝迁移。
      </Callout>
    </div>
  );
}
