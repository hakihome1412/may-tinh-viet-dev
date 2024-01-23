import { defineArrayMember, defineField, defineType } from "sanity";

const checkoutSchema = defineType({
  name: "checkouts",
  title: "Quản Lý Thanh Toán",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Khách hàng",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Số điện thoại",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "address",
      title: "Địa chỉ",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "city",
      title: "Tỉnh / Thành phố",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "note",
      title: "Nội dung",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "payment_type",
      title: "Phương thức thanh toán",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "is_payment",
      title: "Đã thanh toán",
      type: "boolean",
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: "products",
      title: "Sản phẩm trong giỏ hàng",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Tên sản phẩm",
              type: "string",
              readOnly: true,
            }),
            defineField({
              name: "short_configuration",
              title: "Cấu hình ngắn gọn",
              type: "string",
              readOnly: true,
            }),
            defineField({
              name: "image",
              title: "Hình sản phẩm",
              type: "image",
              readOnly: true,
            }),
            defineField({
              name: "price",
              title: "Giá sản phẩm",
              type: "number",
              readOnly: true,
            }),
            defineField({
              name: "quantity",
              title: "Số lượng",
              type: "number",
              readOnly: true,
            }),
            defineField({
              name: "product_id",
              title: "Mã sản phẩm",
              type: "string",
              hidden: true,
              readOnly: true,
            }),
            defineField({
              name: "configuration_id",
              title: "Mã cấu hình sản phẩm",
              type: "string",
              hidden: true,
              readOnly: true,
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "string",
              hidden: true,
              readOnly: true,
            }),
          ],
          preview: {
            select: {
              title: "short_configuration",
              media: "image",
            },
          },
        }),
      ],
      readOnly: true,
    }),
  ],
});

export default checkoutSchema;
