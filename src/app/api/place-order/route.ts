// app/api/place-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_WC_URL;

const oauth = new OAuth({
  consumer: {
    key: process.env.NEXT_PUBLIC_WC_KEY as string,
    secret: process.env.NEXT_PUBLIC_WC_SECRET as string,
  },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customerInfo } = await req.json();

    const url = `${BASE_URL}/orders`;
    const request_data = { url, method: "POST" };
    const headers = {
      ...oauth.toHeader(oauth.authorize(request_data)),
      "Content-Type": "application/json",
    };

    const line_items = cartItems.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const body = {
      payment_method: "bacs",
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      billing: customerInfo,
      shipping: customerInfo,
      line_items,
    };

    const res = await axios.post(url, body, { headers });
    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("API Route Order Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
