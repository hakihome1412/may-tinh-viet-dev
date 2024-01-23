import { defineArrayMember, defineField, defineType } from "sanity";

const detailConfigurationContentSchema = defineType({
  title: "Chi tiết cấu hình",
  name: "detailConfigurationContent",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Tên cấu hình",
      type: "string",
    }),
    defineField({
      name: "options",
      title: "Option",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              title: "Tên option",
              name: "name",
              type: "string",
            }),
            defineField({
              title: "Chi tiết",
              name: "detail",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});

export default detailConfigurationContentSchema;
