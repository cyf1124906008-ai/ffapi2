import Link from "next/link";
import { redirect } from "next/navigation";
import { getExternalAuthUrl, LOGIN_PATH } from "@/lib/auth-links";

export default function RegisterPage() {
  const target = getExternalAuthUrl("/register");

  if (target) {
    redirect(target);
  }

  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-24 text-white">
      <div className="mx-auto max-w-xl rounded-[28px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/35">
          Console Pending
        </p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">
          控制台注册地址暂未配置
        </h1>
        <p className="mb-8 text-sm leading-7 text-white/60">
          现在会优先跳转到你配置的正式控制台域名，不会再落到
          <code className="mx-1 rounded bg-white/8 px-1.5 py-0.5 text-white/80">
            localhost:3001
          </code>
          。如果还没部署控制台，可以先查看文档，或者稍后补上
          <code className="mx-1 rounded bg-white/8 px-1.5 py-0.5 text-white/80">
            NEXT_PUBLIC_APP_URL
          </code>
          。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/quickstart"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            快速开始
          </Link>
          <Link
            href={LOGIN_PATH}
            className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/25 hover:text-white"
          >
            前往登录引导
          </Link>
        </div>
      </div>
    </main>
  );
}
