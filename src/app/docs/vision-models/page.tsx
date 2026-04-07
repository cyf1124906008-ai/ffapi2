"use client";
export default function VisionModelsPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">模型介绍</p>
      <h1 className="text-3xl font-bold mb-3">视觉理解模型</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">支持图像理解、OCR、图表分析等视觉任务。在 messages 中传入图像 URL 即可使用。</p>
      {[
        { name: "GPT-4o", desc: "OpenAI 多模态旗舰，支持图像、视频帧、文档截图的理解和分析。可以识别图表、读取文字、理解场景，并结合文本进行推理。", usage: '{"role":"user","content":[{"type":"text","text":"描述这张图片"},{"type":"image_url","image_url":{"url":"https://..."}}]}' },
        { name: "Claude Opus/Sonnet 4.6", desc: "Anthropic 视觉模型，支持高分辨率图像输入。在文档理解、代码截图分析、设计稿审查等方面表现优异。支持多图对比分析。", usage: '同 GPT-4o 格式，messages 中传入 image_url 类型' },
        { name: "Gemini 2.5 Pro/Flash", desc: "Google 视觉理解模型，支持图像和视频输入。百万上下文允许同时处理大量图片。在 OCR、图表数据提取方面表现突出。", usage: '同 OpenAI 格式，支持 image_url 和 video_url' },
        { name: "Qwen 3 VL Plus", desc: "通义千问视觉增强版，支持中文 OCR、文档理解、图像问答。对中文场景（菜单、合同、身份证等）识别率高。", usage: '同 OpenAI 格式' },
      ].map((m) => (
        <div key={m.name} className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 mb-4">
          <h3 className="text-[16px] font-semibold mb-2">{m.name}</h3>
          <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-[1.8] mb-3">{m.desc}</p>
          <p className="text-[12px] text-gray-400"><strong>调用方式：</strong>{m.usage}</p>
        </div>
      ))}
    </div>
  );
}
