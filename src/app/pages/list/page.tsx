"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Filter from "@/app/components/filter"
import ProductList from '@/app/components/productList';
import Skeleton from '@/app/components/skeleton';

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
                <Image src="/woman.png" alt="" fill className="object-contain" />
                </div>
            </div>
            {/* FILTER */}
            <Filter />
            {/* PRODUCTS */}
            <h1 className="mt-12 text-xl font-semibold">    
                {/* {cat?.collection?.name}  */}
                For You!
            </h1>
            <Suspense fallback={<Skeleton/>}>
                {/* <ProductList
                categoryId={
                    cat.collection?._id || "00000000-000000-000000-000000000001"
                }
                searchParams={searchParams}
                /> */}
                <div className="mt-12 mb-12 flex justify-center width-full">

                        {/* Example: Render more cards or map over products */}
                    <ProductList/>
                    
                </div>
            </Suspense>
        </div>
    );
};

export default List;