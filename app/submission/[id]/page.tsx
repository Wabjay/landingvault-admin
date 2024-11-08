"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import BackButton from "@/components/blocks/BackButton";


const SinglePitch = () => {
  const pathname = usePathname();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
const [pageName, setPageName] = useState("")
  useEffect(() => {
    const pageName = pathname.split("/")[2];
    setPageName(pageName);
   
  }, [pathname]);

const data = {
  date: "24 March, 2024",
  email: "Teslimajani1@gmail.com",
  url: "Hotside1233.com",
  name: "Hotsite"
}
  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[700px] mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-7 tablet:gap-10 laptop:gap-14 desktop:gap-24">
          <div>
            <div className="mb-10 flex justify-between">

            <BackButton color={'white'}/>
</div>
<div className="flex flex-col gap-6 text-16 font-medium">
<div>
        <p className="mb-2">Date</p>
        <p className="w-full border p-4">{data.date}</p>
       </div>
       <div>
        <p className="mb-2">Email Address</p>
        <p className="w-full border p-4">{data.email}</p>
       </div>
       <div>
        <p className="mb-2">Website Name</p>
        <p className="w-full border p-4">{data.name}</p>
       </div>
       <div>
        <p className="mb-2">Website URL</p>
        <p className="w-full border p-4">{data.url}</p>
       </div>
</div>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePitch;
