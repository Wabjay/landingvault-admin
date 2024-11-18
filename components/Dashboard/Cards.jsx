"use client";
'esversion 6';
import { store } from "@/stores/store";
import Card from "./Card";
import { useEffect, useState } from "react";
import { createSlug } from "../blocks/slug";

const Cards = () => {
  const { metrics: getMetrics } = store();
  const [ metrics, setMetrics ]= useState();


  useEffect(()=>{
setMetrics(getMetrics)
console.log(getMetrics)
  },[getMetrics])


  const cardItems = [
    { name: "No of Users", value: metrics?.users?.length, link: "users" },
    { name: "Total Components Tag", value: metrics?.components.data.length, link: "components" },
    { name: "Total Type Tag", value: metrics?.types.data.length, link: "types" },
    { name: "Total Industry Tag", value: metrics?.industries.data.length, link: "industries" },
    { name: "Total Stack Tag", value: metrics?.stacks.data.length, link: "stacks" },
    { name: "Total Style Tag", value: metrics?.styles.data.length, link: "styles" },
    // { name: "Total Mode Tag", value: metrics.mode.length, link: "mode" },
  ];

  return (
    <div className="tablet:grid tablet:justify-between gap-8 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">

{cardItems.map((item, index) => (
        <Card key={index} name={item.name} value={item.value} link={`/categories/${createSlug(item.link)}`} />
      ))}
     
    </div>
  );
};

export default Cards;
