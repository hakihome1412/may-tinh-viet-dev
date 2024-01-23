"use client";

import Input from "@/components/input";
import Textarea from "@/components/input/textarea";
import Radio from "@/components/radio";
import SelectCity from "@/components/selects/select-city";
import { SanityCartType } from "@/types";
import { formatPrice, getTotalPriceCart } from "@/utils";
import { createCheckout } from "./actions";
import ButtonCheckout from "./button-checkout";

type Props = {
  dataCheckout: SanityCartType | null;
};

export default function CheckoutContent({ dataCheckout }: Props) {
  const total = getTotalPriceCart(dataCheckout?.products);

  const createCheckoutAction = createCheckout.bind(null, {
    checkout_id: dataCheckout?.id!,
  });

  return (
    <form action={createCheckoutAction}>
      <div className="mt-6 gap-5 flex flex-col md:flex-row">
        <div className="w-full md:w-[60%]">
          <p className="uppercase text-lg font-semibold">
            Thông tin thanh toán
          </p>

          <div className="flex flex-col gap-3 mt-3">
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

            <Input
              type="text"
              id="address"
              name="address"
              placeholder="Địa chỉ"
              label="Địa chỉ"
              required
            />

            <SelectCity label="Tỉnh/Thành phố" name="city" required />

            <Textarea
              id="note"
              name="note"
              placeholder="Nội dung"
              rows={5}
              label="Nội dung"
              required
            />
          </div>
        </div>

        <div className="w-full md:w-[40%]">
          <div className="border-2 border-sky-600 rounded-md p-4 py-7">
            <p className="font-semibold text-lg uppercase">Đơn hàng của bạn</p>

            <div className="border-b-2 border-slate-300 py-2 mt-3 uppercase font-semibold flex items-center gap-2 w-full text-sm">
              <div className="w-[70%]">Sản phẩm</div>

              <div className="w-[30%] text-right">Tạm tính</div>
            </div>

            <div>
              {dataCheckout?.products?.map((item) => (
                <div
                  key={item?.configuration_id}
                  className="flex items-center py-3 border-b border-slate-200"
                >
                  <div className="w-[70%] text-sm text-slate-500">
                    {`${item?.name} - ${item?.short_configuration} `}
                    <span className="font-semibold text-slate-700">
                      x {item?.quantity}
                    </span>
                  </div>
                  <div className="w-[30%] text-right text-lg font-semibold text-sky-600">
                    {formatPrice(item?.price! * item?.quantity!)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b-2 border-slate-300 py-3 font-semibold flex items-center gap-2 w-full text-sm">
              <div className="w-[70%]">Tạm tính</div>

              <div className="w-[30%] text-right text-lg text-sky-600">
                {formatPrice(total)}
              </div>
            </div>

            <div className="border-b-2 border-slate-300 py-3 font-semibold flex items-center gap-2 w-full text-sm">
              <div className="w-[70%]">Tổng</div>

              <div className="w-[30%] text-right text-lg text-sky-600">
                {formatPrice(total)}
              </div>
            </div>

            <div className="py-3 font-semibold flex items-center gap-2">
              <Radio
                name="payment_type"
                id="cod"
                value="cod"
                label="Trả tiền mặt khi nhận hàng"
              />
            </div>

            <div className="py-3 font-semibold flex items-center gap-2">
              <Radio
                name="payment_type"
                id="bank"
                value="bank"
                label="Chuyển khoản ngân hàng (Quét mã QR)"
              />
            </div>

            <ButtonCheckout />
          </div>
        </div>
      </div>
    </form>
  );
}
