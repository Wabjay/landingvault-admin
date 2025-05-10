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

export function SelectIndustry({ initialValue = [], onChange }: SelectCategoryTypeProps) {
  const { metrics, fetchIndustries } = store((state) => ({
    metrics: state.metrics,
    fetchIndustries: state.fetchIndustries,
  }));

  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  useEffect(() => {
    if (!metrics.industries.data.length) {
      fetchIndustries();
    }
  }, [metrics.industries.data, fetchIndustries]);

   useEffect(() => {
  if (initialValue?.length && metrics.industries.data.length) {
    const ids = initialValue.map((val) => val.id);
    setSelectedValue(ids);
  }
}, [initialValue, metrics.industries.data]);

  const handleChange = (ids: string[]) => {
    setSelectedValue(ids);
    onChange({
      name: "industry",
      value: ids.map((id) => ({ id })),
    });
  };

  const options = metrics.industries.data.map((tag: Tag) => ({
    value: tag.id,
    label: tag.title,
  }));

  return (
    <Select
      className="h-12"
      mode="multiple"
      value={selectedValue}
      placeholder="Select Industry"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
      loading={!metrics.industries.data.length}
    />
  );
}
