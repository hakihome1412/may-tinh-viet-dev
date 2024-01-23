import ButtonSecondary from "@/components/buttons/button-secondary";
import CartIcon from "@/components/icons/CartIcon";

type Props = {
  onClick?: () => void;
  loading?: boolean;
};

export default function ButtonSubmitAddCart({
  onClick,
  loading = false,
}: Props) {
  return (
    <ButtonSecondary
      onClick={onClick}
      disabled={loading}
      loading={loading}
      className="w-full"
    >
      <CartIcon /> Mua ngay
    </ButtonSecondary>
  );
}
