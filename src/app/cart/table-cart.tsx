/* eslint-disable no-unused-vars */
import { getImageSanity } from "@/sanity/utils/image-url";
import { SanityProductType, SanityCartType } from "@/types";
import { formatPrice, getAlt } from "@/utils";
import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import ButtonDeleteItemCart from "./button-delete-item-cart";
import InputQuantity from "./input-quantity";

type Props = {
  dataCart?: SanityCartType | null;
  loading?: boolean;
  onAdd?: (item: SanityProductType) => (value: number) => void;
  onMinus?: (item: SanityProductType) => (value: number) => void;
  onChange?: (item: SanityProductType) => (value: number) => void;
  onDelete?: (item: SanityProductType) => () => void;
};

export default function TableCart({
  dataCart,
  loading = false,
  onChange,
  onAdd,
  onMinus,
  onDelete,
}: Props) {
  const products = dataCart?.products;

  return (
    <Table
      loading={loading}
      rowKey="configuration_id"
      dataSource={products}
      pagination={false}
      columns={[
        {
          title: () => (
            <span className="uppercase font-semibold">Sản phẩm</span>
          ),
          key: "name",
          render: (_, record) => {
            return (
              <div className="flex items-center gap-3">
                <ButtonDeleteItemCart onClick={onDelete?.(record)} />

                <Link
                  href={`/${record?.slug}?configuration=${record?.configuration_id}`}
                >
                  <div className="w-[76px] h-[76px]">
                    <Image
                      width={500}
                      height={500}
                      src={getImageSanity(record?.image)}
                      className="w-full h-full"
                      alt={getAlt(record?.name)}
                      priority
                    />
                  </div>
                </Link>

                <Link
                  href={`/${record?.slug}?configuration=${record?.configuration_id}`}
                  className="self-start"
                >
                  <p>{`${record?.name} - ${record?.short_configuration}`}</p>
                </Link>
              </div>
            );
          },
        },
        {
          title: () => <span className="uppercase font-semibold">Giá</span>,
          key: "price",
          dataIndex: "price",
          render: (price) => (
            <p className="text-base font-semibold text-amber-400">
              {formatPrice(price)}
            </p>
          ),
        },
        {
          title: () => (
            <span className="uppercase font-semibold">Số lượng</span>
          ),
          key: "quantity",
          render: (_, record) => {
            return (
              <InputQuantity
                value={record?.quantity}
                onChange={onChange?.(record)}
                onAdd={onAdd?.(record)}
                onMinus={onMinus?.(record)}
              />
            );
          },
        },

        {
          title: () => (
            <span className="uppercase font-semibold">Tạm tính</span>
          ),
          key: "total",
          render: (_, record) => (
            <p className="text-base font-semibold text-amber-400">
              {formatPrice(record?.price! * record?.quantity!)}
            </p>
          ),
        },
      ]}
    />
  );
}
