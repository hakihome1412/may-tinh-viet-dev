"use client";

import React, { useEffect, useState } from "react";
import Container from "./layouts/container";
import Link from "next/link";
import ButtonSecondary from "./buttons/button-secondary";
import { Dropdown, MenuProps } from "antd";
import MenuIcon from "./icons/MenuIcon";

const contents = [
  {
    key: 1,
    name: "Tin Tức",
    url: "tin-tuc",
  },
  {
    key: 2,
    name: "Khuyến Mãi",
    url: "khuyen-mai",
  },
  {
    key: 3,
    name: "Trả Góp",
    url: "/tra-gop",
  },
  {
    key: 4,
    name: "Thanh Toán",
    url: "thanh-toan",
  },
  {
    key: 5,
    name: "Kiểm Tra Bảo Hành",
    url: "kiem-tra-bao-hanh",
  },
  {
    key: 6,
    name: "Liên Hệ",
    url: "lien-he",
  },
];

type Props = {
  dataDemands?: any[];
  dataBrands?: any[];
};

export default function TopBarFixedScroll({ dataBrands, dataDemands }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const items: MenuProps["items"] = [
    {
      key: "brands",
      label: (
        <span className="font-semibold uppercase">Chọn theo thương hiệu</span>
      ),
      children:
        dataBrands?.map((item) => ({
          key: `brands-${item?.slug}`,
          label: <span className="font-semibold uppercase">{item?.name}</span>,
        })) || [],
    },
    ...(dataDemands?.map((item) => ({
      key: item?.slug,
      label: <span className="font-semibold uppercase">{item?.name}</span>,
    })) || []),
  ];

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full z-50 bg-white hidden md:block ${
          scrollPosition >= 280
            ? "fixed duration-500 top-0 shadow-md py-2 animate-move-down"
            : ""
        }`}
      >
        <Container>
          <div className="flex gap-2 justify-between">
            <Dropdown
              menu={{ items }}
              className="bg-primary transition text-white font-semibold p-3 rounded-md cursor-pointer hover:bg-primary-hover"
            >
              <div className="cursor-pointer">
                <div className="flex items-center uppercase">
                  <MenuIcon className="mr-2" />
                  Danh mục sản phẩm
                </div>
              </div>
            </Dropdown>

            {contents.map((item) => (
              <Link href={item.url} key={item.key}>
                <ButtonSecondary className="text-sm py-[12px] min-w-[152px]">
                  {item.name}
                </ButtonSecondary>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {scrollPosition >= 280 && <div className="h-[44px]" />}
    </>
  );
}
