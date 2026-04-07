"use client";

import { CodeBlock, Callout, ParamTable } from "@/components/docs/DocComponents";

export default function HttpApiPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">开发指南</p>
      <h1 className="text-3xl font-bold mb-3">HTTP API</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">
        标准 RESTful API，支持所有编程语言和开发框架。
      </p>

      <h2 className="text-xl font-semibold mb-4">认证方式</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">
        FFapi 使用 Bearer Token 认证。在每个 HTTP 请求的 Header 中携带你的 API Key：
      </p>
      <CodeBlock lang="http" code={`Authorization: Bearer YOUR_API_KEY`} />

      <Callout type="warn" title="安全提示">
        请勿将 API Key 硬编码在前端代码中。生产环境中应通过环境变量或后端代理传递密钥。
      </Callout>

      <h2 className="text-xl font-semibold mb-4 mt-10">Base URL</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">
        所有 API 请求发送到以下基础地址：
      </p>
      <CodeBlock lang="text" code={`https://你的域名/v1`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">请求格式</h2>
      <ul className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] space-y-2 mb-6">
        <li>请求方法：<code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">POST</code>（对话补全、图像生成等）或 <code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">GET</code>（模型列表）</li>
        <li>Content-Type：<code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">application/json</code></li>
        <li>字符编码：UTF-8</li>
        <li>响应格式：JSON（流式为 SSE <code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">text/event-stream</code>）</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4 mt-10">完整请求示例</h2>
      <CodeBlock lang="bash" code={`curl -X POST "https://你的域名/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的助手。"},
      {"role": "user", "content": "你好，请介绍一下自己。"}
    ],
    "temperature": 0.7,
    "stream": false
  }'`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">完整响应示例</h2>
      <CodeBlock lang="json" code={`{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1711234567,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "你好！我是一个 AI 助手，由 OpenAI 开发。我可以帮你回答问题、编写代码、翻译文本、分析数据等。有什么我可以帮你的吗？"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 42,
    "total_tokens": 67
  }
}`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">错误处理</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">
        当请求失败时，API 返回标准的 HTTP 错误状态码和 JSON 错误信息：
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/[0.08] mb-6">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/[0.08] text-left bg-gray-50 dark:bg-white/[0.02] text-gray-500">
              <th className="px-4 py-3 font-medium">状态码</th>
              <th className="px-4 py-3 font-medium">含义</th>
              <th className="px-4 py-3 font-medium">常见原因</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-300">
            <tr className="border-b border-gray-100 dark:border-white/[0.04]"><td className="px-4 py-2.5 font-mono font-medium">400</td><td className="px-4 py-2.5">请求格式错误</td><td className="px-4 py-2.5">参数缺失、JSON 格式错误、模型名不存在</td></tr>
            <tr className="border-b border-gray-100 dark:border-white/[0.04]"><td className="px-4 py-2.5 font-mono font-medium">401</td><td className="px-4 py-2.5">认证失败</td><td className="px-4 py-2.5">API Key 无效、未提供、已被禁用</td></tr>
            <tr className="border-b border-gray-100 dark:border-white/[0.04]"><td className="px-4 py-2.5 font-mono font-medium">402</td><td className="px-4 py-2.5">余额不足</td><td className="px-4 py-2.5">账户额度已耗尽，请充值</td></tr>
            <tr className="border-b border-gray-100 dark:border-white/[0.04]"><td className="px-4 py-2.5 font-mono font-medium">429</td><td className="px-4 py-2.5">请求过多</td><td className="px-4 py-2.5">触发速率限制，请降低并发</td></tr>
            <tr><td className="px-4 py-2.5 font-mono font-medium">500</td><td className="px-4 py-2.5">服务器错误</td><td className="px-4 py-2.5">上游服务异常，请稍后重试</td></tr>
          </tbody>
        </table>
      </div>

      <CodeBlock lang="json" code={`{
  "error": {
    "message": "Incorrect API key provided: sk-xxxx.",
    "type": "invalid_request_error",
    "code": "invalid_api_key"
  }
}`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">速率限制</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">
        FFapi 默认不对用户施加严格的速率限制。如遇到 429 错误，建议：
      </p>
      <ul className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] space-y-1 mb-4 list-disc list-inside">
        <li>在代码中添加<strong className="text-gray-900 dark:text-gray-100">指数退避重试</strong>机制</li>
        <li>控制并发请求数，避免瞬时大量请求</li>
        <li>使用<strong className="text-gray-900 dark:text-gray-100">流式输出</strong>减少长时间占用连接</li>
        <li>如有高并发需求，联系管理员提升限额</li>
      </ul>

      <Callout type="info">
        所有 API 端点的详细参数说明请参阅 <a href="/docs/api" className="text-blue-600 dark:text-blue-400 underline">核心参数</a> 页面。
      </Callout>
    </div>
  );
}
