import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Select } from "antd";
import { tagss } from "@/data/dummyDatas";

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

export function SelectCategoryType({ value, initialValue }: SelectCategoryTypeProps) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const getTags = async () => {
    try {
      const response = await axios.get<{ tags: Tag[] }>("/tag/tags");
      setTags(response.data.tags);
      console.log(response.data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  useEffect(() => {
    getTags();
  }, []);

  const handleChange = (selected: string[]) => {
    const data = {
      name: "category",
      value: selected,
    };
    value(data);
  };

  useEffect(() => {
    const options = tagss.map(tag => ({
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
