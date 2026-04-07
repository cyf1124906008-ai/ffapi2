"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { ThemeProvider, useTheme } from "@/components/providers/theme-provider";

const nav = [
  {
    group: "开始使用",
    items: [
      { title: "平台介绍", href: "/docs/intro" },
      { title: "模型概览", href: "/docs" },
      { title: "快速开始", href: "/docs/quickstart" },
      { title: "核心参数", href: "/docs/api" },
    ],
  },
  {
    group: "开发指南",
    items: [
      { title: "HTTP API", href: "/docs/dev-guide/http" },
      { title: "Python SDK", href: "/docs/dev-guide/python" },
      { title: "OpenAI 兼容", href: "/docs/dev-guide/openai-compat" },
    ],
  },
  {
    group: "模型介绍",
    items: [
      { title: "文本模型", href: "/docs/text-models" },
      { title: "视觉模型", href: "/docs/vision-models" },
      { title: "图像生成模型", href: "/docs/image-models" },
      { title: "视频生成模型", href: "/docs/video-models" },
    ],
  },
  {
    group: "模型能力",
    items: [
      { title: "流式输出", href: "/docs/capabilities/streaming" },
      { title: "函数调用", href: "/docs/capabilities/function-calling" },
      { title: "JSON 模式", href: "/docs/capabilities/json-mode" },
    ],
  },
  {
    group: "定价与计费",
    items: [
      { title: "定价说明", href: "/docs/pricing" },
    ],
  },
  {
    group: "更多",
    items: [
      { title: "第三方客户端", href: "/docs/clients" },
      { title: "常见问题", href: "/docs/faq" },
      { title: "更新日志", href: "/docs/changelog" },
    ],
  },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors" title="切换主题">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-5">
      {nav.map((g) => (
        <div key={g.group}>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 px-3">
            {g.group}
          </p>
          <ul className="space-y-0.5">
            {g.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-[13px] transition-all ${
                      active
                        ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-500/10 dark:text-blue-400"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/5"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function DocsLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const allItems = nav.flatMap((g) => g.items);
  const idx = allItems.findIndex((i) => i.href === pathname);
  const prev = idx > 0 ? allItems[idx - 1] : null;
  const next = idx < allItems.length - 1 ? allItems[idx + 1] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c0e] text-gray-900 dark:text-gray-100">
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0c0e]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white">
                FF
              </div>
              <span className="font-bold text-[15px]">FFapi</span>
            </Link>

            {/* 顶部 Tab */}
            <div className="hidden sm:flex items-center gap-1 ml-6 text-[13px]">
              {[
                { label: "使用指南", href: "/docs", active: true },
                { label: "API 文档", href: "/docs/api", active: false },
                { label: "定价", href: "/docs/pricing", active: false },
              ].map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    pathname === tab.href || (tab.href === "/docs" && pathname.startsWith("/docs") && !["/docs/api", "/docs/pricing"].includes(pathname))
                      ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-500/10 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-[13px]">
            <ThemeToggle />
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">首页</Link>
            <Link
              href="/console"
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[13px] font-medium hover:bg-blue-700 transition-colors"
            >
              控制台
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[1400px] lg:flex">
        {/* 侧边栏 */}
        <aside className="hidden lg:block lg:w-60 shrink-0 border-r border-gray-100 dark:border-white/[0.06] py-6 pr-4 pl-6">
          <div className="sticky top-20">
            <Sidebar pathname={pathname} />
          </div>
        </aside>

        {/* 移动端侧边栏 */}
        {mobileOpen && (
          <div className="fixed inset-0 top-14 z-40 bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-xl lg:hidden p-6 overflow-y-auto">
            <Sidebar pathname={pathname} />
          </div>
        )}

        {/* 主内容 */}
        <main className="flex-1 min-w-0 py-8 px-6 lg:px-12 max-w-4xl">
          <article className="docs-content">
            {children}
          </article>

          {/* 底部翻页 */}
          <div className="mt-16 pt-6 border-t border-gray-100 dark:border-white/[0.06] flex justify-between text-[13px]">
            {prev ? (
              <Link href={prev.href} className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                ← {prev.title}
              </Link>
            ) : <div />}
            {next ? (
              <Link href={next.href} className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {next.title} →
              </Link>
            ) : <div />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <DocsLayoutInner>{children}</DocsLayoutInner>
    </ThemeProvider>
  );
}
