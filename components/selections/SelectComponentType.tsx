import React, { useEffect, useState } from "react";
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

export function SelectComponentType({ initialValue = [], onChange }: SelectCategoryTypeProps) {
  const { metrics, fetchComponents } = store((state) => ({
    metrics: state.metrics,
    fetchComponents: state.fetchComponents,
  }));

  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  // Fetch components if needed
  useEffect(() => {
    if (!metrics.components.data.length) {
      fetchComponents();
    }
  }, [metrics.components.data.length, fetchComponents]);

  // Set selected values when data and value are both available
  useEffect(() => {
    if (initialValue?.length && metrics.components.data.length) {
      const ids = initialValue.map((val) => val.id);
      setSelectedValue(ids);
    }
  }, [initialValue, metrics.components.data]);

  // Handle select change
  const handleChange = (selected: string[]) => {
    setSelectedValue(selected);
    onChange({
      name: "componentType",
      value: selected.map((id) => ({ id })),
    });
  };

  const options = metrics.components.data.map((tag: Tag) => ({
    value: tag.id,
    label: tag.title,
  }));

  return (
    <Select
      className="h-12"
      mode="multiple"
      value={selectedValue}
      placeholder="Component Type"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
