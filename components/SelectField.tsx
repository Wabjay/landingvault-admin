// components/SelectField.tsx
import React from "react";

interface SelectFieldProps {
  name: string;
  label: string;
  component: React.FC<any>;
  value: string[] | string;
  onChange: (data: { name: string; value: any }) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  component: Component,
  value,
  onChange,
}) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <Component value={(val: any) => onChange({ name, value: val })} initialValue={value} />
  </div>
);