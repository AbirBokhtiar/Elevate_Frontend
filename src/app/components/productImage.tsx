'use client';

import { useState } from "react";
import Image from "next/image";

type Props = {
  product: any;
};

const ProductImage = ({ product }: Props) => {
  const [index, setIndex] = useState(0);
  const images = product.images || [];

  if (!images.length) return <p>No images available</p>;

  return (
    <div>
      <div className="h-[500px] w-full relative mb-6">
        <img
          src={images[index]?.src}
          alt={product.name}
          width={800}
          height={800}
          className="object-cover rounded-md w-full h-full"
          // priority
        />
      </div>

      <div className="flex gap-4 mt-2">
        {images.map((img: any, i: number) =>
          i === 0 ? null : (
            <div
              key={img.id}
              className="w-24 h-24 relative cursor-pointer"
              onClick={() => setIndex(i)}
            >
              <img>
                src={img.src}
                alt={`Thumbnail ${i}`}
                width={100}
                height={100}
                className="object-cover rounded-md w-full h-full"
              </img>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductImage;
