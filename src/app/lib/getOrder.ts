// lib/getOrder.ts

import OAuth from "oauth-1.0a";
import crypto from "crypto";
import axios from "axios";

const consumerKey = process.env.NEXT_PUBLIC_WC_KEY as string;
const consumerSecret = process.env.NEXT_PUBLIC_WC_SECRET as string;
const BASE_URL = process.env.NEXT_PUBLIC_WC_URL;

// const consumerKey = 'ck_0b2c09d5ffe791eb67e11b7e4c1d9e8212561b05';
// const consumerSecret = 'cs_b26b01d7090ff4ec3fdd6348aa6a05d4cc867583';
// const BASE_URL = 'http://localhost:8080/elevate/wp-json/wc/v3';

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});

export const getOrderById = async (id: number) => {
  const url = `${BASE_URL}/orders/${id}`;
  const request_data = { url, method: "GET" };
  const headers = {
    ...oauth.toHeader(oauth.authorize(request_data)),
    "Content-Type": "application/json",
  };

  const res = await axios.get(url, { headers });
  return res.data;
};
