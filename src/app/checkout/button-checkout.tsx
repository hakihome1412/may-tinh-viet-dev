import ButtonPrimary from "@/components/buttons/button-primary";
import { Spin } from "antd";
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function ButtonCheckout() {
  const { pending } = useFormStatus();

  return (
    <ButtonPrimary
      type="submit"
      disabled={pending}
      loading={pending}
      className="w-full mt-3"
    >
      {pending ? <Spin /> : "Đặt hàng"}
    </ButtonPrimary>
  );
}
