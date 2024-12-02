"use client"
import { Key, useEffect, useState } from "react";
import PageCard from "@/components/Pages/PageCard";
import EmptyPitch from "@/components/Pitchdeck/EmptyPitch";
import { store } from "@/stores/store";
import Link from "next/link";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";



const Pages = () => {
  const [array, setArray] = useState<Page[]>([]);

  const {componentLoading, fetchAllPages, pages:pagesData} = store()
  
  
  
    useEffect(() => {
      fetchAllPages()
    }, [fetchAllPages]);
  
  
    

  useEffect(() => {
    const shuffleArray = async () => {
      if (pagesData.data) {
      const shuffledArray = [...pagesData.data];
      // for (let i = shuffledArray.length - 1; i > 0; i--) {
      //   const j = Math.floor(Math.random() * (i + 1));
      //   [shuffledArray[i], shuffledArray[j]] = [
      //     shuffledArray[j],
      //     shuffledArray[i],
      //   ];
      // }
      setArray(shuffledArray)
    }
  }
    shuffleArray();
    console.log(pagesData)
  }, [pagesData]);

  
  

  return (
    <div className="w-full">
    <div className="bg-[#FFF]">
      <div className="w-full  p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-7 tablet:gap-10 laptop:gap-14 desktop:gap-24">
       <LoadingOverlay />
        <div>
          <div className="flex justify-between">

          <p className='text-grey-800 text-40 font-bold mb-5 capitalize'>Pages</p>
          <Link href={`/pages/add`}
        className="text-white border border-green-600 bg-green-600 w-[175px] h-10 flex items-center justify-center text-14 font-medium hover:bg-opacity-90 "
      >Create pages 
      </Link>  
                      </div>
                      {(pagesData.data?.length === 0 || pagesData.status === 404) ? (
    <EmptyPitch />
  ) : (
        <div className="w-fit grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 gap-y-10 mt-10">
      {array.map((item: Page, index: Key | null | undefined) => (
          <PageCard key={index} page={item} />
        ))}
        </div>)}
         
        </div>
      </div>
    </div>
  </div>
    

  );
};

export default Pages;
