/** Claude Desktop deeplink — opens a new chat with the Mudrex MCP onboarding prompt. */
export const CLAUDE_TRY_DEEPLINK =
  "claude://claude.ai/new?q=Go%20to%20https%3A%2F%2Fmudrex.com%2Fmcp%20and%20read%20the%20full%20page.%20Then%20show%20me%20step-by-step%20instructions%20to%20install%20the%20Mudrex%20MCP%20server%20in%20Claude%20Desktop%2C%20including%20how%20to%20configure%20the%20JSON%20settings%20and%20get%20my%20API%20key.%20After%20that%2C%20let%20me%20know%20what%20I%20can%20do%20with%20it.";

/** Human-readable prompt (decoded from the deeplink `q` parameter). */
export const CLAUDE_TRY_PROMPT =
  "Go to https://mudrex.com/mcp and read the full page. Then show me step-by-step instructions to install the Mudrex MCP server in Claude Desktop, including how to configure the JSON settings and get my API key. After that, let me know what I can do with it.";
