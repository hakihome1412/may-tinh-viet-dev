import Container from "@/components/layouts/container";
import MainLayout from "@/components/layouts/main-layout";
import ProductList from "@/components/product-list";
import {
  getDataBrands,
  getDataDemands,
  getDataFilterAdvanced,
  getDataPrices,
  getDataProductsShop,
} from "@/sanity/utils";
import BrandFilter from "./brand-filter";
import DemandFilter from "./demand-filter";
import DetailFilter from "./detail-filter";
import OtherFilter from "./other-filter";
import PriceFilter from "./price-filter";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: {
    demands: string;
    brands: string;
    price_from: string;
    price_to: string;
    [any: string]: any;
  };
}) {
  const dataProducts = await getDataProductsShop(searchParams);
  const dataFetchBrands = getDataBrands();
  const dataFetchPrices = getDataPrices();
  const dataFetchDemands = getDataDemands();
  const dataFetchFilterAdvanced = getDataFilterAdvanced();
  const [dataBrands, dataPrices, dataDemands, dataFilterAdvanced] =
    await Promise.all([
      dataFetchBrands,
      dataFetchPrices,
      dataFetchDemands,
      dataFetchFilterAdvanced,
    ]);
  const { brands, demands, price_from, price_to } = searchParams;
  const arrQueryBrands = brands ? brands?.split(",") : [];
  const arrQueryDemands = demands ? demands?.split(",") : [];
  const arrKeyParams = Object.keys(searchParams) || [];

  return (
    <MainLayout>
      <Container>
        <div className="mt-4">
          {/* Đã chọn chi tiết filter */}
          {arrKeyParams.length > 0 && (
            <DetailFilter
              dataBrands={dataBrands}
              dataDemands={dataDemands}
              dataPrices={dataPrices}
              dataFilterAdvanced={dataFilterAdvanced}
              searchParams={searchParams}
              dataQueryBrands={arrQueryBrands}
              dataQueryDemands={arrQueryDemands}
            />
          )}

          {/* Thương hiệu filter */}
          <BrandFilter
            dataBrands={dataBrands}
            dataQueryBrands={arrQueryBrands}
            searchParams={searchParams}
          />

          {/* Mức giá filter */}
          <PriceFilter
            dataPrices={dataPrices}
            searchParams={searchParams}
            from={price_from}
            to={price_to}
          />

          {/* Nhu cầu sử dụng filter */}
          <DemandFilter
            dataDemands={dataDemands}
            searchParams={searchParams}
            dataQueryDemands={arrQueryDemands}
          />

          {/* Bộ lọc nâng cao filter */}
          <OtherFilter
            dataFilterAdvanced={dataFilterAdvanced}
            searchParams={searchParams}
          />

          {/* Danh sách sản phẩm */}
          <div className="mt-4">
            <ProductList items={dataProducts} />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
