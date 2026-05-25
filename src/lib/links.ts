/** Default docs URL for SSR/build-time link generation. */
export const MUDREX_MCP_DOCS_URL =
  import.meta.env.VITE_MUDREX_MCP_DOCS_URL ??
  "https://mudrex-mcp-prod-landing-page.mohandasjithin.workers.dev";

const CLAUDE_TRY_PROMPT_TEMPLATE =
  "Go to {docsUrl} and read the full page. Then show me step-by-step instructions to install the Mudrex MCP server in Claude Desktop, including how to configure the JSON settings and get my API key. After that, let me know what I can do with it.";

export function buildClaudeTryPrompt(docsUrl = MUDREX_MCP_DOCS_URL): string {
  return CLAUDE_TRY_PROMPT_TEMPLATE.replace("{docsUrl}", docsUrl);
}

export function buildClaudeTryLinks(docsUrl = MUDREX_MCP_DOCS_URL) {
  const q = encodeURIComponent(buildClaudeTryPrompt(docsUrl));
  return {
    desktop: `claude://claude.ai/new?q=${q}`,
    web: `https://claude.ai/new?q=${q}`,
  };
}

/** Launch Claude Desktop via the custom protocol without navigating the current page. */
export function launchClaudeDesktop(desktopUrl: string): void {
  const anchor = document.createElement("a");
  anchor.href = desktopUrl;
  anchor.rel = "noopener noreferrer";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

/** Try Claude Desktop and return the web fallback URL for manual use. */
export function openClaudeTryLink(docsUrl?: string): { web: string } {
  const resolvedDocsUrl =
    docsUrl ??
    (typeof window !== "undefined" ? window.location.origin : MUDREX_MCP_DOCS_URL);
  const { desktop, web } = buildClaudeTryLinks(resolvedDocsUrl);

  launchClaudeDesktop(desktop);

  return { web };
}

/** Human-readable prompt (uses the default docs URL). */
export const CLAUDE_TRY_PROMPT = buildClaudeTryPrompt();

/** Claude Desktop deeplink — opens a new chat with the Mudrex MCP onboarding prompt. */
export const CLAUDE_TRY_DEEPLINK = buildClaudeTryLinks().desktop;

/** Web fallback when Claude Desktop is not installed. */
export const CLAUDE_TRY_WEB_LINK = buildClaudeTryLinks().web;
