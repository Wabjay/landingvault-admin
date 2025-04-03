import React, { useEffect, useState } from "react";
import { Select } from "antd";

interface SelectCategoryTypeProps {
  value: (data: { name: string; value: string }) => void;
  initialValue: string;
}

export function SelectMode({ value, initialValue }: SelectCategoryTypeProps) {
  const [selectedValue, setSelectedValue] = useState<string>(''); // Controlled state for value

  // Mode options
  const tags = [
    { name: "light", value: "light" },
    { name: "dark", value: "dark" },
  ];

  // Handle selection change
  const handleChange = (selected: string) => {
    setSelectedValue(selected); // Update local state
    value({ name: "mode", value: selected }); // Pass the updated value back to parent
  };

  // Update selected value when initialValue prop changes
  useEffect(() => {
    if (initialValue) {
      // If initialValue is a string, convert it into an array to match the expected format
      setSelectedValue(initialValue);
    }
  }, [initialValue]); // Runs when the initialValue changes

  return (
    <Select
      className="h-12"
      // mode="multiple"
      value={selectedValue} // Controlled value
      placeholder="Select Mode"
      onChange={handleChange}
      options={tags.map(tag => ({ value: tag.value, label: tag.name }))}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
