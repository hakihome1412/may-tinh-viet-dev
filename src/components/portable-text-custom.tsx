"use client";

import { getImageSanity } from "@/sanity/utils/image-url";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React, { ReactNode } from "react";

export default function PortableTextCustom({ content }: { content: any }) {
  return (
    <PortableText
      value={content}
      components={{
        block: {
          headingBlack: ({ children }: { children: ReactNode }) => (
            <p className="text-black font-semibold text-lg">{children}</p>
          ),
          headingColor: ({ children }: { children: ReactNode }) => (
            <p className="text-sky-600 font-semibold text-lg">{children}</p>
          ),
        },
        marks: {
          center: ({ children }: { children: ReactNode }) => (
            <div className="flex justify-center items-center text-center w-full">
              {children}
            </div>
          ),
          right: ({ children }: { children: ReactNode }) => (
            <div className="flex justify-end items-center text-right w-full">
              {children}
            </div>
          ),
          left: ({ children }: { children: ReactNode }) => (
            <div className="flex justify-start items-center text-left w-full">
              {children}
            </div>
          ),
        },
        types: {
          image: ({ value }) => {
            return (
              <Image
                alt="detail"
                src={getImageSanity(value)}
                width={500}
                height={500}
                className="w-fit h-fit"
              />
            );
          },
        },
      }}
    />
  );
}
