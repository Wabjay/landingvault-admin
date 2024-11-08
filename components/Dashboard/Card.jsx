import React from "react";
import Link from 'next/link'
import SkeletonLoader from "../Skeleton";

const Card = ({ name, value, link }) => {
  return (
    <div className="relative p-6 bg-white border border-[#21AB68] text-[#2D2D2D] shadow-metric-card ">
        <Link href={link}
          className="text-[#0A0A0A] text-sm leading-5 font-medium"
        >
          <SkeletonLoader>
            <p className="text-[38px] font-bold leading-[130%] tracking-[-0.76px]">
              {value}
            </p>
          </SkeletonLoader>
          <SkeletonLoader>
            <p className="text-16 tracking-[130%] w-[80%]">{name}</p>{" "}
          </SkeletonLoader>
          <SkeletonLoader>
            <div className="absolute w-full h-full flex items-center justify-end pr-4 left-0 top-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
              >
                <path
                  d="M0.938696 0.454072C0.657489 0.735364 0.499516 1.11683 0.499516 1.51457C0.499516 1.91232 0.657489 2.29378 0.938696 2.57507L8.3637 10.0001L0.938696 17.4251C0.665459 17.708 0.514267 18.0869 0.517685 18.4802C0.521102 18.8735 0.678856 19.2497 0.956967 19.5278C1.23508 19.8059 1.6113 19.9637 2.00459 19.9671C2.39789 19.9705 2.77679 19.8193 3.0597 19.5461L11.5452 11.0606C11.8264 10.7793 11.9844 10.3978 11.9844 10.0001C11.9844 9.60233 11.8264 9.22086 11.5452 8.93957L3.0597 0.454072C2.7784 0.172866 2.39694 0.0148926 1.9992 0.0148926C1.60145 0.0148926 1.21999 0.172866 0.938696 0.454072Z"
                  fill="#C7C7CA"
                />
              </svg>
            </div>{" "}
          </SkeletonLoader>
        </Link>
    </div>
  );
};

export default Card;
// border-radius: 20px 20px 0px 0px;
