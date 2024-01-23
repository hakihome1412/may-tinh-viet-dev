import { createClient, groq } from "next-sanity";
import { MAX_PRODUCT_CONFIGURATION } from "../constants";
import { SanityProductType, SanityCartType, UpsertCartResponse } from "@/types";
import { notFound } from "next/navigation";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN_EDITOR,
  useCdn: false,
  apiVersion: "2024-01-02",
});

export async function getDataDetail(slug: string) {
  const responseProduct = await client.fetch(
    groq`
      *[_type == "products" && slug.current == $slug][0]{
        "id": _id,
        code,
        benefit,
        name,
        description,
        "slug": slug.current,
        brand->{
          "id": _id,
          name,
          "slug": slug.current
        },
        "demands": demands[]->{
          "id": _id,
          name,
          "slug": slug.current,
        },
        "gifts": gift[]->{
          "id": _id,
          name,
          "slug": slug.current,
          image,
        },
        "configurations": configuration[]{
          "id": _key,
          price,
          old_price,
          short_configuration,
          filter_advanced,
          "details": detail_configuration[]{
            name,
            "options": options[]{
              name,
              detail
            }
          },
          "content_configuration": conf_content{
            vga,
            condition,
            ssd,
            display,
            cpu,
            warranty,
            ram
          }
        },
        "images": image{
          "small_images": small_image[],
          "main_images": main_image[]
        },
        "description_technical":description_technical[]{
          "id": _key,
          content,
          name
        }
      }
    `,
    { slug },
    {
      cache: "no-cache",
    }
  );

  return responseProduct;
}

export async function getDataBrands() {
  const response = await client.fetch(
    groq`
      *[_type == "brands"]{
        "id": _id,
        name,
        "slug": slug.current,
        logo,
        "create_at": _createdAt
      } | order(name asc)
    `,
    {},
    {
      cache: "no-cache",
    }
  );

  return response;
}

export function getDataProductsHome() {
  return client.fetch(
    groq`
      *[_type == "demands"]{
        "id": _id,
        name,
        "slug": slug.current,
        "products": *[_type == "products" && ^._id in demands[]._ref]{
          "id": _id,
          name,
          "slug": slug.current,
          "configurations": configuration[].conf_content,
          "images": image.small_image[],
          "price": configuration[0].price
        }
      }
    `,
    {},
    {
      cache: "no-cache",
    }
  );
}

export function getDataPrices() {
  return client.fetch(
    groq`
      *[_type == "prices"]{
        "id": _id,
        name,
        from,
        to
      } | order(to asc)
    `
  );
}

export function getDataDemands() {
  return client.fetch(
    groq`
      *[_type == "demands"]{
        "id": _id,
        name,
        "slug": slug.current,
        "product_count": count(*[_type == "products" && ^._id in demands[]._ref])
      } | order(name asc)
    `,
    {},
    {
      cache: "no-cache",
    }
  );
}

export function getDataDemandsHome() {
  return client.fetch(
    groq`
      *[_type == "demands"]{
        "id": _id,
        name,
        "slug": slug.current,
        image
      } | order(name asc)
    `
  );
}

export async function getDataProductsShop(params: {
  demands: string;
  brands: string;
  price_from: string;
  price_to: string;
  [any: string]: string;
}) {
  const { demands, brands, price_from, price_to, ...filterAdvanced } = params;

  const arrKeyFilterAdvanced = Object.keys(filterAdvanced) || [];

  const newDemands = demands ? demands.split(",") : [];
  const newBrands = brands ? brands.split(",") : [];

  const dataDemands = await getDataDemands();

  let query = "";

  if (newDemands.length > 0) {
    for (let i = 0; i < dataDemands.length; i++) {
      query += `${
        i === 0 ? "(" : ""
      }demands[${i}]->slug.current in ${JSON.stringify(newDemands)}${
        i === dataDemands.length - 1 ? ")" : ""
      } ${i < dataDemands.length - 1 ? "|| " : "&& "}`;
    }
  }

  if (newBrands.length > 0) {
    for (let i = 0; i < newBrands.length; i++) {
      query += `${i === 0 ? "(" : ""}brand->slug.current == "${newBrands[i]}"${
        i === newBrands.length - 1 ? ")" : ""
      } ${i < newBrands.length - 1 ? "|| " : "&& "}`;
    }
  }

  if (price_from && price_to) {
    for (let i = 0; i < MAX_PRODUCT_CONFIGURATION; i++) {
      query += `${
        i === 0 ? "(" : ""
      }(configuration[${i}].price >= ${price_from} && configuration[${i}].price <= ${price_to})${
        i === dataDemands.length - 1 ? ")" : ""
      } ${i < MAX_PRODUCT_CONFIGURATION - 1 ? "|| " : "&& "}`;
    }
  }

  if (arrKeyFilterAdvanced.length > 0) {
    query += "(";
    for (let i = 0; i < MAX_PRODUCT_CONFIGURATION; i++) {
      query += "(";
      for (let j = 0; j < arrKeyFilterAdvanced.length; j++) {
        const key: string = arrKeyFilterAdvanced[j];
        query += `(configuration[${i}].filter_advanced.["${key}"] == "${
          filterAdvanced?.[key]
        }") ${j < arrKeyFilterAdvanced.length - 1 ? "|| " : ""}`;
      }
      query += `) ${i < MAX_PRODUCT_CONFIGURATION - 1 ? "|| " : ""}`;
    }
    query += ")";
  }

  if (query && !arrKeyFilterAdvanced.length) {
    // Xoá kí hiệu "&&" cuối cùng trong query
    query = query.substring(0, query.length - 3);
  }

  const mainQuery = `
      *[_type == "products"  
      ${query.length > 0 ? `&& ${query}` : ""}
      ]{
        "id": _id,
        name,
        "slug": slug.current,
        "configurations": configuration[].conf_content,
        "images": image.small_image[],
        "price": configuration[0].price
      }
  `;

  const data = await client.fetch(
    groq`${mainQuery}`,
    {},
    {
      cache: "no-cache",
    }
  );

  return data;
}

export async function getDataFilterAdvanced() {
  return await client.fetch(
    groq`
      *[_type == "filterAdvanced"]{
        "id":_id,
        name,
        "slug": slug.current,
        "options": options[]{
          "id": _key,
          name,
          "slug": slug.current,
          "is_active": status
        }
      }
    `
  );
}

export async function upsertCart(payload: SanityCartType) {
  const { id, ...params } = payload;

  let response: UpsertCartResponse | null = null;

  if (id) {
    const products = params?.products;

    if (products.length) {
      response = await client
        .patch(id)
        .set(params)
        .commit({ autoGenerateArrayKeys: true });
    } else {
      response = await client.delete(id);
    }
  } else {
    response = await client.create<SanityCartType>(
      {
        _type: "checkouts",
        ...params,
      },
      {
        autoGenerateArrayKeys: true,
      }
    );

    const { _id, ...data } = response;
    response = {
      ...data,
      id: _id,
    };
  }
  return response;
}

export async function getCheckout(payload: { checkout_id?: string }) {
  const { checkout_id } = payload;

  if (!checkout_id) {
    return null;
  }

  const response = await client.fetch(
    groq`
      *[_type == "checkouts" && _id == $checkout_id && is_payment == null][0]{
        "id": _id,
        name,
        "products":products[]{ 
          _key,
          configuration_id,
          image,
          price,
          name,
          product_id,
          slug,
          short_configuration,
          quantity
        }
      }
    `,
    { checkout_id },
    { next: { revalidate: 0 } }
  );

  return response as SanityCartType | null;
}

export async function addItemCart(payload: {
  checkout_id: string;
  product_configuration_id: string;
}) {
  const { checkout_id, product_configuration_id } = payload;

  const dataCart = await getCheckout({
    checkout_id,
  });

  if (!dataCart) {
    notFound();
  }

  const products = [...dataCart?.products];

  const itemFind = products.find((it) => it?._key === product_configuration_id);

  if (itemFind) {
    itemFind.quantity! += 1;
  }

  try {
    await upsertCart({
      ...dataCart,
      products,
    });
  } catch (err: any) {
    console.log(`ERROR addItemCart :: ${err}`);
  }
}

export async function minusItemCart(payload: {
  checkout_id: string;
  product_configuration_id: string;
}) {
  const { checkout_id, product_configuration_id } = payload;

  const dataCart = await getCheckout({
    checkout_id,
  });

  if (!dataCart) {
    notFound();
  }

  let products = [...dataCart?.products];

  const itemFind = products.find((it) => it?._key === product_configuration_id);

  if (itemFind) {
    if (itemFind.quantity! > 1) {
      itemFind.quantity! -= 1;
    } else {
      products = products.filter((it) => it._key !== product_configuration_id);
    }
  }

  try {
    await upsertCart({
      ...dataCart,
      products,
    });
  } catch (err: any) {
    console.log(`ERROR minusItemCart :: ${err}`);
  }
}

export async function changeQuantityItemCart(payload: {
  checkout_id: string;
  product_configuration_id: string;
  quantity: number;
}) {
  const { checkout_id, product_configuration_id } = payload;

  const dataCart = await getCheckout({
    checkout_id,
  });

  if (!dataCart) {
    notFound();
  }

  const products = [...dataCart?.products];

  const itemFind = products.find((it) => it?._key === product_configuration_id);

  if (itemFind) {
    itemFind.quantity! += 1;
  }

  try {
    await upsertCart({
      ...dataCart,
      products,
    });
  } catch (err: any) {
    console.log(`ERROR changeQuantityItemCart :: ${err}`);
  }
}

export const deleteItemCart = async (payload: {
  product: SanityProductType;
  checkout_id: string;
}) => {
  const { checkout_id, product } = payload;

  const dataCart = await getCheckout({
    checkout_id,
  });

  const products = [...dataCart?.products!];

  const itemFindIndex = dataCart?.products?.findIndex(
    (item) =>
      item?.configuration_id === product?.configuration_id &&
      item?.product_id === product?.product_id
  );

  if (itemFindIndex! > -1) {
    products.splice(itemFindIndex!, 1);
  }

  await upsertCart({
    ...dataCart,
    products,
  });
};

export const createCheckoutSanity = async (payload: {
  checkout_id: string;
}) => {
  const { checkout_id, ...params } = payload;

  const response = await client
    .patch(checkout_id)
    .set({ ...params, is_payment: true })
    .commit({ autoGenerateArrayKeys: true });

  return response;
};

export const getDataSearchProduct = async (searchStr?: string) => {
  if (!searchStr) {
    return [];
  }

  const response = await client.fetch(groq`
    *[_type == "products" && name match "*${searchStr}*"]{
      "id": _id,
      name,
      "slug": slug.current,
      "image": image.main_image[0],
      "price": configuration[0].price,
      "count_configuration": count(configuration)
    }
  `);

  return response ?? [];
};

type PayloadCreateContactType = {
  name: string;
  email: string;
  phone: string;
  note: string;
  product?: SanityProductType | null;
};

export const createContactSanity = async (
  payload: PayloadCreateContactType
) => {
  const { product, ...params } = payload;

  const response = await client.create<PayloadCreateContactType>({
    _type: "contacts",
    ...params,
    product: product ?? undefined,
  });

  return response;
};
