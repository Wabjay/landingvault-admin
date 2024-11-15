import React from "react";
import moment from "moment";
import Skeleton from "../Skeleton";
import { store } from "@/stores/store";
import Link from "next/link";
import { handleDeletePitch } from "@/lib/deleteData";
import { useNavigation } from "@/components/utils/navigations";
import { createSlug } from "../blocks/slug";

const SideSection = ({ page }) => {
  const { token } = store();
  const { navigateTo } = useNavigation(); 

  console.log(page)
  // Delete pitch handler
  const onDeletePitch = () => {
    handleDeletePitch(page.brandName, page._id, token, navigateTo('pages'));
  };

  // Conditional rendering for page data
  if (!page) return <Skeleton>Loading...</Skeleton>;

  return (
    <div className="laptop:sticky laptop:top-[80px] py-6 laptop:p-6 text-[#2E2E27] bg-white laptop:h-fit laptop:mt-[-34px] w-full laptop:basis-big pb-4 laptop:pb-[100px]">
      <h1 className="text-24 font-bold mb-2">
        <Skeleton>{page?.brandName}</Skeleton>
      </h1>
      <p className="text-[16px] leading-6 mb-6">
        <Skeleton>{page?.brandDescription}</Skeleton>
      </p>

      <div className="flex flex-col gap-4 p-3 bg-[#F2F1E8] border border-[#CCC8A4] mb-10">
        <p className="w-full grid grid-cols-5 text-14 gap-y-4 leading-6 font-semibold">
          <Skeleton>
            <span className="col-span-2">Industry</span>
            <span className="col-span-2">{page?.industry.map(item => item +  ', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Component Type</span>
            <span className="col-span-3">{page?.componentType.map(item => item +  ', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Stack</span>
           <span className="col-span-2"> {page?.stacks.map(item =>item +  ', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Type</span>
            <span className="col-span-2">{page?.type.map(item => item +  ', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Style</span>
            <span className="col-span-2">{page?.style.map(item => item +  ', ')}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Mode</span>
            <span className="col-span-2">{page?.mode}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Date</span>
            <span className="col-span-2">{moment(page?.date).format("LL")}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Colour Palette</span>
            <span className="col-span-2">{page?.colorPalette.map(item => <p key={item} className={`w-6 h-6 rounded-full bg-${item} ml-[-12px]`}>{item}</p>)}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Website Link</span>
            <span className="col-span-2">
              <a href={page?.websiteUrl} target="_blank" rel="noopener noreferrer">
                {page?.websiteUrl}
              </a>
            </span>
          </Skeleton>
        </p>
      </div>

      <div className="flex gap-3 mt-10">
        <Skeleton>
          <Link
            href={{
              pathname: `/pages/edit/${createSlug(page?.brandName)}`
              // query: { id: page?._id },
            }}
            passHref
            className="bg-[#21AB68] border-[#21AB68] shadow-navbarLink inline-flex items-center justify-center p-2 text-[#ffffff] text-sm leading-5 font-normal focus:outline-none"
          >
            Edit
          </Link>
        </Skeleton>
        <Skeleton>
          <button
            onClick={onDeletePitch}
            className="bg-[#FF6464] border-[#FF6464] shadow-navbarLink inline-flex items-center justify-center p-2 text-[#ffffff] text-sm leading-5 font-normal focus:outline-none"
          >
            Delete
          </button>
        </Skeleton>
      </div>
    </div>
  );
};

export default SideSection;
