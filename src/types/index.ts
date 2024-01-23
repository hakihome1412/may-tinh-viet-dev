export type SanityProductType = {
  name?: string;
  image?: any;
  price?: number;
  product_id?: string;
  configuration_id?: string;
  quantity?: number;
  short_configuration?: string;
  slug?: string;
  _key?: string;
};

export type SanityCartType = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  is_payment?: boolean;
  products: SanityProductType[];
};

export interface UpsertCartResponse extends SanityCartType {
  _id?: string;
}

export type ButtonType = "button" | "submit" | "reset" | undefined;
