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

export function SelectStyle({ initialValue = [], onChange  }: SelectCategoryTypeProps) {
  const { metrics, fetchStyles } = store((state) => ({
    metrics: state.metrics,
    fetchStyles: state.fetchStyles,
  }));

  const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value


  useEffect(() => {
    // Fetch styles if they are not already in the state
    if (!metrics.styles.data.length) {
      fetchStyles();
    }
  }, [metrics.styles.data, fetchStyles]);

 // Set selected values when data and value are both available
  useEffect(() => {
    if (initialValue?.length && metrics.styles.data.length) {
      const ids = initialValue.map((val) => val.id);
      setSelectedValue(ids);
    }
  }, [initialValue, metrics.styles.data]);


  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    onChange({
      name: "styles",
      value: selected.map((id) => ({ id })), // return only id
          });
  };

  // Generate options based on styles data
  const options = metrics.styles.data.map((tag: Tag) => ({
    value: tag.id,
    label: tag.title,
  }));

 

    
  return (
    <Select
      className="h-12"
      mode="multiple"
      value={selectedValue}
      placeholder="Select Style"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
