"use server";

import { createContactSanity } from "@/sanity/utils";
import { SanityProductType } from "@/types";

export async function createContact(
  product: SanityProductType | null,
  formData: FormData
) {
  const response = await createContactSanity({
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    note: formData.get("note") as string,
    phone: formData.get("phone") as string,
    product,
  });

  return response;
}
