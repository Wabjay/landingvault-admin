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


export function SelectType({ initialValue = [], onChange }: SelectCategoryTypeProps) {
  const { metrics, fetchTypes } = store((state) => ({
    metrics: state.metrics,
    fetchTypes: state.fetchTypes,
  }));
  
  const [selectedValue, setSelectedValue] = useState<string[]>([]); // Controlled state for value

  useEffect(() => {
    if (!metrics.types.data.length) {
      fetchTypes();
    }
  }, [metrics.types.data, fetchTypes]);


   // Set selected values when data and value are both available
    useEffect(() => {
      if (initialValue?.length && metrics.types.data.length) {
        const ids = initialValue.map((val) => val.id);
        setSelectedValue(ids);
      }
    }, [initialValue, metrics.types.data]);
  

  const handleChange = (selected: string[]) => {
    setSelectedValue(selected); // Update local state
    onChange({
      name: "type",
      value: selected.map((id) => ({ id })),
    });
  };

  // Generate options based on types data
  const options = metrics.types.data.map((tag: Tag) => ({
    value: tag.id,
    label: tag.title,
  }));


  
  return (
    <Select
      className="h-12"
      mode="multiple"
      value={selectedValue} 
      placeholder="Select Type"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
