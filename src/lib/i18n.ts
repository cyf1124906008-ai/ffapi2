export type Locale = "zh" | "en";

const dict = {
  zh: {
    nav: {
      home: "首页",
      pricing: "定价",
      docs: "文档",
      login: "登录",
      register: "注册",
      console: "控制台",
    },
    hero: {
      badge: "兼容 OpenAI API 格式",
      title: "一站式 AI 模型接入平台",
      subtitle:
        "统一 API 接口调用 GPT-4o、Claude、Gemini、DeepSeek 等主流大模型。更低价格，更高稳定性，无需订阅。",
      cta: "立即开始",
      ctaSecondary: "查看文档",
    },
    models: {
      title: "支持的模型",
      subtitle: "一个 API，调用所有主流大模型",
    },
    features: {
      title: "为什么选择 FFapi",
      subtitle: "专为开发者打造的 AI API 中转服务",
      items: [
        {
          title: "超低价格",
          desc: "官方直连，按量计费。价格低至官方价的 5 折，只为成功请求付费。",
        },
        {
          title: "高稳定性",
          desc: "多渠道负载均衡，自动故障转移。保障 99.9% 可用性，支持高并发。",
        },
        {
          title: "极速响应",
          desc: "全球节点优化，平均首 Token 延迟 < 500ms。流式输出零中断。",
        },
        {
          title: "OpenAI 格式兼容",
          desc: "完全兼容 OpenAI API 格式，只需替换 Base URL 即可无缝切换。",
        },
        {
          title: "多模型支持",
          desc: "覆盖 GPT、Claude、Gemini、DeepSeek、Qwen 等 50+ 模型，统一接口调用。",
        },
        {
          title: "全天候支持",
          desc: "7×24 技术支持，专业团队实时响应，确保业务零中断。",
        },
      ],
    },
    pricing: {
      title: "透明定价",
      subtitle: "按量付费，用多少付多少",
      models: "热门模型定价",
      unit: "/ 百万 tokens",
      inputLabel: "输入",
      outputLabel: "输出",
      cta: "立即充值",
    },
    code: {
      title: "极速接入",
      subtitle: "三行代码，即刻调用",
    },
    footer: {
      desc: "FFapi — 快速、灵活、可靠的 AI API 中转平台",
      product: "产品",
      resources: "资源",
      legal: "法律",
      pricing: "定价",
      docs: "文档",
      status: "服务状态",
      blog: "博客",
      github: "GitHub",
      community: "社区",
      terms: "服务条款",
      privacy: "隐私政策",
      rights: "版权所有",
    },
  },
  en: {
    nav: {
      home: "Home",
      pricing: "Pricing",
      docs: "Docs",
      login: "Login",
      register: "Sign Up",
      console: "Console",
    },
    hero: {
      badge: "OpenAI API Compatible",
      title: "One Platform, All AI Models",
      subtitle:
        "Unified API to access GPT-4o, Claude, Gemini, DeepSeek and more. Lower prices, higher reliability, no subscriptions.",
      cta: "Get Started",
      ctaSecondary: "View Docs",
    },
    models: {
      title: "Supported Models",
      subtitle: "One API for all leading LLMs",
    },
    features: {
      title: "Why FFapi",
      subtitle: "AI API relay service built for developers",
      items: [
        {
          title: "Ultra-Low Cost",
          desc: "Direct upstream access, pay-as-you-go. Up to 50% off official pricing. Pay only for successful requests.",
        },
        {
          title: "High Reliability",
          desc: "Multi-channel load balancing with auto-failover. 99.9% uptime SLA, built for high concurrency.",
        },
        {
          title: "Lightning Fast",
          desc: "Global node optimization, average TTFT < 500ms. Zero interruptions in streaming output.",
        },
        {
          title: "OpenAI Compatible",
          desc: "Fully compatible with OpenAI API format. Just swap the base URL and you're good to go.",
        },
        {
          title: "50+ Models",
          desc: "GPT, Claude, Gemini, DeepSeek, Qwen and more. All accessible through a single unified interface.",
        },
        {
          title: "24/7 Support",
          desc: "Round-the-clock technical support with instant response. Keep your business running non-stop.",
        },
      ],
    },
    pricing: {
      title: "Transparent Pricing",
      subtitle: "Pay-as-you-go, no surprises",
      models: "Popular Model Pricing",
      unit: "/ 1M tokens",
      inputLabel: "Input",
      outputLabel: "Output",
      cta: "Top Up Now",
    },
    code: {
      title: "Quick Integration",
      subtitle: "3 lines of code to get started",
    },
    footer: {
      desc: "FFapi — Fast, Flexible & Reliable AI API Platform",
      product: "Product",
      resources: "Resources",
      legal: "Legal",
      pricing: "Pricing",
      docs: "Docs",
      status: "Status",
      blog: "Blog",
      github: "GitHub",
      community: "Community",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      rights: "All rights reserved",
    },
  },
} as const;

export function t(locale: Locale) {
  return dict[locale];
}
