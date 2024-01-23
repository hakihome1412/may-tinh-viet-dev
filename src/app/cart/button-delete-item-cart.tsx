import CloseIcon from "@/components/icons/CloseIcon";
import { ButtonType } from "@/types";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  type?: ButtonType;
}

export default function ButtonDeleteItemCart({
  type = "button",
  className,
  ...buttonProps
}: Props) {
  return (
    <button
      type={type}
      className={`text-white bg-sky-600 p-[3px] rounded-full ${className}`}
      {...buttonProps}
    >
      <CloseIcon />
    </button>
  );
}
