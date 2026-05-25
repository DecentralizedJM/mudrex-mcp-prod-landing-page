import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import {
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
  Workflow,
  MessageCircleQuestion,
  Rocket,
  Plug,
  Shield,
  Globe,
  Search,
  CircleHelp,
  ChevronDown,
  Sparkles,
  CircleOff,
  Wrench,
  Github,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ApiKeyManagementPanel } from "@/components/api-key-management-panel";
import { McpToolsSection } from "@/components/mcp-tools-section";
import { CLAUDE_TRY_DEEPLINK } from "@/lib/links";
import mcpLogo from "@/assets/mcp-logo.png";
import mudrexLogo from "@/assets/mudrex-logo.png";
import mudrexIcon from "@/assets/mudrex-icon.png";
import claudeLogo from "@/assets/claude-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mudrex MCP — Trade Crypto with AI" },
      {
        name: "description",
        content:
          "Introducing Mudrex MCP — trade crypto with AI. Connect Claude and other AI apps to your Mudrex trading engine.",
      },
      { property: "og:title", content: "Mudrex MCP — Trade Crypto with AI" },
      {
        property: "og:description",
        content:
          "Introducing Mudrex MCP — trade crypto with AI. Connect Claude and other AI apps to your Mudrex trading engine.",
      },
    ],
  }),
  component: Index,
});

const SECTIONS = [
  { id: "intro", label: "Introduction", icon: Sparkles },
  { id: "what-is-mcp", label: "What is MCP?", icon: "mcp" as const },
  { id: "how-it-works", label: "How It Works", icon: Workflow },
  { id: "apikey", label: "API Key Creation", icon: KeyRound },
  { id: "setup", label: "Setting Up", icon: Settings },
  { id: "usecases", label: "Use Cases", icon: Lightbulb },
  { id: "mcp-tools", label: "MCP Tools", icon: Wrench },
  { id: "faq", label: "FAQ", icon: MessageCircleQuestion },
  { id: "get-started", label: "Get Started", icon: Rocket },
] as const;

type SectionIcon = (typeof SECTIONS)[number]["icon"];

function SectionNavIcon({ icon, isActive }: { icon: SectionIcon; isActive: boolean }) {
  if (icon === "mcp") {
    return <img src={mcpLogo} alt="" width={16} height={16} className="h-4 w-4 object-contain" />;
  }

  const Icon = icon as LucideIcon;
  return (
    <Icon
      className={"h-4 w-4 " + (isActive ? "text-primary" : "")}
      strokeWidth={isActive ? 2.5 : 2}
    />
  );
}

const NAV_LINKS = ["Buy Crypto", "Coin Sets", "Trade Futures", "API"] as const;

const WHAT_IS_MCP_COLUMNS = [
  {
    icon: Plug,
    title: "One Protocol, Every Tool",
    body: "Instead of building a custom integration for each AI + exchange pair, MCP gives you one shared interface.",
  },
  {
    icon: Globe,
    title: "Open and Model-Agnostic",
    body: "Works with Claude, ChatGPT, Gemini, and open-source models — any app that speaks MCP.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    body: "Every tool call requires your approval. Your AI cannot act without permission.",
  },
] as const;

const HOW_IT_WORKS_STEPS = [
  {
    title: "Your AI App",
    body: "Any AI-powered app — Claude Desktop, Cursor, or a custom agent — runs an MCP client.",
  },
  {
    title: "The Mudrex MCP Server",
    body: "A lightweight server that exposes trading tools: place orders, read positions, and fetch market data.",
  },
  {
    title: "You Approve Each Action",
    body: "The AI proposes a trade or query. You confirm before anything executes.",
  },
] as const;

const USE_CASES = [
  {
    icon: ListChecks,
    title: "View Open Positions",
    body: "Ask for PnL, exposure, and open trades across all markets in a single message.",
    tone: "brand" as const,
  },
  {
    icon: XCircle,
    title: "Close Positions",
    body: '"Close all my BTC longs" — natural language in, closing orders out.',
    tone: "danger" as const,
  },
  {
    icon: SlidersHorizontal,
    title: "Change Leverage",
    body: "Adjust leverage on any pair without opening the exchange UI.",
    tone: "brand" as const,
  },
  {
    icon: ShoppingCart,
    title: "Execute Market Orders",
    body: "Buy or sell any supported asset directly from your chat interface.",
    tone: "brand" as const,
  },
  {
    icon: LineChart,
    title: "Fetch Market Data",
    body: "Pull real-time prices, order book depth, and k-line history for analysis.",
    tone: "brand" as const,
  },
  {
    icon: CircleOff,
    title: "Cancel Open Orders",
    body: '"Cancel all my pending ETH orders" — revoke unfilled orders without opening the exchange.',
    tone: "brand" as const,
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Is Mudrex MCP only for Claude?",
    answer:
      "No. MCP is an open protocol used by Claude, ChatGPT, Cursor, and many other AI apps. Any client that supports MCP can connect to the Mudrex server.",
  },
  {
    question: "How is this different from the Mudrex API?",
    answer:
      "The Mudrex API is built for app-to-app calls. MCP is built for AI-to-tool communication — it handles discovery, permissions, and context in a way REST APIs don't. The Mudrex MCP server wraps the API so your AI can use it naturally.",
  },
  {
    question: "Can the AI trade without my permission?",
    answer:
      "No. MCP requires explicit approval before any tool runs. You control which servers your AI connects to, and every action is auditable.",
  },
  {
    question: "Does the MCP server run locally or in the cloud?",
    answer:
      "Claude Desktop connects via mcp-remote to https://mudrex.com/mcp. Your API secret stays in your local claude_desktop_config.json — it is sent only in the X-Authentication header when tools are called.",
  },
  {
    question: "Is MCP free and open-source?",
    answer:
      "Yes. MCP is fully open-source under the MIT license. Mudrex MCP is free to use with your Mudrex account.",
  },
] as const;

const CONFIG_JSON = `{
  "mcpServers": {
    "mcp-futures-trading": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mudrex.com/mcp",
        "--header",
        "X-Authentication:\${API_SECRET}"
      ],
      "env": {
        "API_SECRET": "<your-api-secret>"
      }
    }
  }
}`;

function MudrexWordmark() {
  return (
    <img
      src={mudrexLogo}
      alt="Mudrex"
      width={120}
      height={28}
      className="h-7 w-auto object-contain"
    />
  );
}

function FlowArrows({ vertical = false }: { vertical?: boolean }) {
  const id = useId().replace(/:/g, "");
  const fwd = `arrowFwd-${id}`;
  const back = `arrowBack-${id}`;

  if (vertical) {
    return (
      <div className="flex shrink-0 justify-center py-1 sm:hidden" aria-hidden="true">
        <svg viewBox="0 0 36 64" className="h-12 w-9">
          <path d="M18 4 V28" className="flow-line flow-line-forward" markerEnd={`url(#${fwd})`} />
          <path
            d="M18 60 V36"
            className="flow-line flow-line-backward"
            markerEnd={`url(#${back})`}
          />
          <defs>
            <marker id={fwd} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" className="flow-arrowhead" />
            </marker>
            <marker id={back} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" className="flow-arrowhead" />
            </marker>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div
      className="hidden shrink-0 sm:flex sm:w-16 sm:flex-col sm:justify-center lg:w-20"
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 36" className="h-9 w-full">
        <path d="M4 10 H56" className="flow-line flow-line-forward" markerEnd={`url(#${fwd})`} />
        <path d="M56 26 H4" className="flow-line flow-line-backward" markerEnd={`url(#${back})`} />
        <defs>
          <marker id={fwd} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" className="flow-arrowhead" />
          </marker>
          <marker id={back} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" className="flow-arrowhead" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function DiagramNode({
  logo,
  logoAlt,
  title,
  subtitle,
  logoClassName = "h-10 w-10 object-contain",
}: {
  logo: string;
  logoAlt: string;
  title: string;
  subtitle: string;
  logoClassName?: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex aspect-square w-full max-w-[140px] flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 text-center">
        <img src={logo} alt={logoAlt} className={logoClassName} />
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function McpConnectorDiagram() {
  return (
    <div
      role="img"
      aria-label="Claude connects through MCP to Mudrex trading with bidirectional data flow"
      className="mt-10 flex flex-col items-center sm:flex-row sm:items-center sm:justify-center"
    >
      <DiagramNode logo={claudeLogo} logoAlt="Claude" title="Claude" subtitle="AI" />
      <FlowArrows vertical />
      <FlowArrows />
      <DiagramNode
        logo={mcpLogo}
        logoAlt="Model Context Protocol"
        title="MCP"
        subtitle="Server"
        logoClassName="h-10 w-10 object-contain"
      />
      <FlowArrows vertical />
      <FlowArrows />
      <DiagramNode
        logo={mudrexIcon}
        logoAlt="Mudrex"
        title="Mudrex"
        subtitle="Trading Engine"
        logoClassName="h-12 w-12 rounded-lg object-contain"
      />
    </div>
  );
}

function MudrexNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between gap-4 px-5 lg:px-10">
        <a href="/" className="flex shrink-0 items-center">
          <MudrexWordmark />
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Institutional
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            More
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#2f1259] via-[#40196e] to-[#2a1148] px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <img
              src={mudrexIcon}
              alt=""
              className="h-5 w-5 shrink-0 rounded-md object-contain"
            />
            Ask Mudrex AI
          </a>
          <a
            href="#"
            className="hidden h-9 w-9 place-items-center rounded-full border border-border bg-muted/40 text-muted-foreground transition-colors hover:text-foreground sm:grid"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="hidden h-9 w-9 place-items-center rounded-full border border-border bg-muted/40 text-muted-foreground transition-colors hover:text-foreground sm:grid"
            aria-label="Help"
          >
            <CircleHelp className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="rounded-xl bg-gradient-to-r from-[#2f1259] to-[#152038] px-5 py-2.5 text-xs font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90 sm:text-sm"
          >
            Login / Create Account
          </a>
        </div>
      </div>
    </header>
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
      <MudrexNavbar />

      <div className="flex">
        <aside className="custom-scrollbar sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col overflow-y-auto border-r border-border px-6 py-10 md:flex">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Documentation
            </p>
            <h2 className="mt-1 text-lg font-bold text-foreground">Mudrex MCP</h2>
          </div>

          <nav className="flex flex-col gap-0.5">
            {SECTIONS.map(({ id, label, icon }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={
                    "flex items-center gap-2.5 rounded-lg py-2 pr-2 text-sm transition-colors " +
                    (isActive
                      ? "font-semibold text-primary"
                      : "font-medium text-muted-foreground hover:text-foreground")
                  }
                >
                  <SectionNavIcon icon={icon} isActive={isActive} />
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
              <span className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                API Documentation
              </span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <span className="flex items-center gap-2">
                <Github className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                Mudrex Python SDK
              </span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </a>
          </div>
        </aside>

        <main className="mx-auto min-w-0 max-w-4xl flex-1 px-6 py-14 md:px-12 md:py-20 xl:max-w-5xl">
          <section id="intro" className="scroll-mt-24">
            <div className="max-w-3xl">
              <h1 className="text-[42px] font-bold leading-[1.05] tracking-tight text-foreground md:text-[56px]">
                Introducing Mudrex MCP
                <br />
                <span className="brand-gradient-text">Now Trade Crypto with AI</span>
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#apikey"
                  className="inline-flex items-center gap-2 rounded-lg brand-gradient-bg px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[0.99]"
                >
                  Get Started
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={CLAUDE_TRY_DEEPLINK}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D97757] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#C56848] hover:scale-[0.99]"
                >
                  <img
                    src={claudeLogo}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-[5px] object-contain"
                  />
                  Try with Claude
                </a>
              </div>
            </div>
          </section>

          <section id="what-is-mcp" className="mt-24 scroll-mt-24">
            <SectionHeader iconSrc={mcpLogo} title="What is MCP?" />
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Model Context Protocol (MCP) is an open standard that connects AI apps to your tools
              and data — like USB-C, but for AI.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {WHAT_IS_MCP_COLUMNS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-5">
                  <div className="mb-4 grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-primary">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.25} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>

            <McpConnectorDiagram />
          </section>

          <section id="how-it-works" className="mt-24 scroll-mt-24">
            <SectionHeader icon={Workflow} title="How It Works" />
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Three parts. One flow.
            </p>

            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {HOW_IT_WORKS_STEPS.map(({ title, body }, i) => (
                <li
                  key={title}
                  className="flex flex-col rounded-2xl border border-border bg-card p-5"
                >
                  <span className="mb-4 grid h-7 w-7 place-items-center rounded-md bg-brand-soft text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="apikey" className="mt-24 scroll-mt-24">
            <SectionHeader icon={KeyRound} title="API Key Creation" />
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Generate a Mudrex API key and secret to authenticate MCP. Use the API secret as{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px] text-foreground">
                API_SECRET
              </code>{" "}
              in your Claude config. See{" "}
              <a
                href="https://docs.trade.mudrex.com/docs/mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary/80"
              >
                API key setup
              </a>{" "}
              on the Mudrex docs.
            </p>

            <div className="mt-6 w-full">
              <ApiKeyManagementPanel />
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

          <section id="setup" className="mt-24 scroll-mt-24">
            <SectionHeader icon={Settings} title="Setting Up Claude Desktop" />
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Add the Mudrex MCP server to Claude Desktop in a few minutes. In{" "}
              <strong className="font-medium text-foreground">Settings → Developer → Edit Config</strong>
              , paste the JSON below into{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px] text-foreground">
                claude_desktop_config.json
              </code>
              , set <code className="rounded bg-muted px-1.5 py-0.5 text-[13px] text-foreground">API_SECRET</code> to your Mudrex API secret, and restart. Requires{" "}
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary/80"
              >
                Node.js
              </a>{" "}
              (for <code className="rounded bg-muted px-1.5 py-0.5 text-[13px] text-foreground">npx</code>
              ).
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

          <section id="usecases" className="mt-24 scroll-mt-24">
            <SectionHeader icon={Lightbulb} title="What Can You Do?" />
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Run your entire trading workflow from a chat window — positions, orders, leverage, and
              market data.
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
                  <h3 className="text-[17px] font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                  <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 -translate-y-1 translate-x-1 text-muted-foreground/0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary" />
                </div>
              ))}
            </div>
          </section>

          <McpToolsSection />

          <section id="faq" className="mt-24 scroll-mt-24">
            <SectionHeader icon={MessageCircleQuestion} title="Frequently Asked Questions" />
            <Accordion type="single" collapsible className="mt-4">
              {FAQ_ITEMS.map(({ question, answer }) => (
                <AccordionItem key={question} value={question}>
                  <AccordionTrigger className="text-[15px] font-medium text-foreground">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-7 text-muted-foreground">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section id="get-started" className="mt-24 scroll-mt-24">
            <div className="rounded-2xl bg-brand-softer px-8 py-10 md:px-12 md:py-14">
              <h2 className="text-[26px] font-bold tracking-tight text-foreground md:text-[30px]">
                Start Building with Mudrex MCP
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground">
                Generate your API key, add the config, and connect your AI to Mudrex in minutes.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="#apikey"
                  className="inline-flex items-center gap-2 rounded-lg brand-gradient-bg px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[0.99]"
                >
                  Get Started
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#setup"
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  View setup instructions →
                </a>
              </div>
            </div>
          </section>

          <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 pb-12 text-sm text-muted-foreground md:flex-row">
            <div className="font-medium text-foreground">
              © 2026 Mudrex Inc. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a className="transition-colors hover:text-primary" href="#">
                Privacy Policy
              </a>
              <a className="transition-colors hover:text-primary" href="#">
                Terms of Service
              </a>
              <a className="transition-colors hover:text-primary" href="#">
                Cookie Policy
              </a>
              <a className="transition-colors hover:text-primary" href="#">
                Legal
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  iconSrc,
  title,
}: {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconSrc?: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border pb-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-primary">
        {iconSrc ? (
          <img src={iconSrc} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
        ) : (
          Icon && <Icon className="h-4.5 w-4.5" strokeWidth={2.25} />
        )}
      </span>
      <h2 className="text-[26px] font-bold tracking-tight text-foreground md:text-[30px]">
        {title}
      </h2>
    </div>
  );
}
