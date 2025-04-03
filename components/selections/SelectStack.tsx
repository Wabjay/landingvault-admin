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

interface SelectCategoryTypeProps {
  value: (data: { name: string; value: string[] }) => void;
  initialValue: string[] | string;
}

export function SelectStack({ value, initialValue }: SelectCategoryTypeProps) {
  const { metrics, fetchStacks, token } = store((state) => ({
    metrics: state.metrics,
    fetchStacks: state.fetchStacks,
    token: state.token,
  }));

  const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value


  useEffect(() => {
    // Fetch stacks if they are not already in the state
    if (!metrics.stacks.data.length) {
      fetchStacks(token);
    }
  }, [metrics.stacks.data, fetchStacks, token]);

  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    value({
      name: "stacks",
      value: selected,
    });
  };

  // Generate options based on stacks data
  const options = metrics.stacks.data.map((tag: Tag) => ({
    value: tag.id,
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
      placeholder="Select Stack"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
