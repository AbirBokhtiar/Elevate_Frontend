
import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const consumerKey = process.env.NEXT_PUBLIC_WC_KEY as string;
const consumerSecret = process.env.NEXT_PUBLIC_WC_SECRET as string;
const BASE_URL = process.env.NEXT_PUBLIC_WC_URL;

const oauth = new OAuth({
  consumer: {
    key: consumerKey,
    secret: consumerSecret,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

export const placeOrder = async (cartItems: any[], customerInfo: any) => {
  const url = `${BASE_URL}/orders`;
  const request_data = { url, method: "POST" };
  const headers = {
    ...oauth.toHeader(oauth.authorize(request_data)),
    "Content-Type": "application/json",
  };

  const line_items = cartItems.map(item => ({
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

  // try {
  //   const res = await axios.post(url, body, { headers });
  //   return res.data;
  // } catch (error: any) {
  //   console.error("Order placement error:", error.response?.data || error.message);
  //   throw error;
  // }
  const res = await fetch("/api/place-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        customerInfo, // Ensure this matches Woo's format
      }),
    });

    if (!cartItems || cartItems.length === 0 || !customerInfo || Object.keys(customerInfo).length === 0) {
      alert("Cart items and customer information are required to place an order.");
      throw new Error("Cart items and customer information are required to place an order.");
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    console.log("Order placed:", data);
    return data;

};
