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
  initialValue: string[] | string;
}

export function SelectType({ value, initialValue }: SelectCategoryTypeProps) {
  const { metrics, fetchTypes, token } = store((state) => ({
    metrics: state.metrics,
    fetchTypes: state.fetchTypes,
    token: state.token,
  }));
  
  const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value

  useEffect(() => {
    // Fetch types if they are not already in the state
    if (!metrics.types.data.length) {
      fetchTypes(token);
    }
  }, [metrics.types.data, fetchTypes, token]);

  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    value({
      name: "type",
      value: selected,
    });
  };

  // Generate options based on types data
  const options = metrics.types.data.map((tag: Tag) => ({
    value: tag.name,
    label: tag.name,
  }));

    // Update selected value when initialValue prop changes
    useEffect(() => {
      if (initialValue) {
        // If initialValue is a string, convert it into an array to match the expected format
        setSelectedValue(Array.isArray(initialValue) ? initialValue : [initialValue]);
      }
    }, [initialValue]); // Runs when the initialValue changes
  
  
  return (
    <Select
      className="h-12"
      mode="multiple"
      value={selectedValue} // Controlled value      defaultValue={Array.isArray(initialValue) ? initialValue : [initialValue]}
      // defaultValue={Array.isArray(initialValue) ? initialValue : [initialValue]}
      placeholder="Select Type"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
