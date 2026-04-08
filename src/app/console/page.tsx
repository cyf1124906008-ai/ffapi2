import { redirect } from "next/navigation";
import { ConsoleFallback } from "@/components/console/ConsoleFallback";
import { getExternalConsoleUrl, REGISTER_PATH } from "@/lib/auth-links";

export default function ConsolePage() {
  const target = getExternalConsoleUrl();

  if (target) {
    redirect(target);
  }

  return (
    <ConsoleFallback
      eyebrow="FFapi Console"
      title="控制台正在准备中"
      description="文档、模型说明和首页已经可用；控制台入口会在正式接入后自动切换到线上版本。现在如果你想继续了解产品，可以先查看快速开始或模型文档。"
      primaryHref="/docs/quickstart"
      primaryLabel="快速开始"
      secondaryHref={REGISTER_PATH}
      secondaryLabel="注册入口说明"
    />
  );
}
