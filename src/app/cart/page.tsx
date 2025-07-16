"use client";

import { useCart } from "../cart/cart";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart, updateQuantity } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="px-4 py-10 md:px-16 lg:px-40 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg text-gray-600">Your cart is currently empty.</p>
          <Link href="/">
            <button className="mt-6 px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col gap-6">
              {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 border-b pb-6 last:border-b-0"
          >
            <div className="w-80 h-80 relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                <p className="text-gray-500 text-md mt-1">{item.short_description || "No description available."}</p>
              </div>
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-2">
            <span className="font-medium">Quantity:</span>
            <button
              className="px-2 py-1 text-lg font-bold hover:bg-gray-100"
              onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button
              className="px-2 py-1 text-lg font-bold hover:bg-gray-100"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
                </div>
                <span className="text-gray-700 text-md">
            <span className="font-medium">Price:</span> {Number(item.price).toFixed(2)}Tk
                </span>
                <span className="text-gray-700 text-md">
            <span className="font-medium">Total:</span> {(Number(item.price) * item.quantity).toFixed(2)}Tk
                </span>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-md mt-2 hover:underline self-start"
              >
                Remove
              </button>
            </div>
          </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Order Summary</h2>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)}Tk</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 border-t pt-4">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <button
                className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link href="/checkout" className="bg-black rounded-md px-4 py-2 text-center hover:bg-gray-800 transition">
                <button className="text-white text-sm font-medium ">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Taxes and discounts calculated at checkout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
