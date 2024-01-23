import { defineField } from "sanity";

// eslint-disable-next-line import/no-anonymous-default-export
const hotlineContentSchema = {
  title: "Thông tin Hotline",
  name: "hotlineContent",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Loại hotline",
      type: "string",
      options: {
        list: [
          { title: "Kinh doanh", value: "business" },
          { title: "Kỹ thuật", value: "technical" },
        ],
      },
      initialValue: "business",
    }),
    defineField({
      name: "name",
      title: "Tên nhân viên",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Tên nhân viên"),
        rule.max(255).error("Tối đa 255 ký tự"),
      ],
    }),
    defineField({
      name: "phone",
      title: "Số điện thoại",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Số điện thoại"),
        rule.max(255).error("Tối đa 10 ký tự"),
      ],
    }),
    defineField({
      name: "is_main",
      title: "Hotline chính",
      type: "boolean",
    }),
  ],
};

export default hotlineContentSchema;
