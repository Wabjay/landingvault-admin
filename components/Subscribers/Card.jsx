import React from "react";
import Link from 'next/link'
import SkeletonLoader from "../Skeleton";

const Card = ({ name, value }) => {
  return (
    <div className="relative p-6 w-[240px] bg-white border border-[#21AB68] text-[#2D2D2D] shadow-metric-card ">
          <SkeletonLoader>
            <p className="text-[38px] font-bold leading-[130%] tracking-[-0.76px]">
              {value}
            </p>
          </SkeletonLoader>
          <SkeletonLoader>
            <p className="text-16 tracking-[130%] w-[80%]">{name}</p>{" "}
          </SkeletonLoader>
    </div>
  );
};

export default Card;
// border-radius: 20px 20px 0px 0px;
