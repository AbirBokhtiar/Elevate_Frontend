// /src/app/components/List.tsx
"use client";

import React from 'react';
import Filter from './filter';
import ProductList from './productList';

const List = () => {
  return (
    <div>
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-red-500 text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <img src="/woman.png" alt="Campaign" className="object-contain w-full h-full" />
        </div>
      </div>

      {/* FILTER */}
      <Filter />

      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">For You!</h1>

      <div className="mt-12 mb-12 flex justify-center w-full">
        <ProductList />
      </div>
    </div>
  );
};

export default List;
