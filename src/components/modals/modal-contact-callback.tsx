import { Modal } from "antd";
import Input from "../input";
import Textarea from "../input/textarea";
import Button from "../buttons";
import ButtonPrimary from "../buttons/button-primary";
import Image from "next/image";
import { getImageSanity } from "@/sanity/utils/image-url";
import { SanityProductType } from "@/types";
import { getAlt } from "@/utils";
import { FormEvent, useState } from "react";
import { createContactSanity } from "@/sanity/utils";
import { showSuccessNotification } from "../notifications";

type Props = {
  open: boolean;
  product?: SanityProductType | null;
  onCancel?: () => void;
};

export default function ModalContactCallback({
  open = false,
  product = null,
  onCancel,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      note: formData.get("note") as string,
      product,
    };

    setLoading(true);
    const response = await createContactSanity(payload);
    setLoading(false);
    if (response) {
      showSuccessNotification({
        message: "Liên hệ thành công",
        description: "Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất.",
      });
      onCancel?.();
    } else {
      showSuccessNotification({
        message: "Liên hệ thất bại",
        description: "Có lỗi xảy ra, vui lòng thử lại sau ít phút!",
      });
    }
  };

  return (
    <Modal
      title="Thông tin liên hệ"
      open={open}
      onCancel={onCancel}
      width="80%"
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <div
          className={`grid grid-cols-1 gap-3 md:${
            product ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {product && (
            <div className="flex flex-col gap-3 items-center">
              <div className="w-[180px] h-[180px] md:w-[260px] md:h-[260px]">
                <Image
                  width={500}
                  height={500}
                  src={getImageSanity(product?.image)}
                  alt={getAlt(product?.name)}
                  className="w-full h-full"
                />
              </div>

              <p className="font-semibold text-base text-center md:text-xl">
                {`${product?.name} - ${product?.short_configuration}`}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Họ tên"
              label="Họ tên"
              required
            />

            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              label="Số điện thoại"
              required
            />

            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              label="Email"
              required
            />

            <Textarea
              id="note"
              name="note"
              placeholder="Nội dung"
              rows={5}
              label="Nội dung"
              required
            />

            <div className="flex gap-3 items-center justify-end">
              <Button onClick={onCancel}>Huỷ</Button>

              <ButtonPrimary
                type="submit"
                loading={loading}
                className="min-w-[120px]"
              >
                Gửi ngay
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
