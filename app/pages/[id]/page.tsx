"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import SideSection from "@/components/Pitchdeck/SideSection";
import LoadImage from "@/components/blocks/LoadImage";
import { store } from "@/stores/store";
import BackButton from "@/components/blocks/BackButton";

const SinglePitch = () => {
  const pathname = usePathname();
  const { fetchSinglePage, page: pageData } = store();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    const pageName = pathname.split("/")[2]?.toLowerCase(); 
    console.log(pageName)// Ensure page name is in lowercase for matching
    if (pageName) {
      fetchSinglePage(pageName);  // Fetch the page data based on the page name
    }
  }, [fetchSinglePage, pathname]);

  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[1152px] desktop:max-w-full mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14 desktop:gap-24">
          <div className="bg-[#F2F1E8]">
            <div className="w-full laptop:max-w-[1440px] mx-auto px-4 tablet:px-6 laptop:px-0 desktop:px-0 bg-white">
              <BackButton color={""} />
              <div className="laptop:grid laptop:grid-cols-auto laptop:gap-6 desktop:gap-8 laptop:justify-end">
                <SideSection page={pageData?.data[0]} />
                <div className="bg-[#F2F1E8] order-first w-full">
                  <div className="mx-auto px-4 tablet:px-6 laptop:px-8 desktop:px-0">
                    <div className="flex flex-col gap-8 laptop:w-fit">
                      <LoadImage
                        alt={pageData?.data[0].brandName || "Page Image"}
                        src={pageData?.data[0].pageImage || "/path/to/placeholder.jpg"}
                        style="w-full h-full laptop:w-[640px] desktop:w-[757px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePitch;
