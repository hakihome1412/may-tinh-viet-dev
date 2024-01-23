interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

export default function Radio({ label, name, id, ...radioProps }: Props) {
  return (
    <>
      <input type="radio" id={id} name={name} {...radioProps} />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
