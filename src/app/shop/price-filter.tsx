import Link from "next/link";

export default function PriceFilter({
  dataPrices = [],
  searchParams,
  from,
  to,
}: {
  dataPrices: any[];
  searchParams: any;
  from: string;
  to: string;
}) {
  if (!dataPrices?.length) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border border-slate-200 p-2 mt-4">
      <p className="uppercase font-semibold text-sm">Chọn theo mức giá</p>

      <div className="flex items-center gap-2 w-full mt-2 flex-wrap">
        {dataPrices.map((item: any) => {
          const isFilter = item.from === Number(from) && item.to === Number(to);

          return (
            <Link
              scroll={false}
              key={item.id}
              href={{
                pathname: "/shop",
                query: {
                  ...searchParams,
                  price_from: isFilter ? undefined : item.from,
                  price_to: isFilter ? undefined : item.to,
                },
              }}
            >
              <div
                className={`p-2 text-xs border rounded-md transition hover:border-sky-600 ${
                  isFilter ? "border-sky-600" : "border-slate-200"
                }`}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
