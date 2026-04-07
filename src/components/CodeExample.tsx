"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Copy, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

const tabs = ["Python", "curl", "Node.js"] as const;
const snippets = {
  Python: `from openai import OpenAI

client = OpenAI(
    api_key="sk-your-ffapi-key",
    base_url="https://api.ffapi.com/v1"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`,
  curl: `curl https://api.ffapi.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-your-ffapi-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "stream": true
  }'`,
  "Node.js": `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-your-ffapi-key",
  baseURL: "https://api.ffapi.com/v1",
});

const stream = await client.chat.completions.create({
  model: "gemini-2.5-flash",
  messages: [{ role: "user", content: "Hello!" }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`,
};

export function CodeExample({ locale }: { locale: Locale }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Python");
  const [copied, setCopied] = useState(false);
  const d = t(locale).code;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [0.85, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const copy = () => { navigator.clipboard.writeText(snippets[tab]); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <section ref={ref} className="relative py-32 bg-[#050505]" id="code">
      <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-3xl px-6 pt-16">
        <motion.div className="mb-14 text-center" style={{ scale: titleScale, opacity: titleOpacity }}>
          <h2 className="mb-4 text-4xl font-extrabold sm:text-5xl tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{d.title}</h2>
          <p className="text-white/40 text-lg">{d.subtitle}</p>
        </motion.div>

        <motion.div style={{ y, opacity }} className="rounded-2xl border border-white/[0.06] bg-[#0d0d14] overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center border-b border-white/[0.06]">
            {tabs.map((tabName) => (
              <button
                key={tabName}
                onClick={() => setTab(tabName)}
                className={`relative px-5 py-3 text-[13px] font-medium transition-colors ${tab === tabName ? "text-white" : "text-white/30 hover:text-white/60"}`}
              >
                {tabName}
                {tab === tabName && <motion.div layoutId="codeTab" className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
              </button>
            ))}
            <div className="flex-1" />
            <button onClick={copy} className="px-4 flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors">
              {copied ? <><Check className="h-3 w-3" /> 已复制</> : <><Copy className="h-3 w-3" /> 复制</>}
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/[0.04] flex flex-col items-end pt-6 pr-3 text-[11px] text-white/10 font-mono leading-relaxed select-none">
              {snippets[tab].split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <motion.pre key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="overflow-x-auto p-6 pl-16 text-[13px] leading-relaxed">
              <code className="text-emerald-300/80 font-mono">{snippets[tab]}</code>
            </motion.pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
