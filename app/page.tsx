"use client";
import Cards from "@/components/Dashboard/Cards";
import { store } from "@/stores/store";
import { useEffect } from "react";

export default function Home() {
  const {fetchComponents,fetchIndustries, fetchStacks,fetchTypes, fetchStyles, fetchUsers, token} = store()

  useEffect(()=>{
fetchUsers(token)
fetchComponents(token)
fetchTypes(token)
fetchStacks(token)
fetchStyles(token)
fetchIndustries(token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])
  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[1050px] p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-10 desktop:gap-24">
    
        <p className='text-grey-800 text-40 font-bold leading-[56px] tracking-[-0.96px] mb-5'>Our Metrics</p>
        <Cards />
        </div>
      </div>
    </div>
  );
}
