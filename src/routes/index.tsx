import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Info,
  KeyRound,
  Settings,
  Lightbulb,
  ExternalLink,
  Copy,
  Check,
  ListChecks,
  XCircle,
  SlidersHorizontal,
  ShoppingCart,
  LineChart,
  ArrowUpRight,
} from "lucide-react";
import mcpMark from "@/assets/mcp-mark.png";
import apiKeyPanel from "@/assets/api-key-panel.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mudrex MCP — Trade Crypto with AI" },
      {
        name: "description",
        content:
          "Connect Mudrex's trading engine to Claude and other AI models via the Model Context Protocol. Execute trades, monitor portfolios, and fetch market data in natural language.",
      },
      { property: "og:title", content: "Mudrex MCP — Trade Crypto with AI" },
      {
        property: "og:description",
        content:
          "Model Context Protocol server for Mudrex. Connect Claude Desktop to your trading engine.",
      },
    ],
  }),
  component: Index,
});

const SECTIONS = [
  { id: "intro", label: "Introduction", icon: Info },
  { id: "apikey", label: "API Key Creation", icon: KeyRound },
  { id: "setup", label: "Setting Up", icon: Settings },
  { id: "usecases", label: "Use Cases", icon: Lightbulb },
] as const;

const USE_CASES = [
  {
    icon: ListChecks,
    title: "View Open Positions",
    body: "Ask Claude to summarize your active trades, PnL, and exposure across markets in one sentence.",
    tone: "brand" as const,
  },
  {
    icon: XCircle,
    title: "Close Positions",
    body: '"Close all my BTC longs" — execute closing orders instantly through natural language.',
    tone: "danger" as const,
  },
  {
    icon: SlidersHorizontal,
    title: "Change Leverage",
    body: "Adjust leverage on specific pairs without navigating complex exchange interfaces.",
    tone: "brand" as const,
  },
  {
    icon: ShoppingCart,
    title: "Execute Market Orders",
    body: "Place buy or sell orders for any supported asset directly from your chat interface.",
    tone: "brand" as const,
  },
  {
    icon: LineChart,
    title: "Fetch Market Data",
    body: "Retrieve real-time prices, order book depth, and historical k-line data for AI analysis.",
    tone: "brand" as const,
  },
] as const;

const CONFIG_JSON = `{
  "mcpServers": {
    "mudrex": {
      "command": "python",
      "args": ["-m", "mudrex_mcp"],
      "env": {
        "MUDREX_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}`;

function MudrexWordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-8 w-8 place-items-center rounded-lg brand-gradient-bg shadow-sm">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18V6l8 8 8-8v12" />
        </svg>
      </div>
      <span className="text-[18px] font-bold tracking-tight text-foreground">
        Mudrex
      </span>
    </div>
  );
}

function Index() {
  const [active, setActive] = useState<string>("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG_JSON);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">
          <a href="/" className="flex items-center">
            <MudrexWordmark />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#">API Reference</a>
            <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#">Community</a>
            <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#">Support</a>
            <a
              href="#apikey"
              className="inline-flex items-center gap-1.5 rounded-lg brand-gradient-bg px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[0.98]"
            >
              Get API Key
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1280px] gap-10 px-5 md:px-10">
        {/* Sidebar */}
        <aside className="custom-scrollbar sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col overflow-y-auto border-r border-border py-10 pr-6 md:flex">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Documentation
            </p>
            <h2 className="mt-1 text-lg font-bold text-foreground">Mudrex MCP</h2>
            <p className="text-sm text-muted-foreground">Documentation</p>
          </div>

          <nav className="flex flex-col gap-0.5">
            {SECTIONS.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={
                    "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all " +
                    (isActive
                      ? "bg-brand-soft text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground")
                  }
                >
                  {isActive && (
                    <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-primary" />
                  )}
                  <Icon className={"h-4 w-4 " + (isActive ? "text-primary" : "")} strokeWidth={isActive ? 2.5 : 2} />
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2 pt-8">
            <a
              href="#"
              className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              API Documentation
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Mudrex Python SDK
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 py-14 md:py-20">
          {/* Hero */}
          <section id="intro" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h1 className="text-[42px] font-bold leading-[1.05] tracking-tight text-foreground md:text-[56px]">
                  Introducing Mudrex MCP:
                  <br />
                  <span className="brand-gradient-text">Trade Crypto with AI.</span>
                </h1>
                <p className="mt-6 max-w-xl text-[17px] leading-7 text-muted-foreground">
                  Connect Mudrex's trading engine directly to your AI models.
                  The Model Context Protocol enables seamless execution,
                  portfolio monitoring, and data retrieval — straight from
                  Claude Desktop.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#setup"
                    className="inline-flex items-center gap-2 rounded-lg brand-gradient-bg px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[0.98]"
                  >
                    Get Started
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#usecases"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    Explore Use Cases
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-6 rounded-3xl brand-gradient-bg opacity-[0.08] blur-2xl" />
                <div className="relative rounded-3xl border border-border bg-card p-8 shadow-[0_8px_40px_rgba(52,11,105,0.06)]">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>// model-context-protocol</span>
                    <span className="inline-flex items-center gap-1.5 rounded bg-brand-softer px-2 py-0.5 text-primary">
                      <img src={mcpMark} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
                      mcp
                    </span>
                  </div>
                  <div className="my-8 grid place-items-center">
                    <img
                      src={mcpMark}
                      alt="Mudrex MCP mark"
                      width={128}
                      height={128}
                      className="h-24 w-24 object-contain"
                    />
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-surface-subtle text-center">
                    {[
                      { k: "Tools", v: "12+" },
                      { k: "Latency", v: "<80ms" },
                      { k: "Markets", v: "350+" },
                    ].map((s) => (
                      <div key={s.k} className="px-3 py-3">
                        <div className="text-base font-bold text-foreground">{s.v}</div>
                        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{s.k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* API Key */}
          <section id="apikey" className="mt-24 scroll-mt-24">
            <SectionHeader icon={KeyRound} title="API Key Creation" />
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              To authenticate your MCP server, you need a Mudrex API Key.
              Generate one from your account settings under the{" "}
              <span className="font-medium text-foreground">Developer</span>{" "}
              section.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-surface-subtle p-2 shadow-sm">
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <img
                  src={apiKeyPanel}
                  alt="Mudrex developer dashboard showing an API Key field with Rotate and Revoke actions"
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Open Settings → Developer",
                "Click Generate New Key",
                "Copy and store it securely",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand-soft text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Setup */}
          <section id="setup" className="mt-24 scroll-mt-24">
            <SectionHeader icon={Settings} title="Setting Up Claude Desktop" />
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Configure your Claude Desktop app to use the Mudrex MCP server by
              modifying your{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px] text-foreground">
                claude_desktop_config.json
              </code>{" "}
              file.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-sm">
              <div className="flex items-center justify-between bg-[#13111a] px-4 py-2.5">
                <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  claude_desktop_config.json
                </div>
                <button
                  onClick={copyConfig}
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="overflow-x-auto bg-[#0f0d15] px-5 py-5 text-[13.5px] leading-6 text-zinc-200">
                <code>{CONFIG_JSON}</code>
              </pre>
            </div>
          </section>

          {/* Use Cases */}
          <section id="usecases" className="mt-24 scroll-mt-24">
            <SectionHeader icon={Lightbulb} title="What Can You Do?" />
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Once connected, Claude can execute complex trading actions on
              your behalf using natural language.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {USE_CASES.map(({ icon: Icon, title, body, tone }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_40px_rgba(52,11,105,0.08)]"
                >
                  <div
                    className={
                      "mb-5 grid h-10 w-10 place-items-center rounded-lg " +
                      (tone === "danger"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-brand-soft text-primary")
                    }
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <h3 className="text-[17px] font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {body}
                  </p>
                  <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 -translate-y-1 translate-x-1 text-muted-foreground/0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary" />
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 pb-12 text-sm text-muted-foreground md:flex-row">
            <div className="font-medium text-foreground">
              © 2026 Mudrex Inc. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a className="transition-colors hover:text-primary" href="#">Privacy Policy</a>
              <a className="transition-colors hover:text-primary" href="#">Terms of Service</a>
              <a className="transition-colors hover:text-primary" href="#">Cookie Policy</a>
              <a className="transition-colors hover:text-primary" href="#">Legal</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border pb-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-primary">
        <Icon className="h-4.5 w-4.5" strokeWidth={2.25} />
      </span>
      <h2 className="text-[26px] font-bold tracking-tight text-foreground md:text-[30px]">
        {title}
      </h2>
    </div>
  );
}

