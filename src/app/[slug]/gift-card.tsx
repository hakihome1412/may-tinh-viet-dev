"use client";

import { getImageSanity } from "@/sanity/utils/image-url";
import { getAlt } from "@/utils";
import Image from "next/image";

export default function GiftCard({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div
          key={item?.id}
          className="flex justify-center items-center flex-col gap-2"
        >
          <p>{item?.name}</p>

          <Image
            width={500}
            height={500}
            src={getImageSanity(item?.image)}
            alt={getAlt(item?.name)}
            className="w-full"
            priority
          />
        </div>
      ))}
    </div>
  );
}
