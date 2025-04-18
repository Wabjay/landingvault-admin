"use client";
'esversion 6';
import { store } from "@/stores/store";
import Card from "./Card";
import { createSlug } from "../blocks/slug";

const Cards = () => {
  const { metrics } = store();

  console.log(metrics)
  const cardItems = [
    // { name: "No of Users", value: metrics.users.length, link: "users" },
    { name: "Component", value: metrics.components.data.length, link: "components" },
    { name: "Type", value: metrics.types.data.length, link: "types" },
    { name: "Industry", value: metrics.industries.data.length, link: "industries" },
    { name: "Stack", value: metrics.stacks.data.length, link: "stacks" },
    { name: "Style", value: metrics.styles.data.length, link: "styles" },
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
