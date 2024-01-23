import { ButtonType } from "@/types";
import { SpinStyled } from "./styled";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  type?: ButtonType;
  loading?: boolean;
}

export default function Button({
  children,
  loading,
  className,
  type = "button",
  ...buttonProps
}: Props) {
  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 uppercase py-2 px-4 rounded-md font-semibold border transition duration-300 ${className}`}
      {...buttonProps}
    >
      {loading ? <SpinStyled /> : children}
    </button>
  );
}
