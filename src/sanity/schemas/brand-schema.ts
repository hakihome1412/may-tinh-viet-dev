import { defineField } from "sanity";

const brandSchema = {
  name: "brands",
  title: "Thương Hiệu",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên thương hiệu",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Tên thương hiệu"),
        rule.max(255).error("Tối đa 255 ký tự"),
      ],
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
      name: "logo",
      title: "Logo thương hiệu",
      type: "image",
      options: {
        hotspot: true, // cho phép cắt ảnh
      },
      fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
      validation: (rule) =>
        rule.required().error("Vui lòng chọn Logo thương hiệu"),
    }),
  ],
};

export default brandSchema;
