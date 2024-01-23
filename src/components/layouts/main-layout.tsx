import Footer from "../Footer";
import SupportOnline from "../support-online";
import { getCheckout, getDataBrands, getDataDemandsHome } from "@/sanity/utils";
import { cookies } from "next/headers";
import { COOKIES_NAME } from "@/\bconstants";
import Header from "./header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const checkoutId = cookieStore.get(COOKIES_NAME.CHECKOUT_ID)?.value;

  const fetchDataCart = getCheckout({
    checkout_id: checkoutId as string,
  });
  const fetchDataDemands = getDataDemandsHome();
  const fetchDataBrands = getDataBrands();

  const [dataCart, dataDemands, dataBrands] = await Promise.all([
    fetchDataCart,
    fetchDataDemands,
    fetchDataBrands,
  ]);

  return (
    <>
      {/* Header */}
      <header className="text-sm font-light">
        <Header
          dataCart={dataCart}
          dataDemands={dataDemands}
          dataBrands={dataBrands}
        />
      </header>

      {/* Content */}
      <main className="min-h-[calc(100vh-536px)] pb-10">{children}</main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>

      {/* Support Online */}
      <SupportOnline />
    </>
  );
}
