"use client";

import { getImageSanity } from "@/sanity/utils/image-url";
import { getAlt } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function BrandFilter({
  dataBrands = [],
  dataQueryBrands = [],
  searchParams,
}: {
  dataBrands: any[];
  dataQueryBrands: any[];
  searchParams: any;
}) {
  if (!dataBrands?.length) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border border-slate-200 p-2 mt-4">
      <p className="uppercase font-semibold text-sm">Thương hiệu</p>

      <div className="flex items-center gap-2 w-full mt-2 flex-wrap">
        {dataBrands.map((item: any) => {
          const isFilter = dataQueryBrands?.includes(item?.slug);
          const newQueryBrands = [...dataQueryBrands];
          const query = { ...searchParams };

          if (isFilter) {
            const itemFindIndex = newQueryBrands.findIndex(
              (it) => it === item?.slug
            );

            if (itemFindIndex > -1) {
              newQueryBrands.splice(itemFindIndex, 1);
            }
          } else {
            newQueryBrands.push(item?.slug);
          }

          if (newQueryBrands.length > 0) {
            query.brands = newQueryBrands.join(",");
          } else {
            delete query.brands;
          }

          return (
            <Link
              scroll={false}
              key={item?.id}
              href={{
                pathname: "/shop",
                query,
              }}
            >
              <div
                className={`w-[120px] h-[36px] flex items-center justify-center px-3 py-1 border rounded-md transition hover:border-sky-600 ${
                  isFilter ? "border-sky-600" : "border-slate-200"
                }`}
              >
                <Image
                  alt={getAlt(item?.slug)}
                  src={getImageSanity(item?.logo)}
                  width={500}
                  height={500}
                  className="w-full h-full"
                  priority
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
