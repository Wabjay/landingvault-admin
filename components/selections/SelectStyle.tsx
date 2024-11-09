import React, { useEffect, useState } from "react";
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

export function SelectStyle({ value, initialValue }: SelectCategoryTypeProps) {
  const { metrics, fetchStyles, token } = store((state) => ({
    metrics: state.metrics,
    fetchStyles: state.fetchStyles,
    token: state.token,
  }));

  const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value


  useEffect(() => {
    // Fetch styles if they are not already in the state
    if (!metrics.styles.data.length) {
      fetchStyles(token);
    }
  }, [metrics.styles.data, fetchStyles, token]);

  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    value({
      name: "style",
      value: selected,
    });
  };

  // Generate options based on styles data
  const options = metrics.styles.data.map((tag: Tag) => ({
    value: tag.name,
    label: tag.title,
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
      placeholder="Select Style"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
