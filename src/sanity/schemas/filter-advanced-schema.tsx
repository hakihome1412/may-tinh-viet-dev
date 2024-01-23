import { defineArrayMember, defineField } from "sanity";

const filterAdvancedSchema = {
  name: "filterAdvanced",
  title: "Bộ Lọc Nâng Cao",
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
      name: "options",
      title: "Các tuỳ chọn",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              title: "Tên tuỳ chọn",
              type: "string",
              name: "name",
              validation: (rule) =>
                rule.required().max(255).error("Tối đa 255 ký tự"),
            }),
            defineField({
              name: "slug",
              title: "Giá trị",
              type: "slug",
              options: {
                source: (_, context: any) => context.parent.name,
              },
              validation: (rule) =>
                rule.required().error("Vui lòng nhập Giá trị"),
            }),
            defineField({
              title: "Trạng thái",
              name: "status",
              type: "boolean",
              initialValue: false,
            }),
          ],
        }),
      ],
    }),
  ],
};

export default filterAdvancedSchema;
