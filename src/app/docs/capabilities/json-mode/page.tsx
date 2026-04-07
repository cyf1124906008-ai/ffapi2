"use client";
import { CodeBlock, Callout } from "@/components/docs/DocComponents";
export default function JsonModePage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">模型能力</p>
      <h1 className="text-3xl font-bold mb-3">JSON 模式</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">强制模型输出有效的 JSON 格式，适合结构化数据提取和 API 集成。</p>

      <h2 className="text-xl font-semibold mb-4">使用方法</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">在请求中设置 <code className="bg-gray-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">response_format</code> 参数：</p>
      <CodeBlock lang="python" code={`response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个数据提取助手，请始终返回 JSON 格式。"},
        {"role": "user", "content": "从以下文本中提取人名、公司和职位：张三是腾讯的高级工程师，李四在阿里巴巴担任产品经理。"}
    ],
    response_format={"type": "json_object"}
)`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">输出示例</h2>
      <CodeBlock lang="json" code={`{
  "people": [
    {
      "name": "张三",
      "company": "腾讯",
      "position": "高级工程师"
    },
    {
      "name": "李四",
      "company": "阿里巴巴",
      "position": "产品经理"
    }
  ]
}`} />

      <Callout type="warn" title="重要提示">
        使用 JSON 模式时，<strong>必须在 system 或 user 消息中明确提到 &quot;JSON&quot;</strong>，否则模型可能不会生成有效的 JSON。建议在 system prompt 中说明期望的 JSON 结构。
      </Callout>

      <h2 className="text-xl font-semibold mb-4 mt-8">适用场景</h2>
      <ul className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] space-y-2">
        <li><strong className="text-gray-900 dark:text-gray-100">数据提取</strong> — 从非结构化文本中提取结构化信息</li>
        <li><strong className="text-gray-900 dark:text-gray-100">API 集成</strong> — 生成符合特定 schema 的数据供下游系统消费</li>
        <li><strong className="text-gray-900 dark:text-gray-100">分类打标</strong> — 输出分类结果和置信度</li>
        <li><strong className="text-gray-900 dark:text-gray-100">多步推理</strong> — 结构化输出中间推理过程</li>
      </ul>
    </div>
  );
}
