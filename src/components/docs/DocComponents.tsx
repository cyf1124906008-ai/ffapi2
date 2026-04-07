"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";

/* 代码块 */
export function CodeBlock({ code, lang = "" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden my-5 bg-[#fafafa] dark:bg-[#0d0d14]">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/[0.08] px-4 py-2">
        <span className="text-[11px] text-gray-400 font-mono">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          {copied ? <><Check className="h-3 w-3" /> 已复制</> : <><Copy className="h-3 w-3" /> 复制</>}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
        <code className="text-gray-800 dark:text-emerald-300/80 font-mono">{code}</code>
      </pre>
    </div>
  );
}

/* 多 Tab 代码面板 */
export function CodeTabs({ tabs }: { tabs: { label: string; lang: string; code: string }[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(tabs[active].code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden my-5 bg-[#fafafa] dark:bg-[#0d0d14]">
      <div className="flex items-center border-b border-gray-200 dark:border-white/[0.08]">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-[12px] font-medium transition-colors relative ${
              active === i
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            {t.label}
            {active === i && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-500" />}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={copy} className="px-4 flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          {copied ? <><Check className="h-3 w-3" /> 已复制</> : <><Copy className="h-3 w-3" /> 复制</>}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
        <code className="text-gray-800 dark:text-emerald-300/80 font-mono">{tabs[active].code}</code>
      </pre>
    </div>
  );
}

/* 提示框 */
export function Callout({ type = "info", title, children }: { type?: "info" | "warn" | "tip"; title?: string; children: ReactNode }) {
  const styles = {
    info: "border-blue-200 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/[0.06]",
    warn: "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.06]",
    tip: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06]",
  };
  const textStyles = {
    info: "text-blue-800 dark:text-blue-200",
    warn: "text-amber-800 dark:text-amber-200",
    tip: "text-emerald-800 dark:text-emerald-200",
  };
  const icons = { info: "💡", warn: "⚠️", tip: "✅" };
  return (
    <div className={`rounded-xl border px-5 py-4 my-5 text-[13px] leading-relaxed ${styles[type]}`}>
      {title && <p className={`font-semibold mb-1 ${textStyles[type]}`}>{icons[type]} {title}</p>}
      <div className={textStyles[type]}>
        {!title && <span className="mr-1.5">{icons[type]}</span>}
        {children}
      </div>
    </div>
  );
}

/* 推荐模型卡片 */
export function ModelCard({ name, tagline, desc }: { name: string; tagline: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-5 hover:border-blue-300 dark:hover:border-blue-500/30 hover:shadow-sm transition-all">
      <h3 className="text-[14px] font-semibold mb-1">{name}</h3>
      <p className="text-[12px] text-blue-600 dark:text-blue-400 mb-2 font-medium">{tagline}</p>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

/* 步骤条 */
export function Step({ num, title, children }: { num: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 mb-10 relative">
      {/* 连接线 */}
      <div className="absolute left-4 top-10 bottom-0 w-px bg-gray-200 dark:bg-white/10" />
      <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-[13px] font-bold relative z-10">
        {num}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <h3 className="text-[17px] font-semibold mb-3">{title}</h3>
        <div className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.8] space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

/* 折叠面板 */
export function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-[14px] font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5 text-[14px] text-gray-600 dark:text-gray-300 leading-[1.8]">
          {children}
        </div>
      )}
    </div>
  );
}

/* 参数表格 */
export function ParamTable({ params }: { params: { name: string; type: string; required: boolean; default?: string; desc: string }[] }) {
  return (
    <div className="overflow-x-auto my-5 rounded-xl border border-gray-200 dark:border-white/[0.08]">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-white/[0.08] text-left text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/[0.02]">
            <th className="px-4 py-3 font-medium">参数</th>
            <th className="px-4 py-3 font-medium">类型</th>
            <th className="px-4 py-3 font-medium">必填</th>
            <th className="px-4 py-3 font-medium">默认值</th>
            <th className="px-4 py-3 font-medium">说明</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-gray-100 dark:border-white/[0.04] hover:bg-gray-50 dark:hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-300 text-[12px] font-medium">{p.name}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-gray-500">{p.type}</td>
              <td className="px-4 py-3 text-[12px]">{p.required ? <span className="text-amber-600 dark:text-amber-400 font-medium">是</span> : <span className="text-gray-400">否</span>}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-gray-400">{p.default || "—"}</td>
              <td className="px-4 py-3 text-[12px] text-gray-600 dark:text-gray-300">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Badge 标签 */
export function Badge({ children, color = "blue" }: { children: ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    purple: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    gray: "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-gray-400",
  };
  return (
    <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
}
