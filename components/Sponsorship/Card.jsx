import React from "react";
import Link from 'next/link'
import SkeletonLoader from "../Skeleton";

const Card = ({ name, email, link }) => {
  return (
    <div className="relative py-6 px-4 bg-[#EFEFEF] border border-[#000000] text-[#000] shadow-metric-card ">
        <Link href={link}
          className="text-[#000] text-sm leading-5 font-medium"
        >
          <SkeletonLoader>
            <p className="mb-2 text-16 font-medium">
              Name: {name}
            </p>
          </SkeletonLoader>
          <SkeletonLoader>
            <p className=" mb-6 text-16 font-medium">Email: {email}</p>{" "}
          </SkeletonLoader>

          <SkeletonLoader>
            <p className="text-16 font-medium">Product Url: {link}</p>{" "}
          </SkeletonLoader>
         
        </Link>
    </div>
  );
};

export default Card;
// border-radius: 20px 20px 0px 0px;
