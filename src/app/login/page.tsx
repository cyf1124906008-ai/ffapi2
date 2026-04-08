import { redirect } from "next/navigation";
import { ConsoleFallback } from "@/components/console/ConsoleFallback";
import { getExternalAuthUrl, REGISTER_PATH } from "@/lib/auth-links";

export default function LoginPage() {
  const target = getExternalAuthUrl("/login");

  if (target) {
    redirect(target);
  }

  return (
    <ConsoleFallback
      eyebrow="Console Access"
      title="控制台登录即将开放"
      description="当前官网已经不会再跳到本地开发地址。等控制台正式接入后，这里会自动带你进入线上登录页；在这之前，你可以先继续浏览文档和接入说明。"
      primaryHref="/docs"
      primaryLabel="查看文档"
      secondaryHref={REGISTER_PATH}
      secondaryLabel="查看注册页"
    />
  );
}
