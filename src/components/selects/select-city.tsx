/* eslint-disable jsx-a11y/role-supports-aria-props */
import thanhPhoJSON from "@/json/tinh_tp.json";

interface Props extends React.HTMLProps<HTMLSelectElement> {
  label?: string;
  required?: boolean;
}

export default function SelectCity({
  label,
  name,
  required = false,
  ...selectProps
}: Props) {
  const options = thanhPhoJSON.map((city) => ({
    label: city?.name,
    value: city?.name,
  }));

  return (
    <div className="flex flex-col gap-1">
      {!!label && (
        <div className="flex gap-1">
          <label className="font-semibold" htmlFor={name}>
            {label}
          </label>

          {required && <span className="font-semibold text-red-500">*</span>}
        </div>
      )}

      <select
        name={name}
        className="min-h-[32px] md:min-h-[36px] px-3 border border-slate-300 rounded-md"
        defaultValue="Hồ Chí Minh"
        {...selectProps}
      >
        {options?.map((item) => (
          <option key={item?.value} value={item?.value}>
            {item?.label}
          </option>
        ))}
      </select>
    </div>
  );
}
