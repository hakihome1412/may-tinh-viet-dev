import Container from "@/components/layouts/container";
import MainLayout from "@/components/layouts/main-layout";
import { getDataDetail, getDataFilterAdvanced } from "@/sanity/utils";
import { Metadata } from "next";
import ContentDetail from "./content-detail";
import Breadcrumb from "@/components/common/breadcrumb";

type Props = {
  params: { slug: string };
  searchParams: {
    configuration: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const product = await getDataDetail(slug);

  return {
    title: `${product?.name} - Máy Tính Việt - Chuyên Laptop Dell, Alienware, HP, Lenovo`,
  };
}

export default async function DetailPage({
  params: { slug },
  searchParams,
}: Props) {
  const data = await getDataDetail(slug);
  const dataFilterAdvanced = await getDataFilterAdvanced();

  const breadcrumbItems = [
    {
      path: "/",
      name: "Trang chủ",
    },
  ];

  if (data?.brand?.id) {
    breadcrumbItems.push({
      path: `/shop?brands=${data?.brand?.slug}`,
      name: data?.brand?.name,
    });
  }

  breadcrumbItems.push({
    path: `/${data?.slug}`,
    name: data?.name,
  });

  return (
    <MainLayout>
      <Container>
        {/* Breadcrumb */}
        <div className="mt-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <ContentDetail
          dataProduct={data}
          dataFilterAdvanced={dataFilterAdvanced}
          searchParams={searchParams}
        />
      </Container>
    </MainLayout>
  );
}
