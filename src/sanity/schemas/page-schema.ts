import { defineField } from "sanity";

const pageSchema = {
  name: "pages",
  title: "Các Trang Tĩnh",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
    }),
  ],
};

export default pageSchema;
