import ButtonPrimary from "@/components/buttons/button-primary";
import PhoneIcon from "@/components/icons/PhoneIcon";
import ModalContactCallback from "@/components/modals/modal-contact-callback";
import { SanityProductType } from "@/types";
import { useState } from "react";

type Props = {
  product: SanityProductType;
};

export default function ButtonContactCallback({ product }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCancelModal = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonPrimary onClick={handleOpenModal}>
        <PhoneIcon /> Gọi lại cho chúng tôi
      </ButtonPrimary>

      {open && (
        <ModalContactCallback
          product={product}
          open={open}
          onCancel={handleCancelModal}
        />
      )}
    </>
  );
}
