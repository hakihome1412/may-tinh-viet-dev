import Link from "next/link";

export default function DemandFilter({
  dataDemands = [],
  searchParams,
  dataQueryDemands = [],
}: {
  dataDemands: any[];
  searchParams: any;
  dataQueryDemands: any[];
}) {
  if (!dataDemands?.length) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border border-slate-200 p-2 mt-4">
      <p className="uppercase font-semibold text-sm">Nhu cầu sử dụng</p>

      <div className="flex items-center gap-2 w-full mt-2 flex-wrap">
        {dataDemands.map((item: any) => {
          const isFilter = dataQueryDemands?.includes(item.slug);
          const newQueryDemands = [...dataQueryDemands];
          const query = { ...searchParams };

          if (isFilter) {
            const itemFindIndex = newQueryDemands.findIndex(
              (it) => it === item.slug
            );

            if (itemFindIndex > -1) {
              newQueryDemands.splice(itemFindIndex, 1);
            }
          } else {
            newQueryDemands.push(item.slug);
          }

          if (newQueryDemands.length > 0) {
            query.demands = newQueryDemands.join(",");
          } else {
            delete query.demands;
          }

          return (
            <Link
              scroll={false}
              key={item.id}
              href={{
                pathname: "/shop",
                query,
              }}
            >
              <div
                className={`p-2 text-xs border rounded-md transition hover:border-sky-600 ${
                  isFilter ? "border-sky-600" : "border-slate-200"
                }`}
              >
                <span>
                  {item.name}{" "}
                  <span className="font-semibold">({item.product_count})</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
