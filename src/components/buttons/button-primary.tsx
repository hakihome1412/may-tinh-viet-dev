import { ButtonType } from "@/types";
import { SpinStyled } from "./styled";
import Button from ".";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  type?: ButtonType;
  loading?: boolean;
}

export default function ButtonPrimary({
  children,
  loading,
  className,
  ...buttonProps
}: Props) {
  return (
    <Button
      className={`bg-primary text-white hover:bg-primary-hover ${className}`}
      {...buttonProps}
    >
      {loading ? <SpinStyled /> : children}
    </Button>
  );
}
