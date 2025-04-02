import React, { useEffect, useState } from "react";
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

export function SelectComponentType({ value, initialValue }: SelectCategoryTypeProps) {
  const { metrics, fetchComponents, token } = store((state) => ({
    metrics: state.metrics,
    fetchComponents: state.fetchComponents,
    token: state.token,
  }));
  const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value


  useEffect(() => {
    // Fetch component tags if not already loaded
    if (!metrics.components.data.length) {
      fetchComponents();
    }
  }, [metrics.components.data, fetchComponents, token]);

  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    value({
      name: "componentType",
      value: selected,
    });
  };

  // Format options based on fetched components
  const options = metrics.components.data.map((tag: Tag) => ({
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

      // defaultValue={Array.isArray(initialValue) ? initialValue : [initialValue]}
      placeholder="Pitch Deck Category"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
