"use client";

import { useEffect, useState } from "react";
import ZaloIcon from "./icons/ZaloIcon";
import { Carousel, Popover } from "antd";
import FacebookIcon from "./icons/FacebookIcon";
import PhoneIcon from "./icons/PhoneIcon";
import Link from "next/link";

const content = (
  <div className="flex flex-col w-[200px] space-y-2">
    <div className="w-full h-10 flex items-center p-3 transition hover:bg-gray-100">
      <div className="flex items-center gap-2">
        <ZaloIcon className="w-7 h-7 text-sky-600" />
        <span>Kinh doanh</span>
      </div>
    </div>

    <Link href="https://m.me/cuahangmaytinhviet" target="_blank">
      <div className="w-full h-10 flex items-center p-3 transition hover:bg-gray-100">
        <div className="flex items-center gap-2">
          <FacebookIcon className="w-7 h-7 text-sky-600" />
          <span>Messenger</span>
        </div>
      </div>
    </Link>

    <Link href="https://m.me/cuahangmaytinhviet" target="_blank">
      <div className="w-full h-10 flex items-center p-3 transition hover:bg-gray-100">
        <div className="flex items-center gap-2">
          <FacebookIcon className="w-7 h-7 text-sky-600" />
          <span>Messenger</span>
        </div>
      </div>
    </Link>
  </div>
);

export default function SupportOnline() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, []);

  return (
    <div
      className={`fixed items-center gap-2 transition duration-[3s] ease-in-out font-light z-50 flex right-5 bottom-5 md:bottom-20 md:right-20 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Popover
        content={content}
        overlayInnerStyle={{
          padding: 0,
          overflow: "hidden",
        }}
      >
        <div className="bg-sky-600 text-sm text-white rounded-full py-2 pl-2 pr-5 relative w-fit flex items-center gap-2">
          <div className="h-10 w-10 bg-white rounded-full mx-auto my-auto">
            <Carousel
              dots={false}
              autoplay={true}
              style={{
                marginTop: 6,
                marginLeft: 6,
              }}
            >
              <div>
                <ZaloIcon className="w-7 h-7 text-sky-600" />
              </div>
              <div>
                <FacebookIcon className="w-7 h-7 text-sky-600" />
              </div>
              <div>
                <PhoneIcon className="w-7 h-7 text-sky-600" />
              </div>
            </Carousel>
          </div>
          Support Online
          <div className="animate-ping bg-sky-600 absolute top-0 w-full h-full rounded-full" />
        </div>
      </Popover>
    </div>
  );
}
