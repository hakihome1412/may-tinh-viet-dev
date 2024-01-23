"use client";

import { useMobile } from "@/hooks/useMobile";
import isNumber from "lodash/isNumber";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  value?: number;
  onAdd?: (value: number) => void;
  onMinus?: (value: number) => void;
  onChange?: (value: number) => void;
};

export default function InputQuantity({
  value = 0,
  onAdd,
  onMinus,
  onChange,
}: Props) {
  const { isMobile } = useMobile();
  const [quantity, setQuantity] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(e.target.value);
    if (isNumber(numberValue)) {
      onChange?.(numberValue);
      setQuantity(numberValue);
    } else {
      onChange?.(1);
      setQuantity(1);
    }
  };

  const handleAdd = () => {
    onAdd?.(quantity + 1);
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    onMinus?.(quantity - 1);
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  return (
    <div className="flex items-center h-8">
      <button
        className="h-full w-full md:w-8 border border-slate-300 flex items-center justify-center transition hover:bg-slate-400 rounded-tl-md rounded-bl-md"
        onClick={handleMinus}
      >
        -
      </button>
      <input
        min={1}
        value={quantity}
        className="h-full w-7 md:w-10 text-sm border border-slate-300 border-l-0 border-r-0 text-center focus-visible:outline-none"
        onChange={handleChange}
      />
      <button
        className="h-full w-full md:w-8 border border-slate-300 flex items-center justify-center transition hover:bg-slate-400 rounded-tr-md rounded-br-md"
        onClick={handleAdd}
      >
        +
      </button>
    </div>
  );
}
