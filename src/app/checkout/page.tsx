"use client";
import { useCart } from "../cart/cart";
import { placeOrder } from "../lib/wooCheckout";
import { useState, useEffect } from "react";
import api from "../../../utils/axios";

const CheckoutPage = () => {
    const { items, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [orderInfo, setOrderInfo] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address_1: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
    });

    // console.log("No user is logged in");

    useEffect(() => {
        const currentUser = sessionStorage.getItem("user");
        if (currentUser) {
        const userData = JSON.parse(currentUser);
        setCustomer((prev) => ({
            ...prev,
            first_name: userData.name?.split(" ")[0] || "",
            last_name: userData.name?.split(" ")[1] || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address_1: userData.address || "",
            city: userData.city || "",
            state: userData.state || "",
            postcode: userData.postcode || "",
            country: userData.country || "",
        }));
        }
    }, []);

    // console.log("A user is logged in");


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    // const handleCheckout = async () => {
    //     try {
    //         setLoading(true);
    //         const order = await placeOrder(items, customer);

    //         const payload = {
    //             id: order.id,
    //             email: order.billing.email,
    //             items: order.line_items.map((item: any) => ({
    //                 name: item.name,
    //                 price: item.total,
    //             })),
    //             total: order.total,
    //         };

    //         await api.post("/invoice/send-invoice", payload)
    //             .then(res => {
    //                 alert(res.data.message); // or show in UI
    //                 setOrderInfo(order);
    //                 clearCart();
    //             })
    //             .catch(err => {
    //                 alert("Failed to send invoice");
    //             });
            

    //     } catch (err) {
    //         console.error("Checkout failed:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleCheckout = async () => {
        try {
            setLoading(true);

            // 1. Create WooCommerce order
            const order = await placeOrder(items, customer);

            let redirectUrl = null;
            if (paymentMethod === "stripe") {
                const stripeRes = await api.post("/payments/stripe-intent", { orderId: order.id });
                const clientSecret = stripeRes.data.clientSecret;

                // Send clientSecret to Stripe.js
                // You can redirect to /pay/stripe?secret=clientSecret
                redirectUrl = `/pay/stripe?secret=${clientSecret}`;

            } else if (paymentMethod === "sslcommerz") {
                const sslRes = await api.post("/payments/sslcommerz-initiate", { orderId: order.id });
                redirectUrl = sslRes.data.gatewayUrl; // This is an external URL

            } else if (paymentMethod === 'bkash') {
                const res = await api.post("/payments/bkash-initiate", { orderId: order.id });
                const paymentID = res.data.paymentID;

                const executeRes = await api.post("/payments/bkash-execute", {
                    paymentID,
                    orderId: order.id,
                });

                if (executeRes.data.transactionStatus === "Completed") {
                    setOrderInfo(order);
                    clearCart();
                } else {
                    alert("bKash payment failed or incomplete. Try again.");
                    return;
                }
            }


            // 2. Optional: send invoice
            await api.post("/invoice/send-invoice", {
            id: order.id,
            email: order.billing.email,
            items: order.line_items.map((item: any) => ({ name: item.name, price: item.total })),
            total: order.total,
            });

            // 3. Redirect or show COD success
            if (paymentMethod === "cod") {
            setOrderInfo(order);
            clearCart();
            } if (paymentMethod !== "cod" && paymentMethod !== "bkash" && redirectUrl) {
                window.location.href = redirectUrl;
            }

        } catch (err) {
            console.error("Checkout failed:", err);
        } finally {
            setLoading(false);
        }
    };


    const total = items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-md">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            {orderInfo ? (
                <div className="text-green-600 text-lg font-semibold">
                    Order placed! Order ID: {orderInfo.id}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Billing Details */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
                        <form
                            className="space-y-4"
                            onSubmit={e => {
                                e.preventDefault();
                                handleCheckout();
                            }}
                        >
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={customer.first_name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-1/2 border rounded px-3 py-2"
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={customer.last_name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-1/2 border rounded px-3 py-2"
                                />
                            </div>
                            <input
                                type="text"
                                name="address_1"
                                placeholder="address_1"
                                value={customer.address_1}
                                onChange={handleInputChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={customer.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-1/2 border rounded px-3 py-2"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={customer.state}
                                    onChange={handleInputChange}
                                    required
                                    className="w-1/2 border rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="postcode"
                                    placeholder="Postcode"
                                    value={customer.postcode}
                                    onChange={handleInputChange}
                                    required
                                    className="w-1/2 border rounded px-3 py-2"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={customer.country}
                                    onChange={handleInputChange}
                                    required
                                    className="w-1/2 border rounded px-3 py-2"
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={customer.email}
                                onChange={handleInputChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={customer.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                            <button
                                type="submit"
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full py-3 bg-black text-white rounded font-semibold mt-4"
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </div>
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                        <div className="border rounded p-4 bg-gray-50">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2">Product</th>
                                        <th className="text-right py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className="py-2">
                                                {item.name} × {item.quantity}
                                            </td>
                                            <td className="py-2 text-right">
                                                {(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="font-bold py-2">Total</td>
                                        <td className="font-bold py-2 text-right">
                                            {total.toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Payment method placeholder */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Payment Method</h3>
                            <div className="flex items-center gap-4 text-sm">
                                {/* <input type="radio" name="payment" value="stripe" onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label>Pay with Card (Stripe)</label>

                                <input type="radio" name="payment" value="sslcommerz" onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label>SSLCommerz (bKash/Nagad/Card)</label> */}

                                <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label>Cash on Delivery</label>

                                <input type="radio" name="payment" value="bkash" onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label>bKash (Direct)</label>

                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                (Only Cash on Delivery is available for demo)
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
