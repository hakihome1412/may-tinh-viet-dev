import CheckIcon from "@/components/icons/CheckIcon";
import React, { ReactNode } from "react";

export default function CheckText({
  label = "",
  value = "",
  colorCheck = "#0284BE",
  className = "",
}: {
  label: string;
  value: ReactNode;
  colorCheck?: string;
  className?: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className={`inline-flex gap-1 ${className}`}>
      <div className="w-4 h-4">
        <CheckIcon className={`w-3 h-3 mt-1 text-[${colorCheck}]`} />
      </div>
      <span>
        <strong>{label}:</strong> {value}
      </span>
    </div>
  );
}
