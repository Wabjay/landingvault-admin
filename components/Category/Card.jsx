import React from "react";
import Link from 'next/link'
import SkeletonLoader from "../Skeleton";

const Card = ({ name, value, link }) => {
  return (
    <div className="relative p-6 bg-[#EFEFEF] border border-[#000000] text-[#000] shadow-metric-card ">
            <SkeletonLoader>
            <p className="text-16 font-medium">
            {name}</p>
          </SkeletonLoader>
          <SkeletonLoader>
              <p className="text-16 font-medium">{value}</p>
          </SkeletonLoader>
          <Link href={link}
          className="mt-6 text-white bg-green-600 w-[113px] h-10 flex items-center justify-center text-14 font-medium hover:bg-opacity-90 "
        >view
        </Link>
    </div>
  );
};

export default Card;
// border-radius: 20px 20px 0px 0px;
