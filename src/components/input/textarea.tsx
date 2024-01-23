interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
}

export default function Textarea({
  label,
  name,
  className,
  ...textareaProps
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {!!label && (
        <div className="flex gap-1">
          <label className="font-semibold" htmlFor={name}>
            {label}
          </label>

          {textareaProps?.required && (
            <span className="font-semibold text-red-500">*</span>
          )}
        </div>
      )}
      <textarea
        name={name}
        className={`border border-slate-300 px-3 py-1 rounded-md h-auto ${className}`}
        {...textareaProps}
      />
    </div>
  );
}
