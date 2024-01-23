"use client";

import CloseIcon from "@/components/icons/CloseIcon";
import Link from "next/link";

export default function DetailFilter({
  dataBrands = [],
  dataDemands = [],
  searchParams,
  dataQueryBrands = [],
  dataQueryDemands = [],
  dataFilterAdvanced = [],
  dataPrices,
}: {
  dataBrands: any[];
  dataDemands: any[];
  dataPrices: any[];
  dataFilterAdvanced: any[];
  searchParams: {
    demands: any;
    brands: any;
    price_from: string;
    price_to: string;
    [any: string]: any;
  };
  dataQueryBrands: any[];
  dataQueryDemands: any[];
}) {
  const { price_from, price_to, ...queryWithoutPrice } = searchParams;
  const itemPrice = dataPrices.find(
    (it: any) => it?.from === Number(price_from) && it?.to === Number(price_to)
  );

  return (
    <div className="w-full rounded-lg border border-slate-200 p-2">
      <p className="uppercase font-semibold text-sm">Đã chọn</p>

      <div className="flex items-center gap-2 w-full mt-2 flex-wrap">
        {/* Thương hiệu */}
        {dataQueryBrands.map((item: string, index: number) => {
          const itemBrand = dataBrands.find((it: any) => it?.slug === item);
          const newArrBrand = [...dataQueryBrands];
          newArrBrand.splice(index, 1);
          const query = { ...searchParams };

          if (newArrBrand.length > 0) {
            query.brands = newArrBrand.join(",");
          } else {
            delete query.brands;
          }

          if (!itemBrand) {
            return null;
          }

          return (
            <Link
              key={item}
              href={{
                pathname: "/shop",
                query,
              }}
            >
              <div className="py-1 px-2 gap-1 border border-slate-500 rounded-md text-sm flex items-center text-slate-500 transition hover:border-sky-600 hover:text-sky-600">
                {itemBrand.name}
                <CloseIcon />
              </div>
            </Link>
          );
        })}

        {/* Nhu cầu sử dụng */}
        {dataQueryDemands.map((item: string, index: number) => {
          const itemDemand = dataDemands.find((it: any) => it?.slug === item);

          const newArrDemand = [...dataQueryDemands];
          newArrDemand.splice(index, 1);
          const query = { ...searchParams };

          if (newArrDemand.length > 0) {
            query.demands = newArrDemand.join(",");
          } else {
            delete query.demands;
          }

          if (!itemDemand) {
            return null;
          }

          return (
            <Link
              scroll={false}
              key={item}
              href={{
                pathname: "/shop",
                query,
              }}
            >
              <div className="py-1 px-2 gap-1 border border-slate-500 rounded-md text-sm flex items-center text-slate-500 transition hover:border-sky-600 hover:text-sky-600">
                {itemDemand.name}
                <CloseIcon />
              </div>
            </Link>
          );
        })}

        {/* Mức giá */}
        {itemPrice && (
          <Link
            href={{
              pathname: "/shop",
              query: {
                ...queryWithoutPrice,
              },
            }}
          >
            <div className="py-1 px-2 gap-1 border border-slate-500 rounded-md text-sm flex items-center text-slate-500 transition hover:border-sky-600 hover:text-sky-600">
              {itemPrice.name}
              <CloseIcon />
            </div>
          </Link>
        )}

        {/* Bộ lọc nâng cao */}
        {dataFilterAdvanced.map((item: any) => {
          const arrKeyParams = Object.keys(searchParams);
          const isHas = arrKeyParams.includes(item.slug);

          const itemFilterAdvanced = dataFilterAdvanced.find(
            (it: any) => it?.slug === item.slug
          );

          const itemOptionFilterAdvanced = itemFilterAdvanced?.options?.find(
            (it: any) => it?.slug === searchParams?.[item?.slug]
          );

          const query = { ...searchParams };
          delete query?.[item?.slug];

          if (!isHas) {
            return null;
          }

          return (
            <Link
              key={item?.slug}
              href={{
                pathname: "/shop",
                query: {
                  ...query,
                },
              }}
            >
              <div className="py-1 px-2 gap-1 border border-slate-500 rounded-md text-sm flex items-center text-slate-500 transition hover:border-sky-600 hover:text-sky-600">
                {itemOptionFilterAdvanced?.name}
                <CloseIcon />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
