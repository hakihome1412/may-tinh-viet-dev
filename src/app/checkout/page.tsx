import Container from "@/components/layouts/container";
import MainLayout from "@/components/layouts/main-layout";
import CheckoutContent from "./checkout-content";
import { cookies } from "next/headers";
import { COOKIES_NAME } from "@/\bconstants";
import { getCheckout } from "@/sanity/utils";

export default async function CheckoutPage() {
  const cookieStore = cookies();
  const checkoutId = cookieStore.get(COOKIES_NAME.CHECKOUT_ID)?.value;
  const dataCheckout = await getCheckout({
    checkout_id: checkoutId as string,
  });

  return (
    <MainLayout>
      <Container>
        <CheckoutContent dataCheckout={dataCheckout} />
      </Container>
    </MainLayout>
  );
}
