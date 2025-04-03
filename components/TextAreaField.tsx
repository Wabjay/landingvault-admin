// components/TextAreaField.tsx
import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>void;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div className="w-full flex flex-col gap-3">
    <p className="font-16 font-medium text-[#2E2E27]">{label}</p>
    <TextArea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full text-16 text-grey-900 h-[121px] px-4 py-6 border border-[#C1C9C8]"
      showCount
      style={{ resize: "none" }}
    />
  </div>
);