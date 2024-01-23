"use client";

import { getImageSanity } from "@/sanity/utils/image-url";
import Image from "next/image";
import Link from "next/link";

export default function DemandHome({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-1 mt-1 md:grid-cols-4">
      {items.map((item: any) => (
        <Link
          key={item.id}
          href={{
            pathname: "/shop",
            query: {
              demands: item.slug,
            },
          }}
        >
          <div className="flex items-center h-[100px] justify-center relative overflow-hidden grayscale transition duration-300 rounded-md hover:grayscale-0 md:h-[170px]">
            <Image
              width={500}
              height={500}
              src={getImageSanity(item.image)}
              alt={item.slug}
              className="w-full h-full"
              priority
            />

            <div className="flex items-center uppercase justify-center absolute text-white font-semibold w-full py-3 bg-black opacity-70 text-center text-sm md:text-xl">
              {item.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
