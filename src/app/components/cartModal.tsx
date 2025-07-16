"use client";

import React from "react";
import { useCart } from "../cart/cart";
import Link from "next/link";

const CartModal = () => {
  const { items, removeFromCart } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );


  return (
    <div className="w-[350px] absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {items.length === 0 ? (
        <div className="justify-center items-center flex flex-row">Cart is Empty
          <span className="ml-5"><Link href="../orderTrack">
              <button
              style={{
                  background: "#000",
                  border: "1px solid #e5e7eb",
                  borderRadius: 5,
                  padding: "0.5rem 1rem",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#fff",
                  cursor: "pointer",
              }}
              >
              Track order
              </button>
              </Link>
          </span>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Shopping Cart
            <span className="ml-10"><Link href="../orderTrack">
              <button
              style={{
                  background: "#fff",
                  border: "1px solid rgb(0, 85, 255)",
                  borderRadius: 5,
                  padding: "0.5rem 1rem",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#000",
                  cursor: "pointer",
              }}
              >
              Track order
              </button>
              </Link>
            </span>
          </h2>
          <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div className="flex gap-4" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col p-1 justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="text-md">
                        <p><span className="text-sm text-green-500">{item.quantity}x </span> 
                        <span className="">{item.price} Tk</span></p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{item.stock_status}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
                <a href="/cart">
                <button
                  className="border rounded-md py-2 px-4 ring-1 ring-gray-300 bg-white text-black hover:bg-red-100 hover:text-black transition-colors"
                >
                  View Cart
                </button>
                </a>
              <a href="/checkout">
                <button className="rounded-md py-2 px-4 bg-black text-white hover:bg-red-100 hover:text-black hover:ring-1 transition-colors">
                  Checkout
                </button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
