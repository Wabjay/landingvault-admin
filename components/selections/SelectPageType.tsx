import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Select } from "antd";
import { store } from "@/stores/store";

interface Tag {
  _id: string;
  id: string;
  title: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IdValue {
  id: string;
}

interface SelectCategoryTypeProps {
  value: (data: { name: string; value: IdValue[] }) => void;
  initialValue: IdValue[] | IdValue;
}
export function SelectPageType({ value, initialValue }: SelectCategoryTypeProps) {
  const { metrics, fetchTypes } = store((state) => ({
    metrics: state.metrics,
    fetchTypes: state.fetchTypes,
  }));

    const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value
  

  useEffect(() => {
    // Fetch types if they are not already in the state
    if (!metrics.types.data.length) {
      fetchTypes();
    }
  }, [metrics.types.data, fetchTypes]);

  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    value({
      name: "pageType",
      value: selected.map((id) => ({ id })),
    });
  };

  // Generate options based on types data
  const options = metrics.types.data.map((tag: Tag) => ({
    value: tag.id,
    label: tag.title,
  }));

      useEffect(() => {
        if (initialValue) {
          const ids = Array.isArray(initialValue)
            ? initialValue.map((item) => item.id)
            : [initialValue.id];
          setSelectedValue(ids);
        }
      }, [initialValue]);
  

  return (
    <Select
      className="h-12"
      mode="multiple"
      value={selectedValue} // Controlled value      defaultValue={Array.isArray(initialValue) ? initialValue : [initialValue]}
      placeholder="Select Page Type"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
