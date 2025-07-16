"use client";

import React from 'react';

const CustomizeProducts = () => {

    const handleColorClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const selectedColor = e.currentTarget;
        const siblings = selectedColor.parentElement?.children as HTMLCollectionOf<HTMLElement>;
        // for (let i = 0; i < siblings.length; i++) {
        //     siblings[i].classList.remove("border-1", "border-blue-500");
        // }
        // selectedColor.classList.add("border-1", "border-blue-500");
        // add whole div
        const ringElement = selectedColor.querySelector('.ring-2');
        if (ringElement) {
            ringElement.classList.remove("hidden");
            ringElement.classList.add("block");
        }
        // Remove the ring from all other elements
        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] !== selectedColor) {
                const siblingRingElement = siblings[i].querySelector('.ring-2');
                if (siblingRingElement) {
                    siblingRingElement.classList.remove("block");
                    siblingRingElement.classList.add("hidden");
                }
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* COLOR */}
            <h4 className="font-medium">Choose a color</h4>
            <ul className="flex items-center gap-4">
                <li className="w-6 h-6 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500 flex items-center justify-center hover:border-1 hover:border-blue-500" onClick = {handleColorClick}>
                    {/* <div className="hidden absolute w-8 h-8 rounded-full ring-2 ring-red-500 transform -translate-x-1/2 -translate-y-1/2 border-1 border-blue-500" /> */}
                </li>
                <li className="w-6 h-6 rounded-full ring-1 ring-gray-300 flex items-center justify-center cursor-pointer relative bg-gray-500 hover:border-1 hover:border-blue-500"onClick = {handleColorClick}>
                    {/* <div className="hidden absolute w-8 h-8 rounded-full ring-2 ring-blue-500 transform -translate-x-1/2 -translate-y-1/2 border-1 border-blue-500"/> */}

                </li>
                <li className="w-6 h-6 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500" onClick = {handleColorClick}>
                <div className="absolute w-8 h-[2px] bg-red-400 rotate-45 mt-2 transform -translate-x-1/2 -translate-y-1/2 " />
                </li>
            </ul>
            {/* OTHERS */}
            <h4 className="font-medium">Choose a size</h4>
            <ul className="flex items-center gap-3">
                <li className="ring-1 border-1 border-red-500 text-red-500 bg-white-500 rounded-md py-1 px-4 text-sm cursor-pointer">
                Small
                </li>
                <li className="ring-1 ring-red-500 text-white bg-red-500 rounded-md py-1 px-4 text-sm cursor-pointer">
                Medium
                </li>
                <li className="ring-1 ring-pink-200 text-white bg-red-300 rounded-md py-1 px-4 text-sm cursor-not-allowed">
                Large
                </li>
            </ul>
        </div>
    );
};

export default CustomizeProducts;