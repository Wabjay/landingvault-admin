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
export function SelectPageType({ value, initialValue }: SelectCategoryTypeProps) {
  const { metrics, fetchTypes, token } = store((state) => ({
    metrics: state.metrics,
    fetchTypes: state.fetchTypes,
    token: state.token,
  }));

  useEffect(() => {
    // Fetch types if they are not already in the state
    if (!metrics.types.data.length) {
      fetchTypes(token);
    }
  }, [metrics.types.data, fetchTypes, token]);

  const handleChange = (selected: string[]) => {
    value({
      name: "pageType",
      value: selected,
    });
  };

  // Generate options based on types data
  const options = metrics.types.data.map((tag: Tag) => ({
    value: tag.name,
    label: tag.name,
  }));

  return (
    <Select
      className="h-12"
      mode="multiple"
      defaultValue={Array.isArray(initialValue) ? initialValue : [initialValue]}
      placeholder="Select Page Type"
      onChange={handleChange}
      options={options}
      style={{ width: "100%" }}
      maxTagCount="responsive"
    />
  );
}
