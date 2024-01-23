"use server";

import { COOKIES_NAME } from "@/\bconstants";
import { getCheckout, upsertCart } from "@/sanity/utils";
import { cookies } from "next/headers";

export const addToCart = async (payload: {
  selectedOption: any;
  dataProduct: any;
}) => {
  const cookieStore = cookies();
  const checkout_id = cookieStore.get(COOKIES_NAME.CHECKOUT_ID)?.value;
  const { dataProduct, selectedOption } = payload;

  const dataCart = await getCheckout({
    checkout_id,
  });

  const products = dataCart?.products || [];

  const itemFind = products?.find(
    (item) =>
      item.configuration_id === selectedOption?.id &&
      item.product_id === dataProduct?.id
  );

  let data = null;

  if (itemFind) {
    itemFind.quantity += 1;
  } else {
    products?.push({
      name: dataProduct?.name,
      price: selectedOption?.price,
      image: dataProduct?.images?.main_images?.[0],
      product_id: dataProduct?.id,
      configuration_id: selectedOption?.id,
      short_configuration: selectedOption?.short_configuration,
      slug: dataProduct?.slug,
      quantity: 1,
    });
  }

  try {
    data = await upsertCart({
      id: checkout_id,
      name: "Khách lạ",
      products,
    });
  } catch (err: any) {
    if (err?.statusCode === 404) {
      cookieStore.delete(COOKIES_NAME.CHECKOUT_ID);

      data = await upsertCart({
        name: "Khách lạ",
        products,
      });
    }
  }

  if (data?.id) {
    cookieStore.set(COOKIES_NAME.CHECKOUT_ID, data.id);
  }
};
