import React from "react";
import CloseIcon from "../icons/CloseIcon";
import { List, Spin } from "antd";
import SearchIcon from "../icons/SearchIcon";
import Link from "next/link";
import { getImageSanity } from "@/sanity/utils/image-url";
import { formatPrice, getAlt } from "@/utils";
import Image from "next/image";

type Props = {
  onClose?: () => void;
  open?: boolean;
  debounceSearch?: any;
  loading?: boolean;
  dataSearch?: any[];
};

export default function SearchMobile({
  dataSearch,
  debounceSearch,
  loading,
  onClose,
  open,
}: Props) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-white transition-all z-[9999] ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center gap-3 p-5 border-b border-slate-300">
        <button onClick={onClose}>
          <CloseIcon />
        </button>

        <p className="uppercase font-semibold text-lg">Tìm kiếm</p>
      </div>

      <div className="p-3">
        <div className="relative block mt-3">
          <input
            placeholder="Tìm sản phẩm ..."
            type="text"
            className="border border-gray-300 w-full rounded-full h-9 pl-12 pr-4 text-sm transition duration-500 placeholder-shown:italic focus-visible:outline-none focus:shadow-md"
            onChange={debounceSearch}
          />

          <div className="absolute left-4 top-[8px]">
            {loading ? (
              <Spin />
            ) : (
              <SearchIcon className="w-5 h-5 fill-gray-400" />
            )}
          </div>
        </div>

        <List
          itemLayout="horizontal"
          dataSource={dataSearch}
          renderItem={(item) => (
            <List.Item>
              <Link href={item?.slug} className="w-full">
                <List.Item.Meta
                  avatar={
                    <div className="rounded-full relative w-[60px] h-[60px] border border-slate-300 p-2">
                      <Image
                        src={getImageSanity(item?.image)}
                        alt={getAlt(item?.slug)}
                        width={500}
                        height={500}
                        priority
                        className="w-full h-full"
                      />
                    </div>
                  }
                  title={
                    <p className="font-semibold uppercase transition hover:text-sky-600">
                      {item?.name}
                    </p>
                  }
                  description={
                    <div>
                      <p>Có {item?.count_configuration} cấu hình lựa chọn</p>
                      <p>
                        Giá chỉ từ:{" "}
                        <span className="font-semibold text-base text-sky-600">
                          {formatPrice(item?.price)}
                        </span>
                      </p>
                    </div>
                  }
                />
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
