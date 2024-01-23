import CheckIcon from "@/components/icons/CheckIcon";
import { formatPrice } from "@/utils";

export default function OptionItem({
  item,
  checked = false,
  onClick,
}: {
  item: any;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (item: any) => void;
}) {
  const content = item.short_configuration;

  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <div
      className={`flex items-center justify-center flex-col p-3 gap-2 shadow-md rounded-md transition cursor-pointer box-border border hover:shadow-xl ${
        checked ? "border-sky-600" : "border-gray-100"
      }`}
      onClick={handleClick}
    >
      {/* Radio Button */}
      <div
        className={`w-[20px] h-[20px] flex items-center justify-center rounded-full transition border border-gray-300 ${
          checked ? "bg-sky-600" : ""
        }`}
      >
        <CheckIcon
          className={`w-[12px] h-[12px] text-white transition ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <p className="uppercase text-center text-sm line-clamp-3">{content}</p>

      <p className="font-semibold text-sky-600 text-lg">
        {formatPrice(item?.price)}
      </p>
    </div>
  );
}
