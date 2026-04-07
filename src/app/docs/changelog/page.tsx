"use client";
export default function ChangelogPage() {
  const logs = [
    { date: "2026-04-01", title: "文档站上线", items: ["全新文档站上线，包含平台介绍、快速开始、API 参考、模型介绍等完整文档", "支持亮色/暗色主题切换"] },
    { date: "2026-03-31", title: "平台上线", items: [
      "FFapi 平台正式上线",
      "接入 114 个 AI 模型，覆盖 10+ 厂商",
      "支持 OpenAI、Anthropic、Google、DeepSeek、智谱、通义千问、字节豆包等",
      "所有模型定价官方 3 折",
      "三档用户分组：标准版 / 专业版 / 旗舰版",
      "新用户注册赠送 $1.00 免费额度",
    ]},
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">更新日志</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-10">FFapi 平台的功能更新和变更记录。</p>

      <div className="space-y-10">
        {logs.map((log) => (
          <div key={log.date} className="relative pl-8 border-l-2 border-gray-200 dark:border-white/10">
            <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
            <p className="text-[13px] text-gray-400 font-mono mb-1">{log.date}</p>
            <h3 className="text-[16px] font-semibold mb-3">{log.title}</h3>
            <ul className="text-[14px] text-gray-600 dark:text-gray-300 space-y-1.5 list-disc list-inside">
              {log.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
