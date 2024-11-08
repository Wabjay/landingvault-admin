import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Select } from "antd";
import { store } from "@/stores/store";

interface Tag {
  _id: string;
  title: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SelectCategoryTypeProps {
  value: (data: { name: string; value: string[] }) => void;
  initialValue: string[];
}

export function SelectType({ value, initialValue }: SelectCategoryTypeProps) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

 
  const { metrics } = store();

  useEffect(() => {
    setTags(metrics.types.data);
    console.log(metrics.types.data);
  }, []);


  const handleChange = (selected: string[]) => {
    const data = {
      name: "type",
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
      mode="multiple"
      value={initialValue}
      placeholder="Pitch Deck Category"
      onChange={handleChange}
      options={options}
      style={{ width: '100%' }}
      maxTagCount="responsive"
    />
  );
}
