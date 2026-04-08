import { redirect } from "next/navigation";
import { ConsoleFallback } from "@/components/console/ConsoleFallback";
import { getExternalAuthUrl, LOGIN_PATH } from "@/lib/auth-links";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const target = getExternalAuthUrl("/register");

  if (target) {
    redirect(target);
  }

  return (
    <ConsoleFallback
      eyebrow="Console Access"
      title="控制台注册即将开放"
      description="当前官网已经不会再跳到本地开发地址。等控制台正式接入后，这里会自动进入线上注册流程；在这之前，你可以先查看接入文档和模型说明。"
      primaryHref="/docs/quickstart"
      primaryLabel="快速开始"
      secondaryHref={LOGIN_PATH}
      secondaryLabel="查看登录页"
    />
  );
}
