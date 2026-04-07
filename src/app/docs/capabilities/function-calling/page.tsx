"use client";
import { CodeBlock, Callout } from "@/components/docs/DocComponents";
export default function FunctionCallingPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">模型能力</p>
      <h1 className="text-3xl font-bold mb-3">函数调用 (Function Calling)</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">让模型调用外部工具和 API，实现天气查询、数据库操作、网络搜索等能力。</p>

      <h2 className="text-xl font-semibold mb-4">工作流程</h2>
      <div className="space-y-3 mb-8">
        {["1. 你在请求中定义可用的工具（函数名、参数描述）", "2. 模型分析用户意图，决定是否需要调用工具", "3. 如果需要，模型返回 tool_calls 指定要调用的函数和参数", "4. 你的代码执行对应函数，将结果作为 tool 消息回传给模型", "5. 模型根据工具返回的结果生成最终回复"].map((step) => (
          <div key={step} className="flex items-start gap-3">
            <div className="shrink-0 h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-[11px] text-blue-600 dark:text-blue-400 font-bold">{step.charAt(0)}</div>
            <p className="text-[14px] text-gray-600 dark:text-gray-300 pt-0.5">{step.slice(3)}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">完整示例</h2>
      <h3 className="text-base font-semibold mb-3">第一步：定义工具并发送请求</h3>
      <CodeBlock lang="python" code={`import json
from openai import OpenAI

client = OpenAI(api_key="你的FFapi令牌", base_url="https://你的域名/v1")

# 定义可用工具
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的当前天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称，如'北京'、'上海'"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "温度单位"
                    }
                },
                "required": ["city"]
            }
        }
    }
]

# 发送请求
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}],
    tools=tools,
    tool_choice="auto"
)

message = response.choices[0].message
print("模型决策:", message.tool_calls)  # 模型决定调用 get_weather`} />

      <h3 className="text-base font-semibold mb-3 mt-6">第二步：执行函数并回传结果</h3>
      <CodeBlock lang="python" code={`# 模拟执行函数
def get_weather(city, unit="celsius"):
    # 这里调用真实的天气 API
    return {"city": city, "temperature": 22, "condition": "晴", "unit": unit}

# 解析模型返回的工具调用
tool_call = message.tool_calls[0]
args = json.loads(tool_call.function.arguments)
result = get_weather(**args)

# 将结果回传给模型
final_response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "北京今天天气怎么样？"},
        message,  # 包含 tool_calls 的 assistant 消息
        {
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result, ensure_ascii=False)
        }
    ],
    tools=tools
)

print(final_response.choices[0].message.content)
# 输出: 北京今天天气晴朗，气温 22°C，适合出行！`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">支持的模型</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">以下模型支持 Function Calling：</p>
      <ul className="text-[14px] text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside mb-4">
        <li><strong>OpenAI</strong> — GPT-4o、GPT-5.4 全系列</li>
        <li><strong>Anthropic</strong> — Claude Sonnet 4.6、Claude Opus 4.6 全系列</li>
        <li><strong>Google</strong> — Gemini 2.5 Pro/Flash、Gemini 3.x 系列</li>
        <li><strong>智谱</strong> — GLM-5、GLM-4.7</li>
        <li><strong>DeepSeek</strong> — V3.2</li>
      </ul>

      <Callout type="warn" title="注意事项">
        不是所有模型都支持 Function Calling。轻量模型（如 GPT-4o Mini、Gemini Flash Lite）可能不支持或效果较差。建议使用 GPT-4o 及以上级别的模型。
      </Callout>
    </div>
  );
}
