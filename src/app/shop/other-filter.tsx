"use client";

import { Select } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function OtherFilter({
  dataFilterAdvanced = [],
  searchParams,
}: {
  dataFilterAdvanced: any[];
  searchParams: any;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (!value) {
        params.delete(name);

        return params.toString();
      }

      if (params.has(name)) {
        if (params.get(name) === value) {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (slug: string) => (value: string) => {
    router.push(`${pathname}?${createQueryString(slug, value)}`, {
      scroll: false,
    });
  };

  if (!dataFilterAdvanced?.length) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border border-slate-200 p-2 mt-4">
      <p className="uppercase font-semibold text-sm">Bộ lọc nâng cao</p>

      <div className="flex items-center gap-2 w-full mt-2 flex-wrap">
        {dataFilterAdvanced.map((item: any) => {
          const options = item.options.map((it: any) => ({
            label: it.name,
            value: it.slug,
          }));

          return (
            <Select
              key={item.slug}
              placeholder={item.name}
              options={options}
              allowClear
              onChange={handleChange(item.slug)}
              value={searchParams?.[item.slug]}
            />
          );
        })}
      </div>
    </div>
  );
}
