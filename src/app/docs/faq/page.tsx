"use client";

import { Accordion, CodeBlock } from "@/components/docs/DocComponents";

export default function FaqPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">常见问题</h1>
      <p className="text-muted-foreground mb-10">
        使用过程中遇到的常见问题和解决方案。
      </p>

      <h2 className="text-xl font-semibold mb-4">接入相关</h2>
      <div className="mb-8">
        <Accordion title="FFapi 和直接用官方 API 有什么区别？">
          <p>FFapi 是一个 API 中转服务，你通过 FFapi 调用和直接调用官方 API 的效果完全一致。区别在于：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>更低价格</strong> — 官方 3 折起</li>
            <li><strong>统一接口</strong> — 一个 Key 调用所有模型，不用分别注册多个平台</li>
            <li><strong>兼容格式</strong> — 全部兼容 OpenAI API 格式，切换模型只需改 model 参数</li>
            <li><strong>高可用</strong> — 多渠道负载均衡，自动故障转移</li>
          </ul>
        </Accordion>

        <Accordion title="支持流式输出（Streaming）吗？">
          <p>支持。在请求中设置 <code className="bg-white/[0.06] px-1 rounded text-emerald-300 text-xs">{`"stream": true`}</code> 即可启用 SSE 流式输出。所有文本模型均支持流式。</p>
        </Accordion>

        <Accordion title="支持 Function Calling / Tool Use 吗？">
          <p>支持。OpenAI 和 Claude 的 function calling、tool use 均可正常使用。在请求中传入 <code className="bg-white/[0.06] px-1 rounded text-emerald-300 text-xs">tools</code> 参数即可。</p>
        </Accordion>

        <Accordion title="可以用在生产环境吗？">
          <p>可以。FFapi 采用多渠道负载均衡和自动故障转移机制，保障 99.9% 可用性。我们有多个用户在生产环境中稳定使用。</p>
        </Accordion>
      </div>

      <h2 className="text-xl font-semibold mb-4">常见错误</h2>
      <div className="mb-8">
        <Accordion title="401 Unauthorized — 认证失败">
          <p>API Key 无效或未填写。请检查：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>请求头中是否包含 <code className="bg-white/[0.06] px-1 rounded text-emerald-300 text-xs">Authorization: Bearer YOUR_KEY</code></li>
            <li>Key 是否拼写正确（前后有无多余空格）</li>
            <li>Key 是否已在控制台被禁用或删除</li>
          </ul>
        </Accordion>

        <Accordion title="402 Payment Required — 余额不足">
          <p>账户余额已用完。请前往控制台充值页面进行充值。</p>
        </Accordion>

        <Accordion title="429 Too Many Requests — 请求过多">
          <p>触发了频率限制。建议：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>降低并发请求数</li>
            <li>添加指数退避重试逻辑</li>
            <li>联系管理员提升限额</li>
          </ul>
        </Accordion>

        <Accordion title="模型返回空内容">
          <p>通常是 <code className="bg-white/[0.06] px-1 rounded text-emerald-300 text-xs">max_tokens</code> 设置过小导致。建议设置为 1024 或以上。部分模型（如推理模型）可能需要更大的输出 Token 额度。</p>
        </Accordion>

        <Accordion title="连接超时或请求慢">
          <p>可能原因和解决方案：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>网络问题</strong> — 检查你的网络到 FFapi 服务器的连通性</li>
            <li><strong>模型较慢</strong> — 大参数模型（如 Opus）首 Token 延迟较高，属于正常现象</li>
            <li><strong>并发过高</strong> — 降低并发数或切换到更快的模型</li>
          </ul>
        </Accordion>
      </div>

      <h2 className="text-xl font-semibold mb-4">计费相关</h2>
      <div>
        <Accordion title="如何查看消费明细？">
          <p>登录控制台 → 日志页面，可以查看每次 API 调用的详细记录，包括模型、Token 用量和扣费金额。</p>
        </Accordion>

        <Accordion title="如何升级到 VIP / SVIP？">
          <p>请联系管理员申请升级用户分组。升级后享受更低的调用价格。</p>
        </Accordion>

        <Accordion title="支持退款吗？">
          <p>充值后的余额暂不支持退款，请按需充值。建议先使用注册赠送的免费额度体验。</p>
        </Accordion>
      </div>
    </div>
  );
}
