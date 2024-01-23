import { defineField, defineType } from "sanity";

const giftSchema = defineType({
  name: "gifts",
  title: "Quà Tặng",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên quà tặng",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Tên quà tặng"),
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
      name: "image",
      title: "Hình quà tặng",
      type: "image",
      options: {
        hotspot: true, // cho phép cắt ảnh
      },
      fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
      validation: (rule) =>
        rule.required().error("Vui lòng chọn Hình quà tặng"),
    }),
  ],
});

export default giftSchema;
