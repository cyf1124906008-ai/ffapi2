"use client";

import { Callout } from "@/components/docs/DocComponents";

const pricing = [
  { model: "GPT-4o", input: "$0.75", output: "$3.00" },
  { model: "GPT-4o Mini", input: "$0.045", output: "$0.18" },
  { model: "GPT-5.4", input: "$0.75", output: "$4.80" },
  { model: "GPT-5.4 Pro", input: "$9.00", output: "$36.00" },
  { model: "Claude Sonnet 4.6", input: "$0.90", output: "$4.50" },
  { model: "Claude Opus 4.6", input: "$4.50", output: "$22.50" },
  { model: "Gemini 2.5 Flash", input: "$0.045", output: "$0.36" },
  { model: "Gemini 2.5 Pro", input: "$0.375", output: "$3.00" },
  { model: "DeepSeek V3.2", input: "$0.08", output: "$0.24" },
  { model: "DeepSeek R1", input: "$0.17", output: "$0.68" },
  { model: "智谱 GLM-5", input: "$0.15", output: "$0.60" },
  { model: "通义千问 3.5", input: "$0.09", output: "$0.54" },
  { model: "Grok 4", input: "$0.90", output: "$3.60" },
  { model: "Kimi K2.5", input: "$0.30", output: "$1.20" },
];

export default function PricingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">定价说明</h1>
      <p className="text-muted-foreground mb-10">
        FFapi 采用按量付费模式，所有模型定价为官方价的 <strong className="text-foreground">3 折</strong>。
      </p>

      {/* 分组折扣 */}
      <h2 className="text-xl font-semibold mb-4">用户分组</h2>
      <p className="text-sm text-muted-foreground mb-4">不同分组享受不同折扣，在 3 折基础上进一步优惠：</p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">分组</th>
              <th className="px-4 py-3 font-medium">名称</th>
              <th className="px-4 py-3 font-medium">折扣</th>
              <th className="px-4 py-3 font-medium">实际价格</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/[0.04]">
              <td className="px-4 py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06]">default</span></td>
              <td className="px-4 py-2.5">标准版</td>
              <td className="px-4 py-2.5 text-muted-foreground">无额外折扣</td>
              <td className="px-4 py-2.5 font-medium text-emerald-400">官方 3 折</td>
            </tr>
            <tr className="border-b border-white/[0.04]">
              <td className="px-4 py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">vip</span></td>
              <td className="px-4 py-2.5">专业版</td>
              <td className="px-4 py-2.5 text-muted-foreground">额外 85 折</td>
              <td className="px-4 py-2.5 font-medium text-emerald-400">官方 2.55 折</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400">svip</span></td>
              <td className="px-4 py-2.5">旗舰版</td>
              <td className="px-4 py-2.5 text-muted-foreground">额外 7 折</td>
              <td className="px-4 py-2.5 font-medium text-emerald-400">官方 2.1 折</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 模型价格表 */}
      <h2 className="text-xl font-semibold mb-4">热门模型定价（标准版）</h2>
      <p className="text-sm text-muted-foreground mb-4">以下价格为标准版（default 分组）每百万 Token 价格：</p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">模型</th>
              <th className="px-4 py-3 font-medium text-right">输入 / 1M tokens</th>
              <th className="px-4 py-3 font-medium text-right">输出 / 1M tokens</th>
            </tr>
          </thead>
          <tbody>
            {pricing.map((p) => (
              <tr key={p.model} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 font-medium">{p.model}</td>
                <td className="px-4 py-2.5 text-right font-mono text-emerald-400">{p.input}</td>
                <td className="px-4 py-2.5 text-right font-mono text-emerald-400">{p.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="info">
        费用按 Token 计算，输入和输出分别计费。新注册用户赠送 <strong>$1.00</strong> 免费额度。完整实时价格请查看控制台模型广场。
      </Callout>

      <h2 className="text-xl font-semibold mt-10 mb-4">计费规则</h2>
      <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
        <li>只为<strong className="text-foreground">成功请求</strong>付费，失败请求不扣费</li>
        <li>流式和非流式请求按相同标准计费</li>
        <li>图像生成模型按<strong className="text-foreground">张</strong>计费，不按 Token</li>
        <li>视频生成模型按<strong className="text-foreground">秒</strong>计费</li>
        <li>余额不足时请求会返回 402 错误</li>
      </ul>
    </div>
  );
}
