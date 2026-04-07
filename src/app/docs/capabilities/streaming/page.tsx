"use client";
import { CodeBlock, Callout } from "@/components/docs/DocComponents";
export default function StreamingPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">模型能力</p>
      <h1 className="text-3xl font-bold mb-3">流式输出</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">逐 Token 实时返回结果，减少等待时间，提升用户体验。</p>

      <h2 className="text-xl font-semibold mb-4">工作原理</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-6">
        流式输出基于 <strong className="text-gray-900 dark:text-gray-100">Server-Sent Events (SSE)</strong> 协议。当 <code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">stream</code> 设为 <code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">true</code> 时，
        服务器不会等到完整响应生成后一次性返回，而是每生成一个 Token 就立即推送给客户端。
        这使得用户可以"边生成边阅读"，大幅降低首次响应的感知延迟。
      </p>

      <h2 className="text-xl font-semibold mb-4">请求方式</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">在请求体中添加 <code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">{`"stream": true`}</code>：</p>
      <CodeBlock lang="json" code={`{
  "model": "claude-sonnet-4-6",
  "messages": [{"role": "user", "content": "写一篇关于人工智能的文章"}],
  "stream": true
}`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">SSE 数据格式</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">每个 SSE 事件包含一个 JSON 对象：</p>
      <CodeBlock lang="text" code={`data: {"id":"chatcmpl-xxx","choices":[{"index":0,"delta":{"content":"人工"},"finish_reason":null}]}

data: {"id":"chatcmpl-xxx","choices":[{"index":0,"delta":{"content":"智能"},"finish_reason":null}]}

data: {"id":"chatcmpl-xxx","choices":[{"index":0,"delta":{"content":"是"},"finish_reason":null}]}

data: {"id":"chatcmpl-xxx","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: [DONE]`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Python 示例</h2>
      <CodeBlock lang="python" code={`stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "写一首诗"}],
    stream=True
)

full_response = ""
for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        full_response += content
        print(content, end="", flush=True)

# full_response 包含完整回复
print()
print(f"完整回复长度: {len(full_response)} 字符")`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">Node.js 示例</h2>
      <CodeBlock lang="javascript" code={`const stream = await client.chat.completions.create({
  model: "gemini-2.5-flash",
  messages: [{ role: "user", content: "写一首诗" }],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) process.stdout.write(content);
}`} />

      <Callout type="info">
        流式和非流式请求按相同标准计费，不会因为使用流式而产生额外费用。
      </Callout>
    </div>
  );
}
