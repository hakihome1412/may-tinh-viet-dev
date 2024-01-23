import { COOKIES_NAME } from "@/\bconstants";
import Container from "@/components/layouts/container";
import MainLayout from "@/components/layouts/main-layout";
import { getCheckout } from "@/sanity/utils";
import { cookies } from "next/headers";
import CartContent from "./cart-content";

export const revalidate = 10;

export default async function CartPage() {
  const cookieStore = cookies();
  const checkoutId = cookieStore.get(COOKIES_NAME.CHECKOUT_ID)?.value;
  const dataCheckout = await getCheckout({
    checkout_id: checkoutId as string,
  });

  return (
    <MainLayout>
      <Container>
        <CartContent dataCart={dataCheckout} />
      </Container>
    </MainLayout>
  );
}
