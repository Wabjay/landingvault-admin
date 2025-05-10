"use client";
'esversion 6';
import { store } from "@/stores/store";
import Card from "./Card";
import { useEffect } from "react";
// import { emailUsers, googleUsers, totalPitches, totalTemplates, totalUsers } from '../../lib/data'
// import { store } from "../../store";

const Cards = () => {
  const { data, fetchData, token } = store();

  useEffect(()=>{

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const cardItems = [
    { name: "No of Users", email: "Teslimajani1@gmail.com", url: "www.component.com" },
    { name: "Active users", email: "Teslimajani1@gmail.com", url: "www.type.com" },
    { name: "No of Tag", email: "Teslimajani1@gmail.com", url: "www.industry.com" },
    { name: "Total Style Tag", email: "Teslimajani1@gmail.com", url: "www.stack.com" },
    { name: "Total Industry Tag", email: "Teslimajani1@gmail.com", url: "www.style.com" },
    { name: "Total component Tag", email: "Teslimajani1@gmail.com", url: "www.mode.com" },
    { name: "Total mode Tag", email: "Teslimajani1@gmail.com", url: "www.mode.com" },
    { name: "Total stack Tag", email: "Teslimajani1@gmail.com", url: "www.mode.com" },
  ];

  return (
    <div className="tablet:grid tablet:justify-between gap-8 tablet:grid-cols-2 laptop:grid-cols-3">

{cardItems.map((item, index) => (
        <Card key={index} name={item.name} email={item.email} link={`${item.url}`} />
      ))}
     
    </div>
  );
};

export default Cards;
