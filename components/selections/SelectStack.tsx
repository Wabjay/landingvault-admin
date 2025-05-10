import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Select } from "antd";
import { store } from "@/stores/store";

interface Tag {
  id: string;
  title: string;
  name: string;
}

interface SelectCategoryTypeProps {
  initialValue?: { id: string; title: string }[];
  onChange: (data: { name: string; value: { id: string }[] }) => void;
}


export function SelectStack({ initialValue = [], onChange }: SelectCategoryTypeProps) {
  const { metrics, fetchStacks } = store((state) => ({
    metrics: state.metrics,
    fetchStacks: state.fetchStacks,
  }));

  const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value


  useEffect(() => {
    if (!metrics.stacks.data.length) {
      fetchStacks();
    }
  }, [metrics.stacks.data, fetchStacks]);

   
  // Update selected value when initialValue prop changes
  useEffect(() => {
    if (initialValue?.length && metrics.stacks.data.length) {
      const ids = initialValue.map((val) => val.id);
      setSelectedValue(ids);
    }
  }, [initialValue, metrics.stacks.data]);


  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    onChange({
      name: "stacks",
      value: selected.map((id) => ({ id })),
    });
  };

  // Generate options based on stacks data
  const options = metrics.stacks.data.map((tag: Tag) => ({
    value: tag.id,
    label: tag.name,
  }));

 


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
