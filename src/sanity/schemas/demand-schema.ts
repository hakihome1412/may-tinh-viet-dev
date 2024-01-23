import { defineField } from "sanity";

const demandSchema = {
  name: "demands",
  title: "Nhu Cầu Sử Dụng",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên gọi",
      type: "string",
      validation: (rule) => rule.required().max(255).error("Tối đa 255 ký tự"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // generate từ field 'name'
      },
      validation: (rule) => rule.required().error("Vui lòng nhập thông tin"),
    }),
    defineField({
      name: "image",
      title: "Hình ảnh",
      type: "image",
      options: {
        hotspot: true, // cho phép cắt ảnh
      },
    }),
  ],
};

export default demandSchema;
