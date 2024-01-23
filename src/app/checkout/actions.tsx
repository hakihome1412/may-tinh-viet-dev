"use server";

import { COOKIES_NAME } from "@/\bconstants";
import { createCheckoutSanity } from "@/sanity/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createCheckout = async (
  payload: { checkout_id: string },
  formData: FormData
) => {
  const { checkout_id } = payload;
  const cookieStore = cookies();

  const params = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    note: formData.get("note"),
    payment_type: formData.get("payment_type"),
  };

  const response = await createCheckoutSanity({
    checkout_id,
    ...params,
  });

  if (response) {
    cookieStore.delete(COOKIES_NAME.CHECKOUT_ID);
    redirect("/");
  }

  return response;
};
