import dynamic from "next/dynamic";
import { defineField, defineType } from "sanity";

const InputPrice = dynamic(
  () => {
    return import("../components/InputPrice");
  },
  { ssr: false }
);

const pricesSchema = defineType({
  name: "prices",
  title: "Cấu Hình Mức Giá",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên",
      type: "string",
    }),
    defineField({
      name: "from",
      title: "Giá từ",
      type: "number",
      components: {
        input: (props) => {
          const { value, onChange } = props;
          return <InputPrice value={value} onChange={onChange} />;
        },
      },
    }),
    defineField({
      name: "to",
      title: "Giá đến",
      type: "number",
      components: {
        input: (props) => {
          const { value, onChange } = props;
          return <InputPrice value={value} onChange={onChange} />;
        },
      },
    }),
  ],
});

export default pricesSchema;
