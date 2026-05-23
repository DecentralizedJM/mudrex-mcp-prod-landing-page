import { ExternalLink, Wrench } from "lucide-react";
import { MCP_TOOL_GROUPS } from "@/lib/mcp-tools";

const MCP_TOOLS_TABLE_COLS = (
  <colgroup>
    <col style={{ width: "28%" }} />
    <col style={{ width: "52%" }} />
    <col style={{ width: "20%" }} />
  </colgroup>
);

const thClass = "px-4 py-3 text-left align-middle text-sm font-semibold text-foreground";
const tdClass = "px-4 py-3 text-left align-top text-sm";

export function McpToolsSection() {
  return (
    <section id="mcp-tools" className="mt-24 scroll-mt-24">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-primary">
          <Wrench className="h-4.5 w-4.5" strokeWidth={2.25} />
        </span>
        <h2 className="text-[26px] font-bold tracking-tight text-foreground md:text-[30px]">
          Available MCP Tools
        </h2>
      </div>

      <div className="mt-3 space-y-3 text-[15px] leading-7 text-muted-foreground">
        <p className="text-pretty">
          The Mudrex MCP server exposes futures trading tools your AI can call. Actions marked{" "}
          <span className="mx-0.5 inline-flex align-middle rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium leading-none text-primary">
            Required
          </span>{" "}
          in the tables below need your approval before they run.
        </p>
        <p>
          <a
            href="https://docs.trade.mudrex.com/docs/mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-primary/80"
          >
            View the official MCP integration guide
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        </p>
      </div>

      <p className="mt-3 w-full rounded-lg border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
        <span className="font-semibold">Note:</span> Transfer funds from your SPOT wallet to your
        FUTURES wallet in the Mudrex app or web platform before trading via MCP.
      </p>

      <div className="mt-8 space-y-8">
        {MCP_TOOL_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full min-w-[640px] table-fixed border-collapse">
                {MCP_TOOLS_TABLE_COLS}
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className={thClass}>Tool</th>
                    <th className={thClass}>Description</th>
                    <th className={thClass}>Confirmation</th>
                  </tr>
                </thead>
                <tbody>
                  {group.tools.map((tool) => (
                    <tr key={tool.name} className="border-b border-border last:border-0">
                      <td className={`${tdClass} font-mono text-[13px] leading-5 text-primary`}>
                        {tool.name}
                      </td>
                      <td className={`${tdClass} leading-6 text-muted-foreground`}>
                        {tool.description}
                      </td>
                      <td className={tdClass}>
                        {tool.confirmation ? (
                          <span className="inline-flex rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium leading-none text-primary">
                            Required
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
