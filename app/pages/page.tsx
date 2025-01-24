"use client"
import { Key, useEffect, useState } from "react";
import PageCard from "@/components/Pages/PageCard";
import EmptyPitch from "@/components/Pitchdeck/EmptyPitch";
import { store } from "@/stores/store";
import Link from "next/link";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";
import Tags from "@/components/blocks/Tags";
import Search from "@/components/blocks/Search";



const Pages = () => {

  const {sortedPages:pagesData} = store()


  return (
    <div className="w-full">
    <div className="bg-[#FFF]">
      <div className="relative w-full max-w-[1100px] p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-7 tablet:gap-10 laptop:gap-14 desktop:gap-24">
       <LoadingOverlay />
        <div> 
           <Link href={`/pages/add`} className="sticky overflow-hidden top-16 ml-auto mr-0 z-20 text-white border border-green-600 bg-green-600 w-[175px] h-10 flex items-center justify-center text-14 font-medium hover:bg-opacity-90 "
      >Create pages 
      </Link>  
          <div className="flex justify-between">

          <p className='text-grey-800 text-40 font-bold mb-5 capitalize'>Pages</p>
          <Search />
        
                      </div>
                      <div className="w-fit max-w-[1100px] ml-0 overflow-hidden no-scrollbar px-4 tablet:px-6 laptop:px-8 desktop:px-0">
                      <Tags />
                      </div>
                      {(pagesData?.length === 0 ) ? (
    <EmptyPitch />
  ) : (
    <div>

        <div className="w-fit grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 gap-y-10 mt-10">
      {pagesData && pagesData.map((item: Page, index: Key | null | undefined) => (
          <PageCard key={index} page={item} />
        ))}
        </div>
    </div>
        )}
         
        </div>
      </div>
    </div>
  </div>
    

  );
};

export default Pages;
