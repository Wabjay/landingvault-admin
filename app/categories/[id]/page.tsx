"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import SideSection from "@/components/Pitchdeck/SideSection";
import LoadImage from "@/components/blocks/LoadImage";
import { store } from "@/stores/store";
import BackButton from "@/components/blocks/BackButton";
import InfoCard from "@/components/Category/InfoCard";
import Link from "next/link";

const Categories = () => {
  const pathname = usePathname();
  const { metrics } = store();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
const [pageName, setPageName] = useState("")
const [pageData, setPageData] = useState([])
  useEffect(() => {
    const currentPage = pathname.split("/")[2];
    setPageName(currentPage);

        // Access data dynamically from `metrics`
        const fetchedData = metrics?.[currentPage]?.data || [];
        setPageData(fetchedData);
  }, [pathname]);


  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[1152px] desktop:max-w-full mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-7 tablet:gap-10 laptop:gap-14 desktop:gap-24">
          <div>
            <div className="flex justify-between">

            <BackButton color={'white'}/>
            <Link href={`add`}
          className="text-white border border-green-600 bg-green-600 w-[175px] h-10 flex items-center justify-center text-14 font-medium hover:bg-opacity-90 "
        >Create tags 
        </Link>  
                        </div>

        <p className='text-grey-800 text-40 font-bold mb-5 capitalize'>{pageName} Category tags</p>
            <div className="tablet:grid tablet:justify-between gap-8 tablet:grid-cols-2 laptop:grid-cols-3">
              {pageData.map((item, index) => (
                <InfoCard
                  key={index}
                  info={item}
                  pageName={pageName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
