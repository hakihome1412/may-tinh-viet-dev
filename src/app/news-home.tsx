import { getAlt } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function NewsHome({ items }: { items: any[] }) {
  return (
    <div className="hidden md:grid md:grid-cols-4 md:gap-1 md:mt-1">
      {items.map((item) => (
        <Link key={item?.id} href="/">
          <div className="flex items-center justify-center h-[170px] relative overflow-hidden transition duration-300 rounded-md hover:opacity-90">
            <Image
              width={500}
              height={500}
              src={item?.src}
              alt={getAlt(item?.name)}
              className="h-full"
              priority
            />

            <div className="absolute bottom-0 p-2 text-white font-semibold w-full">
              {item?.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
