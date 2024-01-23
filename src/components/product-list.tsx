"use client";

import { getImageSanity } from "@/sanity/utils/image-url";
import { formatPrice, getAlt } from "@/utils";
import { Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";

const ItemStyled = styled.div`
  .img-change {
    &#img-0 {
      opacity: 1;
      transform: scale(1.1) translateZ(0);
    }

    &#img-1 {
      opacity: 0;
    }
  }

  &:hover {
    .img-change {
      &#img-0 {
        opacity: 0;
        transform: scale(1) translateZ(0) translateY(0) !important;
      }

      &#img-1 {
        opacity: 1;
      }
    }
  }
`;

const RateStyled = styled(Rate)`
  .ant-rate-star {
    margin-inline-end: 0 !important;
    */ &.ant-rate-star-zero {
      color: inherit;
    }
    &.ant-rate-star-full {
      color: rgb(2 132 199);
    }
    &.ant-rate-star-half {
      color: rgb(2 132 199);
    }
  }
`;

export default function ProductList({ items }: { items?: any[] }) {
  if (!items || !items.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-5">
      {[...items].map((item) => (
        <Link key={item?.id} href={item.slug}>
          <ItemStyled className="bg-white w-full transition rounded-md shadow-md duration-300 overflow-hidden relative border border-slate-100 hover:border-primary hover:z-30 hover:-translate-y-[6px] hover:shadow-2xl">
            <div className="h-[132px] flex items-center justify-center relative overflow-hidden md:h-[200px]">
              {item?.images?.map((img: any, index: number) => (
                <Image
                  key={index}
                  width={500}
                  height={500}
                  priority
                  src={getImageSanity(img)}
                  alt={getAlt(item?.name)}
                  className={`h-full w-[70%] rounded-md absolute transition duration-500 ${
                    item.images.length > 0 ? "img-change" : ""
                  } md:w-[90%]`}
                  id={`img-${index}`}
                />
              ))}
            </div>

            <div className="text-xs bg-slate-400 text-white py-1 px-3 font-light w-fit">
              Có {item?.configurations?.length} lựa chọn cấu hình
            </div>

            <div className="p-2">
              {/* Name */}
              <p className="uppercase font-semibold text-center text-primary line-clamp-2 h-[40px] text-sm md:text-base md:h-[48px]">
                {item?.name}
              </p>

              {/* CPU, RAM, SSD, VGA */}
              <div>
                {item?.configurations[0]?.cpu && (
                  <div className="flex gap-2 border-b py-1 mx-2">
                    <div className="w-1/6 text-sm font-semibold text-gray-500 my-auto">
                      CPU
                    </div>
                    <div className="w-5/6 text-xs my-auto text-gray-500 line-clamp-1">
                      {item?.configurations[0]?.cpu}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 border-b py-1 mx-2">
                  <div className="w-1/6 text-sm font-semibold text-gray-500 my-auto">
                    RAM
                  </div>
                  <div className="w-5/6 text-xs my-auto text-gray-500 line-clamp-1">
                    {item?.configurations[0]?.ram}
                  </div>
                </div>

                <div className="flex gap-2 border-b py-1 mx-2">
                  <div className="w-1/6 text-sm font-semibold text-gray-500 my-auto">
                    SSD
                  </div>
                  <div className="w-5/6 text-xs my-auto text-gray-500 line-clamp-1">
                    {item?.configurations[0]?.ssd}
                  </div>
                </div>

                <div className="flex gap-2 border-b py-1 mx-2">
                  <div className="w-1/6 text-sm font-semibold text-gray-500 my-auto">
                    VGA
                  </div>
                  <div className="w-5/6 text-xs my-auto text-gray-500 line-clamp-1">
                    {item?.configurations[0]?.vga}
                  </div>
                </div>
              </div>

              {/* Comments and Price */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="flex items-center gap-2">
                  <RateStyled
                    allowHalf
                    disabled
                    value={item?.rate}
                    className="text-sm md:text-base"
                  />

                  <span className="text-xs text-gray-500">
                    {item?.comments} Đánh giá
                  </span>
                </div>

                <span className="text-sm mt-3">
                  Giá từ:{" "}
                  <span className="text-base font-semibold text-primary md:text-lg">
                    {formatPrice(item?.price)}
                  </span>
                </span>
              </div>
            </div>
          </ItemStyled>
        </Link>
      ))}
    </div>
  );
}
