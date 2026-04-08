import Link from "next/link";

type ConsoleFallbackProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function ConsoleFallback({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: ConsoleFallbackProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040506] px-6 py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.09),transparent_68%)] blur-3xl" />
        <div className="absolute left-[8%] top-[24%] h-64 w-64 rounded-full bg-emerald-400/10 blur-[100px]" />
        <div className="absolute right-[8%] top-[18%] h-72 w-72 rounded-full bg-sky-400/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-12">
          <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-white/35">
            {eyebrow}
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/25 hover:text-white"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
