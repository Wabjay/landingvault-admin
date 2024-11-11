import React from "react";
import Link from 'next/link';
import SkeletonLoader from "../Skeleton";
import { createSlug } from "../blocks/slug";

const InfoCard = ({ info, pageName }) => {

  console.log(info.id);
  const slug = createSlug(info.id);  // Create the slug once, to reuse in both links

  return (
    <div className="relative flex flex-col justify-between p-6 bg-white border border-[#21AB68] text-[#2D2D2D] shadow-metric-card">
      <div className="relative flex flex-col gap-3" >
      <SkeletonLoader>
        <p className="text-16 font-medium">
          Tag name: {info.name}</p>
      </SkeletonLoader>
      <SkeletonLoader>
        <p className="text-16 font-medium">Title: {info.title}</p>
      </SkeletonLoader>
      <SkeletonLoader height={100}>
        <p className="text-16 font-medium">Description: {info.description}</p>
      </SkeletonLoader>
      </div>
      <div className="flex flex-col gap-6 tablet:flex-row justify-between">
        <Link href={{
          pathname: `category/${info.id}`,
          query: { ref: pageName === "stacks" ? "stack" : pageName, edit : false }, // Example query parameters
        }}
         className="mt-6 text-white bg-green-600 w-[113px] h-10 flex items-center justify-center text-14 font-medium hover:bg-opacity-90">
          View
        </Link>
        <Link href={{
          pathname: `category/${info.id}`,
          query: { ref: pageName === "stacks" ? "stack" : pageName }, // Example query parameters
        }} className="mt-6 text-white bg-green-600 w-[113px] h-10 flex items-center justify-center text-14 font-medium hover:bg-opacity-90">
          Edit
        </Link>  
      </div>
    </div>
  );
};

export default InfoCard;
