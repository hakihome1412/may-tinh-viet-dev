"use client";

import React, { useEffect, useState } from "react";
import CarouselDetail from "./carousel-detail";
import GiftCard from "./gift-card";
import CustomerBenefitTruckIcon from "@/components/icons/CustomerBenefitTruckIcon";
import CustomerBenefitVerifyIcon from "@/components/icons/CustomerBenefitVerifyIcon";
import CustomerBenefitSalesIcon from "@/components/icons/CustomerBenefitSalesIcon";
import CustomerBenefitTechnicalIcon from "@/components/icons/CustomerBenefitTechnicalIcon";
import Link from "next/link";
import Divider from "@/components/common/divider";
import PortableTextCustom from "@/components/portable-text-custom";
import CheckText from "./check-text";
import Options from "./options";

export default function ContentDetail({
  dataProduct,
  searchParams,
  dataFilterAdvanced,
}: {
  dataProduct: any;
  dataFilterAdvanced: any[];
  searchParams: {
    configuration: string;
  };
}) {
  const { configuration } = searchParams;
  const [selectedOption, setSelectedOption] = useState(
    dataProduct?.configurations[0]
  );

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (configuration) {
      const itemFind = dataProduct?.configurations?.find(
        (it: any) => it?.id === configuration
      );

      if (itemFind) {
        setSelectedOption(itemFind);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuration]);

  return (
    <>
      {/* Product Name */}
      <p className="font-semibold uppercase text-sky-600 text-2xl mt-4">
        {dataProduct?.name} - {selectedOption?.short_configuration}
      </p>
      <Divider className="my-4" />

      {/* Content */}
      <div>
        {/* Summary, Images, Policy Information */}
        <div className="flex flex-col w-full gap-4 md:flex-row">
          <div className="w-full gap-3 md:w-3/4 md:grid md:grid-cols-2">
            {/* Images */}
            <div>
              <CarouselDetail images={dataProduct?.images?.main_images} />
            </div>

            {/* Summary & Options & Payment */}
            <div className="mt-4 md:mt-0">
              <div className="border border-gray-300 rounded p-3 text-sm border-dashed flex flex-col gap-2">
                <CheckText
                  label="Tình trạng"
                  value={selectedOption?.content_configuration?.condition}
                />

                <CheckText label="Bảo hành" value="12 tháng" />

                <CheckText
                  label="Thương hiệu"
                  value={
                    <Link
                      className="text-sky-600"
                      href={`/shop?brands=${dataProduct?.brand?.slug}`}
                    >
                      {dataProduct?.brand?.name}
                    </Link>
                  }
                />
              </div>

              <div className="border border-gray-300 rounded p-3 text-sm border-dashed mt-4 flex flex-col gap-2">
                <CheckText
                  label="CPU"
                  value={selectedOption?.content_configuration?.cpu}
                />

                <CheckText
                  label="RAM"
                  value={selectedOption?.content_configuration?.ram}
                />

                <CheckText
                  label="SSD"
                  value={selectedOption?.content_configuration?.ssd}
                />

                <CheckText
                  label="VGA"
                  value={selectedOption?.content_configuration?.vga}
                />

                <CheckText
                  label="DISPLAY"
                  value={selectedOption?.content_configuration?.display}
                />

                <CheckText
                  label="CONDITION"
                  value={selectedOption?.content_configuration?.condition}
                />
              </div>

              {/* Options */}
              <div className="mt-4">
                <Options
                  dataProduct={dataProduct}
                  selectedOption={selectedOption}
                  items={dataProduct?.configurations}
                  onSelect={handleSelectOption}
                  dataFilterAdvanced={dataFilterAdvanced}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 md:w-1/4">
            {/* Gift */}
            <div className="border border-gray-300 rounded p-2 text-sm border-dashed h-fit flex flex-col gap-1">
              <p className="uppercase text-center font-semibold text-md text-sky-600">
                Quà tặng
              </p>

              <Divider />

              <GiftCard items={dataProduct?.gifts} />
            </div>

            {/* Customer Benefit */}
            <div className="border border-gray-300 rounded p-2 text-sm border-dashed h-fit flex flex-col gap-1">
              <p className="uppercase text-center font-semibold text-md text-sky-600">
                Quyền lợi khách hàng
              </p>

              <Divider />

              <PortableTextCustom content={dataProduct?.benefit} />
            </div>

            <div className="border border-gray-300 rounded text-sm border-dashed h-fit flex flex-col gap-1">
              {/* Shipping */}
              <div className="p-2 border-b border-dashed">
                <div className="flex items-center gap-4">
                  <div className="w-1/5">
                    <CustomerBenefitTruckIcon className="w-full h-10 text-sky-600" />
                  </div>
                  <div className="w-4/5 flex flex-col gap-2">
                    <p className="uppercase font-semibold text-sky-600">
                      Giao hàng
                    </p>

                    <p className="text-xs">
                      Miễn phí giao hàng trong nội thành TP.HCM bán kính 12km
                      với hoá đơn trên 1.000.000đ.
                    </p>
                  </div>
                </div>
              </div>

              {/* Return */}
              <div className="p-2 border-b border-dashed">
                <div className="flex items-center gap-4">
                  <div className="w-1/5">
                    <CustomerBenefitVerifyIcon className="w-full h-10 text-sky-600" />
                  </div>
                  <div className="w-4/5 flex flex-col gap-2">
                    <p className="uppercase font-semibold text-sky-600">
                      Đổi trả
                    </p>

                    <p className="text-xs">
                      Đổi mới sản phẩm trong 30 ngày nếu lỗi từ nhà sản xuất.
                    </p>

                    <p className="text-xs">
                      Xem thêm{" "}
                      <Link href="/" className="text-sky-600">
                        tại đây
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Call Sales */}
              <div className="p-2 border-b border-dashed">
                <div className="flex items-center gap-4">
                  <div className="w-1/5">
                    <CustomerBenefitSalesIcon className="w-full h-10 text-sky-600" />
                  </div>
                  <div className="w-4/5 flex flex-col gap-2 text-red-500 text-md font-semibold">
                    <p className="uppercase font-semibold text-sky-600">
                      Kinh doanh
                    </p>

                    <p>0903 134 635</p>

                    <p>0903 226 126</p>
                  </div>
                </div>
              </div>

              {/* Call Technical */}
              <div className="p-2 border-b border-dashed">
                <div className="flex items-center gap-4">
                  <div className="w-1/5">
                    <CustomerBenefitTechnicalIcon className="w-full h-10 text-sky-600" />
                  </div>
                  <div className="w-4/5 flex flex-col gap-2 text-red-500 text-md font-semibold">
                    <p className="uppercase font-semibold text-sky-600">
                      Kỹ thuật
                    </p>

                    <p>0399 448 948</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Information */}
        <div className="mt-10 w-full flex flex-col-reverse gap-4 md:flex-row">
          <div className="w-full flex flex-col gap-1 md:w-3/5">
            <p className="font-semibold text-xl text-sky-600 uppercase">
              Thông tin sản phẩm
            </p>

            <Divider />

            <div className="mt-4">
              {dataProduct?.description ? (
                <PortableTextCustom content={dataProduct?.description} />
              ) : (
                "Đang cập nhật ..."
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-1 md:w-2/5">
            <p className="font-semibold text-xl text-sky-600 uppercase">
              Thông tin kỹ thuật
            </p>

            <Divider />

            <div className="mt-4">
              {dataProduct?.description_technical?.map(
                (item: any, index: number) => (
                  <div
                    key={item?.id}
                    className={`w-full flex items-center p-5 gap-3 text-sm ${
                      index % 2 === 1 ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="w-1/4 font-semibold">{item?.name}</div>
                    <div className="w-3/4">
                      <PortableTextCustom content={item?.content} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
