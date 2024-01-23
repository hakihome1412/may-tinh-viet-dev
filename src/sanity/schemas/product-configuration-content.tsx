import { defineField } from "sanity";
import dynamic from "next/dynamic";
import FilterAdvanced from "../components/FilterAdvanced";

const InputPrice = dynamic(
  () => {
    return import("../components/InputPrice");
  },
  { ssr: false }
);

// eslint-disable-next-line import/no-anonymous-default-export
const productConfigurationContentSchema = {
  title: "Cấu hình",
  name: "productConfigurationContent",
  type: "object",
  fields: [
    defineField({
      name: "short_configuration",
      title: "Tên cấu hình",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Giá",
      type: "number",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Giá"),
        rule.greaterThan(1000).error("Giá phải lớn hơn 1.000"),
        rule.positive().error("Không đúng định dạng"),
      ],
      components: {
        input: (props) => {
          const { value, onChange } = props;
          return <InputPrice value={value} onChange={onChange} />;
        },
      },
    }),
    defineField({
      name: "old_price",
      title: "Giá cũ",
      type: "number",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Giá cũ"),
        rule.greaterThan(1000).error("Giá cũ phải lớn hơn 1.000"),
        rule.positive().error("Không đúng định dạng"),
      ],
      components: {
        input: (props) => {
          const { value, onChange } = props;
          return <InputPrice value={value} onChange={onChange} />;
        },
      },
    }),
    defineField({
      name: "conf_content",
      title: "Mô tả cấu hình",
      type: "object",
      fields: [
        defineField({
          name: "warranty",
          title: "Bảo hành",
          type: "string",
          options: {
            list: [
              { title: "6 tháng", value: "6months" },
              { title: "12 tháng", value: "12months" },
              { title: "24 tháng", value: "24months" },
              { title: "Trọn đời", value: "all" },
            ],
          },
        }),
        defineField({
          name: "cpu",
          title: "CPU",
          type: "string",
        }),
        defineField({
          name: "ram",
          title: "RAM",
          type: "string",
        }),
        defineField({
          name: "ssd",
          title: "SSD",
          type: "string",
        }),
        defineField({
          name: "vga",
          title: "VGA",
          type: "string",
        }),
        defineField({
          name: "display",
          title: "DISPLAY",
          type: "string",
        }),
        defineField({
          name: "condition",
          title: "CONDITION",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "filter_advanced",
      title: "Filter nâng cao",
      type: "object",
      fields: [
        defineField({
          title: "CPU",
          name: "cpu",
          type: "string",
        }),
      ],
      components: {
        input: (props) => {
          const { value, onChange } = props;
          return <FilterAdvanced value={value} onChange={onChange} />;
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "short_configuration",
      // media: "image.small_image.0.asset",
    },
  },
};

export default productConfigurationContentSchema;
