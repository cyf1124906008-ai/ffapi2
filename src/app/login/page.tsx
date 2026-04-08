import Link from "next/link";
import { redirect } from "next/navigation";
import { getExternalAuthUrl, REGISTER_PATH } from "@/lib/auth-links";

export default function LoginPage() {
  const target = getExternalAuthUrl("/login");

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
          控制台登录地址暂未配置
        </h1>
        <p className="mb-8 text-sm leading-7 text-white/60">
          当前站点已经不再跳转到本地开发地址。等你把正式控制台域名配置到
          <code className="mx-1 rounded bg-white/8 px-1.5 py-0.5 text-white/80">
            NEXT_PUBLIC_APP_URL
          </code>
          后，这里会自动跳转到线上登录页。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            查看文档
          </Link>
          <Link
            href={REGISTER_PATH}
            className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/25 hover:text-white"
          >
            前往注册引导
          </Link>
        </div>
      </div>
    </main>
  );
}
