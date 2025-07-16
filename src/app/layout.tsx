"use client";

import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
// import { Toaster } from 'react-hot-toast';
import Navbar from '../app/components/navbar';
import Footer from '../app/components/footer';
import { usePathname } from 'next/navigation';
import ChatWidget from '../app/components/chatbot';


const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'E-commerce App',
//   description: 'An e-commerce application built with Next.js and TypeScript',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // const [pathname, setPath] = useState<string>('');
  // useEffect(() => {
  //   const path = usePathname();
  //   setPath(path);
  // }, []);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const pathname = usePathname();
  const isLoginPage = pathname === '/pages/api/signup' || pathname === '/pages/api/auth';

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isLoginPage ? (
          <>
            <Navbar />
            {children}
            <Footer />
            <ChatWidget />
          </>
        ) : (
          <>
          {children}
          </>
        )}
        
      </body>
    </html>
  );
}
