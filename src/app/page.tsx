import MainLayout from "@/components/layouts/main-layout";
import {
  getDataBrands,
  getDataDemandsHome,
  getDataProductsHome,
} from "@/sanity/utils";
import Image from "next/image";
import Link from "next/link";
import CarouselHome from "./carousel-home";
import DemandHome from "./demand-home";
import NewsHome from "./news-home";
import TitleLineHome from "./title-line-home";
import ProductList from "@/components/product-list";
import Container from "@/components/layouts/container";

const news = [
  {
    id: 1,
    name: "Memory Compression trong Windows là gì?",
    src: "/hieu-nang-gaming.jpeg",
    alt: "hieu-nang-gaming",
  },
  {
    id: 2,
    name: "Cách sử dụng Text Actions trong Snipping Tool trên Windows 11",
    src: "/doanh-nhan-sieu-ben.jpeg",
    alt: "doanh-nhan-sieu-ben",
  },
  {
    id: 3,
    name: "8 cách khắc phục mã PIN Windows 11 không hoạt động",
    src: "/do-hoa-ky-thuat.jpeg",
    alt: "do-hoa-ky-thuat",
  },
  {
    id: 4,
    name: "Cách tải driver Realtek High Definition Audio cho Windows 11",
    src: "/van-phong-hoc-tap.jpeg",
    alt: "van-phong-hoc-tap",
  },
];

export default async function HomePage() {
  const fetchDataBrands = getDataBrands();
  const fetchDataProducts = getDataProductsHome();
  const fetchDataDemands = getDataDemandsHome();
  const [dataBrands, dataProducts, dataDemands] = await Promise.all([
    fetchDataBrands,
    fetchDataProducts,
    fetchDataDemands,
  ]);

  return (
    <MainLayout>
      <Container className="p-1 md:p-0">
        <div className="block gap-1 h-auto mt-1 md:flex md:h-[340px]">
          <div className="w-full overflow-hidden md:w-2/3">
            <CarouselHome />
          </div>

          <div className="w-full gap-1 grid grid-cols-2 mt-1 md:w-1/3 md:grid-cols-none md:grid-rows-2 md:mt-0">
            <div className="relative">
              <Link href="/abc">
                <Image
                  priority
                  width={500}
                  height={500}
                  src="https://hungphatlaptop.com/wp-content/uploads/2023/02/Asus-ROG-Strix-G18-G814-2023.jpeg"
                  alt="banner1"
                  className="h-full w-full rounded-md"
                />
              </Link>
            </div>
            <div className="relative">
              <Link href="/abc">
                <Image
                  priority
                  width={500}
                  height={500}
                  src="https://hungphatlaptop.com/wp-content/uploads/2022/12/Small-Banner-Dell-XPS-15-9520.jpg"
                  alt="banner1"
                  className="h-full w-full rounded-md"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Nhu cầu sử dụng */}
        <DemandHome items={dataDemands} />

        {/* Tin tức */}
        <NewsHome items={news} />

        {dataProducts?.map((item: any) => {
          if (!item?.products?.length) {
            return null;
          }

          return (
            <div className="mt-5" key={item?.id}>
              <div>
                <TitleLineHome brands={dataBrands} item={item} />

                <ProductList items={item?.products} />
              </div>
            </div>
          );
        })}
      </Container>
    </MainLayout>
  );
}
