import { ButtonType } from "@/types";
import { SpinStyled } from "./styled";
import Button from ".";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  type?: ButtonType;
  loading?: boolean;
}

export default function ButtonSecondary({
  children,
  className,
  loading,
  ...buttonProps
}: Props) {
  return (
    <Button
      {...buttonProps}
      className={`bg-secondary text-white hover:bg-secondary-hover ${className}`}
    >
      {loading ? <SpinStyled /> : children}
    </Button>
  );
}
