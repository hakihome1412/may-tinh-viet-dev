"use client";

import ButtonPrimary from "@/components/buttons/button-primary";
import { formatPrice, getAlt, getTotalPriceCart } from "@/utils";
import Link from "next/link";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import GiftIcon from "@/components/icons/GiftIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import { SanityProductType, SanityCartType } from "@/types";
import TableCart from "./table-cart";
import Image from "next/image";
import { getImageSanity } from "@/sanity/utils/image-url";
import {
  addItemCart,
  changeQuantityItemCart,
  deleteItemCart,
  minusItemCart,
} from "@/sanity/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spin } from "antd";
import InputQuantity from "./input-quantity";
import ButtonDeleteItemCart from "./button-delete-item-cart";

type Props = {
  dataCart?: SanityCartType | null;
};

export default function CartContent({ dataCart }: Props) {
  const products = dataCart?.products || [];
  const total = getTotalPriceCart(products);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChangeQuantity =
    (record: SanityProductType) => async (value: number) => {
      setLoading(true);
      await changeQuantityItemCart({
        checkout_id: dataCart?.id!,
        product_configuration_id: record?._key!,
        quantity: value,
      });

      router.refresh();
      setLoading(false);
    };

  const handleAddQuantity = (record: SanityProductType) => async () => {
    setLoading(true);
    await addItemCart({
      checkout_id: dataCart?.id!,
      product_configuration_id: record?._key!,
    });
    router.refresh();
    setLoading(false);
  };

  const handleMinusQuantity = (record: SanityProductType) => async () => {
    setLoading(true);
    await minusItemCart({
      checkout_id: dataCart?.id!,
      product_configuration_id: record?._key!,
    });
    router.refresh();
    setLoading(false);
  };

  const handleDeleteItemCart = (record: SanityProductType) => async () => {
    setLoading(true);
    await deleteItemCart({
      checkout_id: dataCart?.id!,
      product: record,
    });
    router.refresh();
    setLoading(false);
  };

  if (!products?.length) {
    return (
      <div className="mt-6">
        <p className="text-lg">Chưa có sản phẩm nào trong giỏ hàng.</p>

        <Link href="/shop">
          <div className="flex justify-center">
            <ButtonPrimary className="w-3/4 md:w-1/3 mt-6">
              Quay trở lại cửa hàng
            </ButtonPrimary>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-5 md:flex-row">
      <div className="w-full md:w-3/5">
        <Spin spinning={loading} className="block md:hidden">
          <div className="flex flex-col gap-4 md:hidden">
            <div className="border-b-2 border-slate-300 py-1 uppercase font-semibold flex items-center gap-2 w-full">
              <div className="w-[80%]">Sản phẩm</div>

              <div className="w-[20%] text-right">Số lượng</div>
            </div>

            {products.map((item) => (
              <div
                key={item?._key}
                className="border border-slate-300 p-2 rounded-md relative"
              >
                <div className="flex items-center gap-1">
                  <div className="w-[30%] flex items-center justify-center">
                    <Link
                      key={item?._key}
                      href={`/${item?.slug}?configuration=${item?.configuration_id}`}
                    >
                      <Image
                        width={500}
                        height={500}
                        className="w-[80px] h-[80px]"
                        src={getImageSanity(item?.image)}
                        alt={getAlt(item?.name)}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="w-[50%] text-sm">
                    <Link
                      key={item?._key}
                      href={`/${item?.slug}?configuration=${item?.configuration_id}`}
                    >
                      <p>{`${item?.name} - ${item?.short_configuration}`}</p>
                    </Link>
                    <p className="mt-2 text-sky-600 font-semibold text-base">
                      <span className="text-slate-400 font-normal text-sm">
                        {item?.quantity} x{" "}
                      </span>

                      {formatPrice(item?.price)}
                    </p>
                  </div>
                  <div className="w-[20%]">
                    <InputQuantity
                      value={item?.quantity}
                      onChange={handleChangeQuantity(item)}
                      onAdd={handleAddQuantity(item)}
                      onMinus={handleMinusQuantity(item)}
                    />
                  </div>
                </div>

                <ButtonDeleteItemCart
                  onClick={handleDeleteItemCart(item)}
                  className="absolute top-1 left-1"
                />
              </div>
            ))}
          </div>
        </Spin>

        <div className="hidden md:block">
          <TableCart
            loading={loading}
            dataCart={dataCart}
            onChange={handleChangeQuantity}
            onAdd={handleAddQuantity}
            onMinus={handleMinusQuantity}
            onDelete={handleDeleteItemCart}
          />
        </div>

        <div className="w-full mt-4 md:w-1/2">
          <Link href="/shop">
            <button className="border-2 w-full rounded-md border-sky-600 text-sky-600 uppercase p-2 flex gap-2 items-center justify-center font-semibold">
              <ArrowLeftIcon />
              Tiếp tục xem sản phẩm
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full md:w-2/5">
        <div>
          <div className="border-b-2 border-slate-300 py-1 uppercase font-semibold flex items-center gap-2">
            <DollarIcon /> Cộng giỏ hàng
          </div>

          <div className="border-b border-slate-300 py-2  flex items-center justify-between gap-2">
            <p>Tạm tính</p>
            <p className="font-semibold text-sky-600 text-lg">
              {formatPrice(total)}
            </p>
          </div>

          <div className="py-2 flex items-center justify-between gap-2">
            <p>Tổng</p>
            <p className="font-semibold text-sky-600 text-lg">
              {formatPrice(total)}
            </p>
          </div>

          <div className="border-b-2 border-slate-300 py-1 uppercase font-semibold flex items-center gap-2 mt-3">
            <GiftIcon /> Phiếu ưu đãi
          </div>

          <div className="mt-3 flex h-10 w-full">
            <input
              className="border border-slate-300 rounded-tl-md rounded-bl-md w-full px-3 focus-visible:outline-none"
              placeholder="Nhập mã ưu đãi"
            />
            <button className="text-sm w-[150px] uppercase font-semibold rounded-tl-none rounded-bl-none rounded-md border border-sky-600 bg-sky-600 text-white transition hover:bg-sky-500 hover:border-sky-500">
              Áp dụng
            </button>
          </div>

          <Link href="/checkout">
            <ButtonPrimary className="w-full mt-5">
              Tiến hành thanh toán
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );
}
