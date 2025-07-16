"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CartModal from './cartModal';
import api from '../../../utils/axios';
import { useCart } from '../cart/cart';

const NavIcons = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [success, setSuccess] = useState("");
    const { items, removeFromCart } = useCart();

    const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const router = useRouter();

    const handleProfile = () =>{
        setIsProfileOpen((prev) => !prev);
    }

    let isLoggedIn = localStorage.getItem("token") ? true : false;
    const handleLogout = async() => {
        const token = localStorage.getItem("token");
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        isLoggedIn = false;
        setIsProfileOpen(false);

        const res = await api.post('/users/signout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Logout response:", res.data);
        setSuccess("Logged out successfully");
        if(res.status === 200) {
            setTimeout(() => {
                router.push("../pages/api/auth");
            }, 1200);
        }
    };

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <Image
                src="/profile.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
                // onClick={login}
                onClick={handleProfile}
                // onMouseOver={() => setIsProfileOpen(true)}
                // onMouseLeave={() => setIsProfileOpen(false)}
                
            />
            {isProfileOpen && isLoggedIn && (
                <div
                    className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm z-20"
                    style={{ boxShadow: "0 3px 10px rgb(0,0,0,0.2)" }}
                >
                    <div><Link href="../../pages/profile">Profile</Link></div>
                    <div className="mt-2 cursor-pointer" onClick={handleLogout}>
                        <Link href="../../pages/api/auth">Logout</Link>
                    </div>
                </div>
            ) || isProfileOpen && !isLoggedIn && (
                <div
                    className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm z-20"
                    style={{ boxShadow: "0 3px 10px rgb(0,0,0,0.2)" }}
                >
                    <div><Link href="../../pages/api/auth">Login</Link></div>
                </div>
            )}
            <Image
                src="/notification.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
            />
            <div
                className="relative cursor-pointer"
                onClick={() => setIsCartOpen((prev) => !prev)}
                // onMouseOver={() => setIsCartOpen(true)}
                // onMouseLeave={() => setIsCartOpen(false)}
            >
                <Image src="/cart.png" alt="" width={70} height={70} />
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 rounded-full text-white text-sm flex items-center justify-center">
                {/* {counter} */}
                {`${itemsCount}`}
                </div>
            </div>
            {isCartOpen && <CartModal />}
        </div>
    );
};

export default NavIcons;