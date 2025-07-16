// src/pages/api/products.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

const consumerKey = process.env.NEXT_PUBLIC_WC_KEY!;
const consumerSecret = process.env.NEXT_PUBLIC_WC_SECRET!;
const BASE_URL = process.env.NEXT_PUBLIC_WC_URL!;

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const query = new URLSearchParams(req.query as Record<string, string>).toString();
    const url = `${BASE_URL}/products${query ? `?${query}` : ""}`;

    const requestData = { url, method: "GET" };
    const headers = oauth.toHeader(oauth.authorize(requestData));

    const response = await axios.get(url, { headers: {...headers} });
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("API error:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
