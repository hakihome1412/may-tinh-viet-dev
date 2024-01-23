interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

export default function Input({
  label,
  name,
  className,
  ...inputProps
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {!!label && (
        <div className="flex gap-1">
          <label className="font-semibold" htmlFor={name}>
            {label}
          </label>

          {inputProps?.required && (
            <span className="font-semibold text-red-500">*</span>
          )}
        </div>
      )}
      <input
        name={name}
        className={`border border-slate-300 px-3 rounded-md min-h-[32px] md:min-h-[36px] ${className}`}
        {...inputProps}
      />
    </div>
  );
}
