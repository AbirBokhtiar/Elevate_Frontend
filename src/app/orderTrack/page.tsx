"use client";

import { useState } from "react";
import { getOrderById } from "../lib/getOrder";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    setError("");
    try {
      const result = await getOrderById(Number(orderId));
      if (result.billing.email === email && result.status !== "trash") {
        setOrder(result);
      } else {
        setError("Order not found for this email.");
        setOrder(null);
      }
    } catch (err) {
      setError("Invalid Order ID or failed to fetch order.");
      setOrder(null);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Track Your Order</h1>
      <input
        type="text"
        placeholder="Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        placeholder="Billing Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleTrack}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Track Order
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {order && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Order #{order.id}</h2>
          <p>Status: <strong>{order.status}</strong></p>
          <p>Total: ${order.total}</p>
          <p>Date: {new Date(order.date_created).toLocaleString()}</p>
          <h3 className="mt-4 font-medium">Items:</h3>
          <ul className="list-disc ml-6">
            {order.line_items.map((item: any) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
