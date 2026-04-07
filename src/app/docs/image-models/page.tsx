"use client";
import { CodeBlock } from "@/components/docs/DocComponents";
export default function ImageModelsPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">模型介绍</p>
      <h1 className="text-3xl font-bold mb-3">图像生成模型</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">支持文本生成图像、图像编辑、风格迁移等创作任务。</p>
      {[
        { name: "Midjourney", vendor: "Midjourney", desc: "业界顶级图像生成模型，艺术风格丰富，细节表现力极强。通过 FFapi 的 Midjourney 代理接口调用，支持 imagine（生成）、upscale（放大）、variation（变体）等全部功能。", pricing: "按张计费" },
        { name: "Nano Banana (Gemini 3 Pro Image)", vendor: "Google", desc: "Google Gemini 原生图像生成能力，理解力强，能更好地遵循复杂提示词。支持最高 4K 分辨率输出，多种尺寸可选。", pricing: "按 Token 计费" },
        { name: "通义万相 (qwen-image-max)", vendor: "阿里巴巴", desc: "阿里巴巴图像生成模型，中文提示词理解优秀。支持图像生成和图像编辑两种模式，适合中文场景的创意设计。", pricing: "按张计费" },
        { name: "豆包绘梦 5.0 (Seedream)", vendor: "字节跳动", desc: "字节跳动最新图像生成引擎，画面细腻，色彩丰富。支持多种风格和分辨率，生成速度快。", pricing: "按张计费" },
        { name: "Flux Kontext Max", vendor: "Black Forest Labs", desc: "精确控制型图像生成模型，擅长图像编辑和局部修改。可以根据参考图精确生成指定内容。", pricing: "按张计费" },
        { name: "Grok Imagine", vendor: "xAI", desc: "xAI 出品的图像生成能力，可以生成创意图像和艺术作品。", pricing: "按张计费" },
      ].map((m) => (
        <div key={m.name} className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div><h3 className="text-[16px] font-semibold">{m.name}</h3><p className="text-[12px] text-gray-400">{m.vendor}</p></div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">{m.pricing}</span>
          </div>
          <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-[1.8]">{m.desc}</p>
        </div>
      ))}
      <h2 className="text-xl font-semibold mb-4 mt-8">调用示例</h2>
      <CodeBlock lang="python" code={`response = client.images.generate(
    model="dall-e-3",      # 或其他图像模型
    prompt="一只穿着宇航服的柴犬站在月球表面，背景是地球，超写实风格",
    size="1024x1024",
    quality="hd",
    n=1
)
print(response.data[0].url)`} />
    </div>
  );
}
