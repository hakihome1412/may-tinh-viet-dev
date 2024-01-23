"use client";

import Link from "next/link";
import HomeIcon from "../icons/HomeIcon";
import PhoneIcon from "../icons/PhoneIcon";
import Container from "./container";
import Image from "next/image";
import TopBarFixedScroll from "../topbar-fixed-scroll";
import MenuIcon from "../icons/MenuIcon";
import SearchIcon from "../icons/SearchIcon";
import CartIcon from "../icons/CartIcon";
import { Dropdown, Popover, Spin } from "antd";
import { SanityProductType, SanityCartType } from "@/types";
import { getImageSanity } from "@/sanity/utils/image-url";
import {
  formatPrice,
  getAlt,
  getTotalPriceCart,
  getTotalQuantityCart,
} from "@/utils";
import ButtonDeleteItemCart from "@/app/cart/button-delete-item-cart";
import { deleteItemCart, getDataSearchProduct } from "@/sanity/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Divider from "../common/divider";
import debounce from "lodash/debounce";
import Menu from "./menu";
import SearchMobile from "./search-mobile";
import ModalContactCallback from "../modals/modal-contact-callback";

type Props = {
  dataCart?: SanityCartType | null;
  dataDemands?: any[];
  dataBrands?: any[];
};

export default function Header({ dataCart, dataDemands, dataBrands }: Props) {
  const router = useRouter();
  // Loading cho thao tác giỏ hàng
  const [loading, setLoading] = useState(false);
  // Các sản phẩm tìm kiếm
  const [dataSearch, setDataSearch] = useState([]);
  // Loading cho tìm kiếm sản phẩm
  const [loadingSearch, setLoadingSearch] = useState(false);
  // Biến đóng/mở kết quả tìm kiếm
  const [open, setOpen] = useState(false);
  // Biến đóng/mở kết quả tìm kiếm trên mobile
  const [openSearch, setOpenSearch] = useState(false);
  // Biến đóng/mở menu
  const [openMenu, setOpenMenu] = useState(false);
  // Biến đóng/mở Gọi lại cho tôi
  const [openCallbackContact, setOpenCallbackContact] = useState(false);
  // Sản phẩm trong giỏ hàng
  const products = dataCart?.products || [];
  // Tổng số lượng tất cả sản phẩm trong giỏ hàng
  const totalQuantity = getTotalQuantityCart(products);
  // Tổng giá trị giỏ hàng
  const total = getTotalPriceCart(dataCart?.products);
  // Hàm delay khi tìm kiếm sản phẩm
  const debounceSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.value) {
      setLoadingSearch(false);
      handleCloseSearch();
      setDataSearch([]);
    } else {
      setLoadingSearch(true);
      const response = await getDataSearchProduct(e?.target?.value);
      setLoadingSearch(false);
      setDataSearch(response);
      if (response?.length) {
        handleOpenSearch();
      } else {
        handleCloseSearch();
      }
    }
  }, 700);
  // Hàm delay khi tìm kiếm sản phẩm
  const debounceSearchMobile = debounce(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e?.target?.value) {
        setLoadingSearch(false);
        setDataSearch([]);
      } else {
        setLoadingSearch(true);
        const response = await getDataSearchProduct(e?.target?.value);
        setLoadingSearch(false);
        setDataSearch(response);
      }
    },
    700
  );
  // Nội dung hiển thị sau khi tìm kiếm
  const items = dataSearch?.map((item: any) => ({
    key: item?.id,
    label: (
      <Link target="_blank" rel="noopener noreferrer" href={item?.slug}>
        <div className="flex items-center gap-2">
          <div className="w-4/6 flex items-center gap-2">
            <div className="w-[60px] h-[60px] border border-slate-300 rounded-md overflow-hidden p-1">
              <Image
                className="w-full h-full"
                width={500}
                height={500}
                alt={getAlt(item?.slug)}
                src={getImageSanity(item?.image)}
                priority
              />
            </div>
            <p className="font-semibold">{item?.name}</p>
          </div>
          <div className="w-2/6 text-right text-sky-600 font-semibold">
            {formatPrice(item?.price)}
          </div>
        </div>
      </Link>
    ),
  }));

  // Xoá 1 sản phẩm trong giỏ hàng
  const handleDeleteItemCart = (record: SanityProductType) => async () => {
    setLoading(true);
    await deleteItemCart({
      checkout_id: dataCart?.id!,
      product: record,
    });
    router.refresh();
    setLoading(false);
  };

  // Nội dung hiển thị của giỏ hàng
  const content = () => {
    if (!products?.length) {
      return null;
    }

    return (
      <Spin spinning={loading}>
        <div className="p-3">
          {products?.map((item: SanityProductType) => (
            <div key={item?.product_id} className="w-[360px] flex gap-2">
              <div className="w-1/3">
                <Link
                  href={`/${item?.slug}?configuration=${item?.configuration_id}`}
                >
                  <Image
                    width={500}
                    height={500}
                    src={getImageSanity(item?.image)}
                    className="w-full h-full"
                    alt={getAlt(item?.name)}
                    priority
                  />
                </Link>
              </div>
              <div className="w-2/3">
                <div className="flex gap-2">
                  <div className="flex flex-col justify-center">
                    <Link
                      href={`/${item?.slug}?configuration=${item?.configuration_id}`}
                    >
                      <p className="font-semibold">{`${item?.name} - ${item?.short_configuration}`}</p>
                    </Link>
                    <p className="text-xs mt-1">
                      {item?.quantity} x{" "}
                      <span className="font-semibold text-sky-600">
                        {formatPrice(item.price)}
                      </span>
                    </p>
                  </div>
                  <ButtonDeleteItemCart
                    className="w-fit h-fit"
                    onClick={handleDeleteItemCart(item)}
                  />
                </div>
              </div>
            </div>
          ))}

          <Divider />

          <div className="flex items-center justify-between py-3 font-semibold">
            <p className="text-slate-400 text-lg">Tổng số phụ:</p>
            <p className="text-sky-600 text-xl">{formatPrice(total)}</p>
          </div>

          <Divider />

          <div className="py-3 flex flex-col gap-3">
            <Link href="/cart">
              <button className="uppercase transition w-full bg-amber-400 text-white p-2 rounded-md font-semibold text-lg hover:bg-sky-600">
                Xem giỏ hàng
              </button>
            </Link>

            <Link href="/cart">
              <button className="uppercase w-full bg-sky-600 text-white p-2 rounded-md font-semibold text-lg hover:bg-sky-500">
                Thanh toán
              </button>
            </Link>
          </div>
        </div>
      </Spin>
    );
  };

  // Hàm mở nội dung tìm kiếm
  const handleOpenSearch = () => {
    setOpen(true);
  };

  // Hàm đóng nội dung tìm kiếm
  const handleCloseSearch = () => {
    setOpen(false);
  };

  // Hàm mở menu
  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  // Hàm đóng menu
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  // Hàm đóng tìm kiếm trên mobile
  const handleCloseSearchMobile = () => {
    setOpenSearch(false);
  };

  // Hàm mở tìm kiếm trên mobile
  const handleOpenSearchMobile = () => {
    setOpenSearch(true);
  };

  // Hàm đóng Gọi lại cho tôi
  const handleCloseCallbackContact = () => {
    setOpenCallbackContact(false);
  };

  // Hàm mở Gọi lại cho tôi
  const handleOpenCallbackContact = () => {
    setOpenCallbackContact(true);
  };

  return (
    <div>
      {/* Phone and Address */}
      <div className="bg-primary text-white hidden md:block">
        <Container>
          <div className="flex items-center justify-between p-1">
            <div className="flex items-center">
              <PhoneIcon />
              <span className="ml-2">Hotline 1: 0999 999 999</span>
            </div>

            <div className="flex items-center">
              <HomeIcon />
              <span className="ml-2">123 ABC, ABC, ABC.</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Search , Logo, Cart */}
      <div>
        <Container>
          <div className="flex items-center justify-between gap-4 py-4 md:justify-normal">
            {/* Search */}
            <div className="md:w-2/5">
              <Dropdown
                menu={{ items, onMouseLeave: handleCloseSearch }}
                open={open}
              >
                <div
                  className="relative hidden md:block"
                  onMouseEnter={(): void => {
                    if (dataSearch?.length) {
                      handleOpenSearch();
                    }
                  }}
                >
                  <input
                    placeholder="Tìm sản phẩm ..."
                    type="text"
                    className="border border-gray-300 w-full rounded-full h-9 pl-12 pr-4 text-sm transition duration-500 placeholder-shown:italic focus-visible:outline-none focus:shadow-md"
                    onChange={debounceSearch}
                  />

                  <div className="absolute left-4 top-[8px]">
                    {loadingSearch ? (
                      <Spin />
                    ) : (
                      <SearchIcon className="w-5 h-5 fill-gray-400" />
                    )}
                  </div>
                </div>
              </Dropdown>

              <div className="flex items-center gap-3 md:hidden">
                <button
                  className="font-semibold p-2 bg-slate-950 text-xs text-white rounded-md transition w-[32px] h-[32px] flex items-center justify-center hover:bg-slate-700"
                  onClick={handleOpenMenu}
                >
                  <MenuIcon className="w-4 h-4" />
                </button>

                <button
                  className="font-semibold p-2 bg-white text-xs text-slate-950 rounded-md transition w-[32px] h-[32px] flex items-center justify-center border-slate-950 border hover:opacity-50"
                  onClick={handleOpenSearchMobile}
                >
                  <SearchIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Logo */}
            <div className="md:w-1/5">
              <Link href="/">
                <Image
                  src="https://maytinhviet.com.vn/wp-content/uploads/2023/03/LOGO-fn.png"
                  alt={getAlt()}
                  width={500}
                  height={500}
                  priority
                  className="h-10 w-[90%]"
                />
              </Link>
            </div>

            {/* Cart */}
            <div className="flex items-center justify-end gap-3 md:w-2/5">
              <button
                className="w-[32px] h-[32px] rounded-md bg-primary text-white flex items-center justify-center transition hover:bg-primary-hover gap-2 md:w-fit md:p-3 md:font-semibold md:h-[40px] md:uppercase"
                onClick={handleOpenCallbackContact}
              >
                <PhoneIcon className="w-4 h-4" />
                <span className="hidden md:block">Gọi lại cho tôi</span>
              </button>

              <Popover
                content={content}
                overlayInnerStyle={{
                  padding: 0,
                  overflow: "hidden",
                }}
              >
                <Link href="/cart">
                  <button className="text-white bg-black relative w-[32px] h-[32px] rounded-md flex items-center justify-center hover:opacity-80 gap-2 md:w-fit md:p-3 md:font-semibold md:h-[40px] md:uppercase">
                    <CartIcon className="w-4 h-4" />
                    <span className="hidden md:block">Giỏ hàng</span>
                    {totalQuantity > 0 && (
                      <div
                        className={`absolute transition -top-3 -right-1 w-5 h-5 rounded-full bg-sky-600 ${
                          totalQuantity > 99 ? "text-[9px]" : "text-xs"
                        } ${
                          totalQuantity > 0 ? "flex" : "hidden"
                        } items-center justify-center`}
                      >
                        {totalQuantity > 99 ? "99+" : totalQuantity}
                      </div>
                    )}
                  </button>
                </Link>
              </Popover>
            </div>
          </div>
        </Container>
      </div>

      {/* Categories, Content Top Bar */}
      <TopBarFixedScroll dataDemands={dataDemands} dataBrands={dataBrands} />

      {/* Menu trên mobile */}
      <Menu
        open={openMenu}
        onClose={handleCloseMenu}
        dataDemands={dataDemands}
        dataBrands={dataBrands}
        onOpenSearch={handleOpenSearchMobile}
      />

      {/* Tìm kiếm trên mobile */}
      <SearchMobile
        debounceSearch={debounceSearchMobile}
        dataSearch={dataSearch}
        loading={loadingSearch}
        open={openSearch}
        onClose={handleCloseSearchMobile}
      />

      {/* Gọi lại cho tôi */}
      <ModalContactCallback
        onCancel={handleCloseCallbackContact}
        open={openCallbackContact}
      />
    </div>
  );
}
