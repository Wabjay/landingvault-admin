"use client";
'esversion 6';
import { store } from "@/stores/store";
import Card from "./Card";
import { createSlug } from "../blocks/slug";
import { useEffect } from "react";
import { useInitFetchCategories } from "@/lib/useInitFetchCategories";

const Cards = () => {
  const { metrics } = store();
  // Fetch all categories
  useInitFetchCategories();

  // console.log(metrics)
  const cardItems = [
    // { name: "No of Users", value: metrics.users.length, link: "users" },
    { name: "Component", value: metrics.components.totalComponent, link: "components" },
    { name: "Type", value: metrics.types.totalTypes, link: "types" },
    { name: "Industry", value: metrics.industries.totalIndustries, link: "industries" },
    { name: "Stack", value: metrics.stacks.totalStacks, link: "stacks" },
    { name: "Style", value: metrics.styles.totalStyles, link: "styles" },
    // { name: "Total Mode Tag", value: metrics.mode.length, link: "mode" },
  ];


  return (
    <div className="tablet:grid tablet:justify-between gap-8 tablet:grid-cols-2 laptop:grid-cols-3">
      {cardItems.map((item, index) => (
        <Card key={index} name={item.name} value={item.value} link={`/categories/${createSlug(item.link)}`} />
      ))}
    </div>
  );
};

export default Cards;
