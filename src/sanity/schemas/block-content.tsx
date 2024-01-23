import AlignCenterIcon from "@/components/icons/AlignCenterIcon";
import AlignLeftIcon from "@/components/icons/AlignLeftIcon";
import AlignRightIcon from "@/components/icons/AlignRightIcon";
import { ReactNode } from "react";
import { defineArrayMember, defineField } from "sanity";

const HeadingColor = ({ children }: { children: ReactNode }) => {
  return <span className="text-sky-600 font-semibold text-lg">{children}</span>;
};

const HeadingBlack = ({ children }: { children: ReactNode }) => {
  return <h4 className="text-black font-semibold text-lg">{children}</h4>;
};

const TextCenter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center text-center w-full">
      {children}
    </div>
  );
};

const TextRight = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-end items-center text-right w-full">
      {children}
    </div>
  );
};

const TextLeft = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-start items-center text-left w-full">
      {children}
    </div>
  );
};

const IconAlignLeft = () => {
  return <AlignLeftIcon className="w-4 h-4" />;
};

const IconAlignCenter = () => {
  return <AlignCenterIcon className="w-4 h-4" />;
};

const IconAlignRight = () => {
  return <AlignRightIcon className="w-4 h-4" />;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        {
          title: "In hoa",
          value: "headingBlack",
          component: HeadingBlack,
        },
        {
          title: "In hoa màu",
          value: "headingColor",
          component: HeadingColor,
        },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Chữ đậm", value: "strong" },
          { title: "Chữ nghiêng", value: "em" },
          {
            title: "Canh giữa",
            value: "center",
            component: TextCenter,
            icon: IconAlignCenter,
          },
          {
            title: "Canh trái",
            value: "left",
            component: TextLeft,
            icon: IconAlignLeft,
          },
          {
            title: "Canh phải",
            value: "right",
            component: TextRight,
            icon: IconAlignRight,
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineField({
      type: "image",
      name: "image",
      options: { hotspot: true },
    }),
  ],
};
