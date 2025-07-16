"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OAuth from "oauth-1.0a";
import React, { useEffect, useState } from "react";
import crypto from "crypto";
import axios from "axios";
import { clear } from "console";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const Filter = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [clearFilter, setClearFilter] = useState(false);
  const sort = searchParams?.get("sort");
  const type = searchParams?.get("type");


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/woocommerce/categories`);
        const childCategories = res.data.filter(
          (cat: any) =>
            cat.parent > 0 &&
            cat.slug.toLowerCase() !== "uncategorized" &&
            cat.count >= 0
        );
        setCategories(childCategories);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);


 
  const getParentCategoryId = (type: string) => {
  const parent = categories.find(
    (cat) =>
      cat.name.toLowerCase() === type.toLowerCase() ||
      cat.slug.toLowerCase() === type.toLowerCase()
  );
  return parent ? parent.id : null;
};

// Helper to filter categories by type and parent
const getFilteredCategories = () => {
  if (type === "men" || type === "women") {
    const parentId = getParentCategoryId(type);
    if (!parentId) return [];
    return categories.filter((cat) => cat.parent === parentId);
  }
  return categories;
};



  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value === "") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    if (name === "cat") {
      // When selecting a category, do not overwrite type
    }

    // if (name === "type") {
    //   // Remove previous cat filter if type changes
    //   params.delete("cat");
    // }

    if (name === "sort") {
      if (value === "asc price") {
        params.set("orderby", "price");
        params.set("order", "asc");
      } else if (value === "desc price") {
        params.set("orderby", "price");
        params.set("order", "desc");
      } else if (value === "asc lastUpdated") {
        params.set("orderby", "date");
        params.set("order", "asc");
      } else if (value === "desc lastUpdated") {
        params.set("orderby", "date");
        params.set("order", "desc");
      } else {
        params.delete("orderby");
        params.delete("order");
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };


  const handleClearFilters = () => {
    setClearFilter(true);
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("type");
    params.delete("min");
    params.delete("max");
    params.delete("cat");
    params.delete("sort");

    params.delete("orderby");
    params.delete("order");

    replace(`${pathname}?${params.toString()}`);
  };


  return (
    <div className="bg-white sticky top-20 z-20 p-2 mt-12">
    <div className="flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          value={searchParams?.get("cat") || ""}
        >
          <option value="">Type</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400 border border-gray-500"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-500 border border-gray-500"
          onChange={handleFilterChange}
        />
        {/* Category Filter */}
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          value={searchParams?.get("cat") || ""}
        >
          <option value="">Category</option>
          {getFilteredCategories().map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </option>
          ))}
        </select>
        <select
          name=""
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option>All Filters</option>
        </select>
        <button
          className="border border-gray-300 w-max py-2 px-4 text-xs hover:bg-red-600 rounded-2xl"
          onClick={clearFilter ? () => setClearFilter(false) : handleClearFilters}
        >&#10005; Clear</button>
      </div>
      <div>
        <select
          name="sort"
          className="py-2 px-2 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 border border-gray-500"
          onChange={handleFilterChange}
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="desc lastUpdated">Newest</option>
          <option value="asc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
    </div>
  );
};

export default Filter;