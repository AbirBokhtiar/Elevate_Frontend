// src/services/wooService.ts
import axios from 'axios';

// NestJS backend base URL (e.g., localhost or deployed backend)
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const getAllProducts = async (page = 1, per_page = 20) => {
  try {
    const url = `${BACKEND_BASE_URL}/woocommerce/products?page=${page}&per_page=${per_page}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error('Error fetching from backend:', err);
    return [];
  }
};
