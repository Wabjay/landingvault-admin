import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Select } from "antd";

interface Tag {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SelectCategoryTypeProps {
  value: (data: { name: string; value: string[] }) => void;
  initialValue: string[];
}

export function SelectMode({ value, initialValue }: SelectCategoryTypeProps) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);


const tags = [
    {name:"light", value:"light"},
    {name:"dark", value:"dark"}
  ]

  const handleChange = (selected: string[]) => {
    const data = {
      name: "mode",
      value: selected,
    };
    value(data);
  };

  useEffect(() => {
    const options = tags.map(tag => ({
      value: tag.name,
      label: tag.name,
    }));
    setOptions(options);
  }, [tags]);

  // Update selected value when initialValue prop changes
  useEffect(() => {
    if (initialValue && initialValue.length > 0) {
      handleChange(initialValue);
    }
  }, [initialValue]);

  return (
    <Select
      className="h-12"
      value={initialValue}
      placeholder="Pitch Deck Category"
      onChange={handleChange}
      options={options}
      style={{ width: '100%' }}
      maxTagCount="responsive"
    />
  );
}
