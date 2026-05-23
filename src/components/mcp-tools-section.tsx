import { ExternalLink, Wrench } from "lucide-react";
import { MCP_TOOL_GROUPS } from "@/lib/mcp-tools";

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

      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
        The Mudrex MCP server exposes futures trading tools your AI can call. Actions marked{" "}
        <span className="font-medium text-foreground">Confirmation required</span> need your
        approval before they run. See the{" "}
        <a
          href="https://docs.trade.mudrex.com/docs/mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80"
        >
          official MCP integration guide
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        .
      </p>

      <p className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
        <span className="font-semibold">Note:</span> Transfer funds from your SPOT wallet to your
        FUTURES wallet in the Mudrex app or web platform before trading via MCP.
      </p>

      <div className="mt-8 space-y-8">
        {MCP_TOOL_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-3 font-semibold text-foreground">Tool</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Description</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Confirmation</th>
                  </tr>
                </thead>
                <tbody>
                  {group.tools.map((tool) => (
                    <tr key={tool.name} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-mono text-[13px] text-primary">{tool.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{tool.description}</td>
                      <td className="px-4 py-3">
                        {tool.confirmation ? (
                          <span className="inline-flex rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-primary">
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
