export type McpTool = {
  name: string;
  description: string;
  confirmation: boolean;
};

export type McpToolGroup = {
  title: string;
  tools: McpTool[];
};

/** Tool catalog from https://docs.trade.mudrex.com/docs/mcp */
export const MCP_TOOL_GROUPS: McpToolGroup[] = [
  {
    title: "Orders",
    tools: [
      {
        name: "place_order",
        description: "Place LONG/SHORT (optionally attach SL/TP)",
        confirmation: true,
      },
      {
        name: "amend_order",
        description: "Amend an existing order (price / SL / TP)",
        confirmation: true,
      },
      { name: "cancel_order", description: "Cancel an order", confirmation: true },
      { name: "get_orders", description: "List open orders", confirmation: false },
      { name: "get_order", description: "Fetch a specific order by order_id", confirmation: false },
      { name: "get_order_history", description: "Historical orders", confirmation: false },
    ],
  },
  {
    title: "Positions",
    tools: [
      { name: "get_positions", description: "List open positions", confirmation: false },
      { name: "close_position", description: "Close a position", confirmation: true },
      { name: "reverse_position", description: "Reverse a position", confirmation: true },
      {
        name: "get_position_history",
        description: "Historical positions",
        confirmation: false,
      },
    ],
  },
  {
    title: "Risk management (SL/TP)",
    tools: [
      {
        name: "place_risk_order",
        description: "Place stop-loss / take-profit on a position",
        confirmation: true,
      },
      {
        name: "amend_risk_order",
        description: "Amend stop-loss / take-profit on a position",
        confirmation: true,
      },
      {
        name: "get_liquidation_price",
        description: "Compute liquidation price for a position",
        confirmation: false,
      },
    ],
  },
  {
    title: "Leverage & margin",
    tools: [
      {
        name: "get_leverage",
        description: "Get current leverage for a contract",
        confirmation: false,
      },
      { name: "set_leverage", description: "Set leverage for a contract", confirmation: true },
      { name: "add_margin", description: "Add margin to a position", confirmation: true },
    ],
  },
  {
    title: "Markets & account",
    tools: [
      { name: "list_futures", description: "List all available futures contracts", confirmation: false },
      {
        name: "get_future",
        description: "Get details for a contract (by id or symbol)",
        confirmation: false,
      },
      {
        name: "get_available_funds",
        description: "Available funds for trading",
        confirmation: false,
      },
      { name: "get_fee_history", description: "Fee history", confirmation: false },
    ],
  },
];
