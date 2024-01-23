import { InputNumber } from "antd";
import { PatchEvent, set } from "sanity";
import styled from "styled-components";

const formatter = (value: any) =>
  Number(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const InputNumberStyled = styled(InputNumber)`
  width: 100%;
  border-radius: 0;
  font-size: 16px;
  input {
    height: 35px !important;
  }
`;

export default function InputPrice({
  value,
  onChange,
}: {
  value?: number;
  onChange?: any;
}) {
  const handleChange = (value: number | null) => {
    onChange(PatchEvent.from(set(value)));
  };

  return (
    <InputNumberStyled
      value={value}
      formatter={formatter}
      onChange={handleChange}
    />
  );
}
