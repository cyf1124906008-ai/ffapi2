"use client";
export default function VideoModelsPage() {
  return (
    <div>
      <p className="text-[13px] text-blue-600 dark:text-blue-400 font-medium mb-2">模型介绍</p>
      <h1 className="text-3xl font-bold mb-3">视频生成模型</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">支持文字生成视频、图片生成视频等多种视频创作方式。</p>
      {[
        { name: "Sora 2", vendor: "OpenAI", desc: "OpenAI 推出的视频生成模型，可以根据文字描述生成最长 60 秒的高质量视频。支持多种分辨率和宽高比，画面流畅自然，物理效果真实。", dur: "最长 60s", res: "最高 1080p" },
        { name: "Sora 2 Pro", vendor: "OpenAI", desc: "Sora 2 的增强版本，画面质量更高，运动更自然。适合商业级视频制作。", dur: "最长 60s", res: "最高 4K" },
        { name: "豆包即梦 1.5 Pro (Seedance)", vendor: "字节跳动", desc: "字节跳动视频生成模型，生成速度快，质量稳定。支持文生视频和图生视频两种模式。适合短视频创作和营销素材制作。", dur: "最长 10s", res: "最高 1080p" },
        { name: "Veo 3.1", vendor: "Google", desc: "Google 最新视频生成模型，画面细腻，运动自然。可以生成具有电影感的高质量视频片段。", dur: "最长 30s", res: "最高 1080p" },
        { name: "通义万相 图生视频 (wan2.6-i2v)", vendor: "阿里巴巴", desc: "阿里巴巴的图像驱动视频生成模型，输入一张静态图片，生成自然的运动视频。适合产品展示、创意动画等场景。", dur: "最长 10s", res: "最高 720p" },
      ].map((m) => (
        <div key={m.name} className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 mb-4">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
            <div><h3 className="text-[16px] font-semibold">{m.name}</h3><p className="text-[12px] text-gray-400">{m.vendor}</p></div>
            <div className="flex gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">{m.dur}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-500">{m.res}</span>
            </div>
          </div>
          <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-[1.8]">{m.desc}</p>
        </div>
      ))}
    </div>
  );
}
