
import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const consumerKey = process.env.NEXT_PUBLIC_WC_KEY as string;
const consumerSecret = process.env.NEXT_PUBLIC_WC_SECRET as string;

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

const request_data = {
  url: "http://localhost:8080/elevate/wp-json/wc/v3/products",
  method: "GET",
};

const headers = { ...oauth.toHeader(oauth.authorize(request_data)) };


// export const getAllProducts = async () => {
//   const res = await axios.get(request_data.url, { headers });
//   console.log(res.data);
//   return res.data;
// };

export const getAllProducts = async (page = 1, per_page = 20) => {
  const url = `http://localhost:8080/elevate/wp-json/wc/v3/products?page=${page}&per_page=${per_page}`;
  const request_data = { url, method: "GET" };
  const headers = { ...oauth.toHeader(oauth.authorize(request_data)) };
  const res = await axios.get(url, { headers });
  return res.data;
};

// export const getAllProducts = async (page = 1, per_page = 20) => {
//   const url = `${BASE_URL}/products?page=${page}&per_page=${per_page}&_fields=id,name,price,regular_price,sale_price,images,slug`;

//   const request_data = {
//     url,
//     method: "GET",
//   };

//   const headers = { ...oauth.toHeader(oauth.authorize(request_data)) };

//   try {
//     const res = await axios.get(url, { headers });
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     return [];
//   }
// };
