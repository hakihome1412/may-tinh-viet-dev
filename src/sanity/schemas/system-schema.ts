import { defineArrayMember, defineField } from "sanity";

const systemSchema = {
  name: "systems",
  title: "Thông Tin Hệ Thống",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên hệ thống",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Tên hệ thống"),
        rule.max(255).error("Tối đa 255 ký tự"),
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo hệ thống",
      type: "image",
      options: {
        hotspot: true, // cho phép cắt ảnh
      },
      fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
      validation: (rule) =>
        rule.required().error("Vui lòng chọn Logo hệ thống"),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Email"),
        rule.email().error("Email không đúng định dạng"),
      ],
    }),
    defineField({
      name: "address",
      title: "Địa chỉ",
      type: "string",
      validation: (rule) => [
        rule.required().error("Vui lòng nhập Địa chỉ"),
        rule.max(255).error("Tối đa 255 ký tự"),
      ],
    }),
    defineField({
      name: "hotline",
      title: "Hotline",
      type: "array",
      of: [
        defineArrayMember({
          type: "hotlineContent",
        }),
      ],
    }),
    defineField({
      name: "share",
      title: "Share",
      type: "object",
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "string",
          validation: (rule) =>
            rule
              .regex(/^(ftp|http|https):\/\/[^ "]+$/)
              .error("Không đúng định dạng"),
        }),
        defineField({
          name: "pinterest",
          title: "Pinterest",
          type: "string",
          validation: (rule) =>
            rule
              .regex(/^(ftp|http|https):\/\/[^ "]+$/)
              .error("Không đúng định dạng"),
        }),
        defineField({
          name: "twitter",
          title: "Twitter (X)",
          type: "string",
          validation: (rule) =>
            rule
              .regex(/^(ftp|http|https):\/\/[^ "]+$/)
              .error("Không đúng định dạng"),
        }),
        defineField({
          name: "youtube",
          title: "Youtube",
          type: "string",
          validation: (rule) =>
            rule
              .regex(/^(ftp|http|https):\/\/[^ "]+$/)
              .error("Không đúng định dạng"),
        }),
      ],
    }),
  ],
};

export default systemSchema;
