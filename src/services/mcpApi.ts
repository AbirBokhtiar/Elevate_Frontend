const MCP_URL = process.env.MCP_URL as string;

export async function chatSupport(
  customerQuery: string,
  productList: { name: string; slug: string; category: string }[],
  refundPolicy: string
) {
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream', 
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: 'tools/call',
      params: {
        name: 'Jarvis_ai_agent',
        arguments: { customerQuery, productList, refundPolicy }
      }
    }),
  });
  if (!res.ok) throw new Error('Failed to get response');
  return res.json();
}

export async function suggestSimilarProducts(
  productName: string,
  category: string,
  productList: { name: string; slug: string; category: string }[]
) {
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: 'tools/call',
      params: {
        name: 'suggest_similar_products',
        arguments: { productName, category, productList }
      }
    }),
  });
  if (!res.ok) throw new Error('Failed to get recommendations');
  return res.json();
}

export async function aiEnhancedSearch(
  query: string,
  productList: { name: string; slug: string; category: string }[]
) {
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
      method: 'tools/call',
      params: {
        name: 'ai_enhanced_search',
        arguments: { query, productList }
      }
    }),
  });
  if (!res.ok) throw new Error('Failed to get search suggestions');
  return res.json();
}