# Mudrex MCP — Landing Page

Documentation and onboarding site for **Mudrex MCP**: connect Claude and other AI apps to the Mudrex trading engine via the [Model Context Protocol (MCP)](https://modelcontextprotocol.io).

**Introducing Mudrex MCP — Now Trade Crypto with AI**

## What's on the site

- Product hero with setup CTAs
- **What is MCP?** — overview and Claude → MCP → Mudrex connector diagram
- **How it works** — AI client, Mudrex MCP server, user approval flow
- **API Key Creation** — Figma-accurate key management UI and setup steps
- **Setting Up** — copy-ready `claude_desktop_config.json` snippet
- **Use cases** — positions, orders, leverage, market data, cancel orders
- **FAQ** — Claude support, API vs MCP, security, local/cloud, licensing

## Tech stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router)
- [React 19](https://react.dev)
- [Vite 7](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com) + [Lucide](https://lucide.dev) icons
- Deploy target: [Cloudflare Workers](https://developers.cloudflare.com/workers/) (via Wrangler)

## Getting started

### Prerequisites

- **Node.js** 20+ (22+ recommended)
- **npm** 10+

### Install

```bash
git clone https://github.com/DecentralizedJM/mudrex-mcp-prod-landing-page.git
cd mudrex-mcp-prod-landing-page
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) (Vite may use the next free port if 8080 is taken).

### Build & preview

```bash
npm run build
npm run preview
```

### Lint & format

```bash
npm run lint
npm run format
```

## Project structure

```
src/
├── routes/
│   └── index.tsx          # Main docs / landing page
├── components/
│   ├── api-key-management-panel.tsx
│   └── ui/                # Shared UI primitives
├── assets/                # Logos and images
├── styles.css             # Theme and global styles
└── server.ts              # Cloudflare Worker entry
```

## Quick MCP config (Claude Desktop)

Add this to your Claude Desktop config and replace the API key:

```json
{
  "mcpServers": {
    "mudrex": {
      "command": "python",
      "args": ["-m", "mudrex_mcp"],
      "env": {
        "MUDREX_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Generate an API key in Mudrex under **Settings → Developer**.

## Try with Claude (deeplink)

The hero **Try with Claude** button opens Claude Desktop with a pre-filled onboarding prompt. The deeplink is defined in [`src/lib/links.ts`](src/lib/links.ts):

```
claude://claude.ai/new?q=Go%20to%20https%3A%2F%2Fmudrex.com%2Fmcp%20and%20read%20the%20full%20page.%20Then%20show%20me%20step-by-step%20instructions%20to%20install%20the%20Mudrex%20MCP%20server%20in%20Claude%20Desktop%2C%20including%20how%20to%20configure%20the%20JSON%20settings%20and%20get%20my%20API%20key.%20After%20that%2C%20let%20me%20know%20what%20I%20can%20do%20with%20it.
```

Decoded prompt:

> Go to https://mudrex.com/mcp and read the full page. Then show me step-by-step instructions to install the Mudrex MCP server in Claude Desktop, including how to configure the JSON settings and get my API key. After that, let me know what I can do with it.

## Deployment

The app is configured for Cloudflare Workers (`wrangler.jsonc`). Build with `npm run build` and deploy using your Cloudflare / Wrangler workflow.

## Related links

- [Mudrex](https://mudrex.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Anthropic Claude](https://claude.ai)

## License

This repository is the Mudrex MCP marketing/documentation site. MCP itself is open-source under the MIT license. Mudrex MCP usage requires a Mudrex account and API key.
