import { getImageDimensions } from "@sanity/asset-utils";
import { defineArrayMember, defineField, defineType } from "sanity";
import { MAX_PRODUCT_CONFIGURATION } from "../constants";

const productSchema = defineType({
  name: "products",
  title: "Sản Phẩm",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Mã sản phẩm",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Mã sản phẩm"),
        rule.max(255).error("Tối đa 255 kí tự"),
      ],
    }),
    defineField({
      name: "name",
      title: "Tên sản phẩm",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Tên sản phẩm"),
        rule.max(255).error("Tối đa 255 kí tự"),
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
      name: "brand",
      title: "Thương hiệu",
      type: "reference",
      to: [
        {
          type: "brands",
        },
      ],
      validation: (rule) => rule.required().error("Vui lòng chọn thương hiệu"),
    }),
    defineField({
      name: "demands",
      title: "Nhu cầu sử dụng",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            {
              type: "demands",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "type",
      title: "Loại sản phẩm",
      type: "string",
      options: {
        list: [
          { title: "Mới", value: "newest" },
          { title: "Bán chạy nhất", value: "bestseller" },
          { title: "Hot", value: "hottest" },
        ],
      },
      initialValue: "business",
      validation: (rule) =>
        rule.required().error("Vui lòng chọn Loại sản phẩm"),
    }),
    defineField({
      name: "image",
      title: "Hình",
      type: "object",
      fields: [
        defineField({
          name: "small_image",
          title: "Hình nhỏ",
          type: "array",
          of: [
            defineArrayMember({
              type: "image",
              options: {
                hotspot: true, // cho phép cắt ảnh
              },
              validation: (rule) =>
                rule.custom((value) => {
                  if (!value) {
                    return true;
                  }

                  const { width, height } = getImageDimensions(
                    value.asset!._ref
                  );

                  if (width > 1500 || height > 1500) {
                    return "Image must be at least 1500x1500 pixels";
                  }

                  return true;
                }),
            }),
          ],
        }),

        defineField({
          name: "main_image",
          title: "Hình lớn",
          type: "array",
          of: [
            defineArrayMember({
              type: "image",
              options: {
                hotspot: true, // cho phép cắt ảnh
              },
              validation: (rule) =>
                rule.custom((value) => {
                  if (!value) {
                    return true;
                  }

                  const { width, height } = getImageDimensions(
                    value.asset!._ref
                  );

                  if (width > 1500 || height > 1500) {
                    return "Image must be at least 1500x1500 pixels";
                  }

                  return true;
                }),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "configuration",
      title: "Cấu hình",
      type: "array",
      of: [
        defineArrayMember({
          type: "productConfigurationContent",
        }),
      ],
      validation: (rule) =>
        rule
          .max(MAX_PRODUCT_CONFIGURATION)
          .error("Sản phẩm chỉ được tối đa 4 cấu hình!"),
    }),
    defineField({
      name: "gift",
      title: "Quà tặng",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            {
              type: "gifts",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "benefit",
      title: "Quyền lợi khách hàng",
      type: "blockContent",
    }),
    defineField({
      name: "description",
      title: "Thông tin sản phẩm",
      type: "blockContent",
    }),
    defineField({
      name: "description_technical",
      title: "Thông tin kỹ thuật",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          title: "Cấu hình",
          fields: [
            defineField({
              name: "name",
              title: "Tên cấu hình",
              type: "string",
              placeholder: "VD: CPU, RAM,...",
            }),
            defineField({
              name: "content",
              title: "Nội dung",
              type: "blockContent",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image.small_image.0.asset",
    },
  },
});

export default productSchema;
