import { defineField } from "sanity";

const contactSchema = {
  name: "contacts",
  title: "Quản Lý Thông Tin Liên Hệ",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên khách hàng",
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
      name: "note",
      title: "Nội dung",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "product",
      title: "Sản phẩm cần tư vấn",
      type: "object",
      readOnly: true,
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
      ],
      preview: {
        select: {
          title: "short_configuration",
          media: "image",
        },
      },
    }),
  ],
};

export default contactSchema;
