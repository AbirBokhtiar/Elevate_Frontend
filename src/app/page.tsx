'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getAllProducts } from '../services/wooService';
import CategoryList from './components/categoryList';
import ProductList from './components/productList';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import Hero3D from './components/hero3D';
// import Slider from './components/slider';cls
import { ShieldCheck, Feather, Sparkles } from 'lucide-react'; // at the top

export default function Home() {
  const [products, setProducts] = useState([]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 0.8, 0.6, 0.8, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 1]);

  return (
    
    <div className="bg-neutral-50 min-h-screen relative font-sans">

      {/* <Slider /> */}
      

      {/* Hero Section */}
      <div className="relative h-screen z-0">
        
        <Image 
          src='/background4.jpg'
          // width={500}
          // height={800}
          
          alt='homepage'
          className='absolute top-0 left-0 w-full h-full object-cover z-0'
          fill
        />

        
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20 z-20"
          style={{ opacity: sectionOpacity }}
        >
          <Image 
            src='/homepage.jpg'
            width={1500}
            height={300}
            alt='homepage'
            className='absolute top-160 left-0 w-full object-cover z-10 opacity-60'
            // fill
          />

          {/* Hero 3D Scene */}
          <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none">
            <Hero3D scrollYProgress={scrollYProgress} />
          </div>
          
          <div className="text-center max-w-3xl px-6 z-30">
            <motion.h1
              className="text-5xl md:text-6xl font-light text-black tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Timeless Style */}
            </motion.h1>
            <motion.p
              className="text-lg text-black mt-4 max-w-xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Crafted with precision, designed for simplicity.
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link
                  href="/list"
                  className="relative z-50 inline-block bg-transparent border border-gray text-black px-6 py-2 mt-6 rounded-none hover:bg-violet-100 transition-colors font-medium text-bold text-black transition-colors text-sm font-medium tracking-wide"
                  aria-label="Explore the Trend collection"
                >
                  Explore Collection
                </Link>
              
            </motion.div>
          </div>
        </motion.div>
      </div>
  

      <motion.section
        className="py-24 px-4 max-w-7xl mx-auto z-0"
        style={{ opacity: sectionOpacity, scale: sectionScale }}
      >
        <motion.h2
          className="text-3xl font-light text-gray-900 mb-12 text-center tracking-wide"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Elevate
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <ShieldCheck className="w-10 h-10 mx-auto text-blue-600 mb-4" />,
              title: 'Crafted Quality',
              desc: '100% cotton denim for lasting durability.',
            },
            {
              icon: <Feather className="w-10 h-10 mx-auto text-green-600 mb-4" />,
              title: 'Effortless Comfort',
              desc: 'Soft lining for all-day wear.',
            },
            {
              icon: <Sparkles className="w-10 h-10 mx-auto text-yellow-500 mb-4" />,
              title: 'Timeless Design',
              desc: 'Minimalist style, maximum versatility.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {feature.icon}
              <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>



      

      {/* Overlay Content */}
      <div className="relative z-10">
        {/* Overview Section */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 lg:px-24" style={{ opacity: sectionOpacity, scale: sectionScale }}>
          <div className="text-center bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-3xl">
            <motion.h1 className="text-5xl font-lg text-gray-900 mb-6" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              Elevate your essentials.
              Elevate your lifestyle
            </motion.h1>
            <motion.p className="text-xl text-gray-600 mb-6" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Discover our premium collection that captures elegance and everyday edge.
            </motion.p>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Link href="/pages/list" className="inline-block bg-transparent border border-gray text-black px-6 py-2 rounded-none hover:bg-violet-100 transition-colors font-medium text-bold text-black transition-colors text-sm font-medium tracking-wide">
                Shop Now
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 lg:px-24" style={{ opacity: 1, scale: sectionScale }}>
          <div className="text-center bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-3xl">
            <motion.h2 className="text-4xl font-bold text-gray-900 mb-6" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              About Us
            </motion.h2>
            <motion.ul className="text-gray-700 space-y-4 text-lg leading-relaxed" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              At Elevate, we believe in blending timeless design with modern comfort. Our mission is simple: to craft high-quality, minimalist apparel that fits seamlessly into your everyday life. Each piece is made with precision, premium fabrics, and a focus on durability — because you deserve style that lasts.
            </motion.ul>
          </div>
        </motion.section>

        {/* Specs Section */}
        {/* <motion.section className="min-h-screen flex items-center justify-center px-6 lg:px-24" style={{ opacity: sectionOpacity, scale: sectionScale }}>
          <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-3xl">
            <motion.h2 className="text-4xl font-bold text-gray-900 mb-6" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              Product Specs
            </motion.h2>
            <motion.div className="text-gray-700 space-y-3 text-lg" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <p><strong>Material:</strong> 100% Cotton Denim + Polyester Lining</p>
              <p><strong>Sizes:</strong> S, M, L, XL</p>
              <p><strong>Weight:</strong> Approx. 1.5 lbs</p>
              
            </motion.div>
            
          </div>
        </motion.section> */}

        {/* Buy Section */}
        <motion.section id="buy" className="min-h-screen flex items-center justify-center px-6 lg:px-24" style={{ opacity: sectionOpacity, scale: sectionScale }}>
          <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-3xl text-center">
            <motion.h2 className="text-4xl font-bold text-gray-900 mb-6" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              From Ordinary to Iconic
      
            </motion.h2>
            <motion.p className="text-xl text-gray-600 mb-6" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Add our signature pieces to your collection — quality meets everyday edge.
            </motion.p>
            
          </div>
        </motion.section>

        {/* Image Break */}
        <div className="my-24 flex justify-center">
          <Image src="/closet2.png" alt="closet collection" height={550} width={1050} />
        </div>

        {/* Featured Products */}
        <motion.section
          className="mt-24 px-6 lg:px-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <Suspense fallback={<div className="text-center text-gray-600">Loading...</div>}>
            <ProductList limit={4} />
          </Suspense>
        </motion.section>


        {/* Categories */}
        <motion.section className="mt-24 px-6 lg:px-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Categories</h2>
          <Suspense fallback={<div className="text-center text-gray-600">Loading...</div>}>
            <CategoryList />
          </Suspense>
        </motion.section>

        {/* All Products */}
        <motion.section className="mt-24 px-6 lg:px-24 pb-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">New Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any, index: number) => (
              <motion.div key={product.id} className="bg-white border rounded-xl p-4 shadow hover:shadow-xl transition-shadow duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Link href={`/product/${product.slug}`}>
                  <div className="cursor-pointer">
                    <Image src={product.images[0]?.src || '/placeholder.png'} alt={product.name} width={300} height={300} className="w-full h-48 object-cover rounded-md" />
                    <h3 className="text-lg font-semibold text-gray-800 mt-3">{product.name}</h3>
                    <p className="text-gray-600 mt-1">${product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
