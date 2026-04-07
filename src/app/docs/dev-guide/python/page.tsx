"use client";
import { CodeBlock, Callout } from "@/components/docs/DocComponents";

export default function PythonSdkPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">开发指南</p>
      <h1 className="text-3xl font-bold mb-3">Python SDK</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">使用 OpenAI 官方 Python SDK 接入 FFapi，提供完整的类型提示和异步支持。</p>

      <h2 className="text-xl font-semibold mb-4">安装 SDK</h2>
      <CodeBlock lang="bash" code={`pip install openai`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">验证安装</h2>
      <CodeBlock lang="bash" code={`python -c "import openai; print(openai.__version__)"`} />

      <h2 className="text-xl font-semibold mb-4 mt-8">基础用法</h2>
      <CodeBlock lang="python" code={`from openai import OpenAI

client = OpenAI(
    api_key="你的FFapi令牌",        # 在控制台创建的令牌
    base_url="https://你的域名/v1"   # FFapi 的 Base URL
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "什么是量子计算？"}
    ],
    temperature=0.7,
    max_tokens=1024
)

print(response.choices[0].message.content)`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">流式输出</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">流式模式逐 Token 返回结果，适合实时对话场景：</p>
      <CodeBlock lang="python" code={`stream = client.chat.completions.create(
    model="claude-sonnet-4-6",
    messages=[{"role": "user", "content": "写一首关于春天的诗"}],
    stream=True
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">异步调用</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">OpenAI SDK 原生支持 asyncio 异步调用：</p>
      <CodeBlock lang="python" code={`import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI(
    api_key="你的FFapi令牌",
    base_url="https://你的域名/v1"
)

async def main():
    response = await async_client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=[{"role": "user", "content": "你好"}]
    )
    print(response.choices[0].message.content)

asyncio.run(main())`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">多轮对话</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">传入完整的消息历史实现多轮对话：</p>
      <CodeBlock lang="python" code={`messages = [
    {"role": "system", "content": "你是一位 Python 专家。"},
    {"role": "user", "content": "如何读取 CSV 文件？"},
]

# 第一轮
response = client.chat.completions.create(model="gpt-4o", messages=messages)
assistant_msg = response.choices[0].message.content
print("AI:", assistant_msg)

# 第二轮 — 追加历史
messages.append({"role": "assistant", "content": assistant_msg})
messages.append({"role": "user", "content": "如果文件很大怎么办？"})

response = client.chat.completions.create(model="gpt-4o", messages=messages)
print("AI:", response.choices[0].message.content)`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">图像生成</h2>
      <CodeBlock lang="python" code={`response = client.images.generate(
    model="dall-e-3",     # 或 midjourney 等
    prompt="一只在月光下散步的猫，水彩画风格",
    size="1024x1024",
    n=1
)

print(response.data[0].url)`} />

      <h2 className="text-xl font-semibold mb-4 mt-10">环境变量配置</h2>
      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.9] mb-4">推荐通过环境变量传递密钥，避免硬编码：</p>
      <CodeBlock lang="bash" code={`export OPENAI_API_KEY="你的FFapi令牌"
export OPENAI_BASE_URL="https://你的域名/v1"`} />
      <CodeBlock lang="python" code={`# 设置环境变量后，SDK 会自动读取，无需显式传参
from openai import OpenAI
client = OpenAI()  # 自动使用环境变量

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "你好"}]
)`} />

      <Callout type="tip">
        FFapi 完全兼容 OpenAI Python SDK 的所有功能，包括 function calling、JSON mode、vision 等。详见各能力页面。
      </Callout>
    </div>
  );
}
