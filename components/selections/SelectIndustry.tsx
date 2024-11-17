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

export function SelectIndustry({ value, initialValue }: SelectCategoryTypeProps) {
  const { metrics, fetchIndustries, token } = store((state) => ({
    metrics: state.metrics,
    fetchIndustries: state.fetchIndustries,
    token: state.token,
  }));

  const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value


  useEffect(() => {
    // Fetch industries if they are not already in the state
    if (!metrics.industries.data.length) {
      fetchIndustries(token);
    }
  }, [metrics.industries.data, fetchIndustries, token]);

  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    value({
      name: "industry",
      value: selected,
    });
  };

  // Generate options based on industries data
  const options = metrics.industries.data.map((tag: Tag) => ({
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
      placeholder="Select Industry"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
