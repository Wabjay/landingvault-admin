import React from "react";
import moment from "moment";
import Skeleton from "../Skeleton";
import { store } from "@/stores/store";
import Link from "next/link";
import { handleDeletePage } from "@/lib/deleteData";
import { useNavigation } from "@/components/utils/navigations";
import { createSlug } from "../blocks/slug";

const SideSection = ({ page }) => {
  const { token, fetchAllPages } = store();
  const { navigateTo } = useNavigation();

  const onDeletePitch = () => {
    if (!page) return;
    handleDeletePage(page.brandName, page._id, token, () => {
      fetchAllPages();
      navigateTo("/pages");
    });
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
            {/* <span className="col-span-2">{page?.industry?.name}</span> */}
            <span className="col-span-2">{page?.industry?.length ? page.industry.map(item => item.title).join(", ") : "N/A"}</span>
            {/* <span className="col-span-2">{page?.industry?.join(", ") || "N/A"}</span> */}
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Component</span>
            {/* <span className="col-span-3">{page?.componentType?.name}</span> */}
            <span className="col-span-2">{page?.componentType?.length ? page.componentType.map(item => item.title).join(", ") : "N/A"}</span>
            {/* <span className="col-span-3">{page?.componentType?.join(", ") || "N/A"}</span> */}
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Stack</span>
            {/* <span className="col-span-2">{page?.stacks?.name}</span> */}
            <span className="col-span-2">{page?.stack?.length ? page.stack.map(item => item.title).join(", ") : "N/A"}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Type</span>
            {/* <span className="col-span-2">{page?.type?.name}</span> */}
            <span className="col-span-2">{page?.type?.length ? page.type.map(item => item.title).join(", ") : "N/A"}</span>

          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Style</span>
            {/* <span className="col-span-2">{page?.style?.name}</span> */}
            <span className="col-span-2">{page?.style?.length ? page.style.map(item => item.title).join(", ") : "N/A"}
            </span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Mode</span>
            <span className="col-span-2">{page?.mode || "N/A"}</span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2">Date</span>
            <span className="col-span-2">
              {page?.createdAt ? moment(page?.createdAt).format("LL") : "N/A"}
            </span>
          </Skeleton>
          <Skeleton>
            <span className="col-span-2 text-grey-600">Color Palette</span>
            <span className="col-span-3 ml-6 text-grey-800">
              {page?.colorPalette?.map((color, index) => (
                <span
                  key={`${color}-${index}`}
                  className="relative group ml-[-18px] w-6 h-6 rounded-full inline-block mr-2"
                  style={{ backgroundColor: `${color}` }}
                >
                  {/* Tooltip */}
                  <span
                    style={{ backgroundColor: `${color}` }}
                    className="uppercase absolute left-1/2 transform -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {color}
                  </span>
                </span>
              )) || "N/A"}
            </span>
          </Skeleton>
          {/* <Skeleton>
            <span className="col-span-2">Website Link</span>
            <span className="col-span-2">
              {page?.websiteUrl ? (
                <a href={page.websiteUrl} target="_blank" rel="noopener noreferrer">
                  {page.websiteUrl}
                </a>
              ) : (
                "N/A"
              )}
            </span>
          </Skeleton> */}
        </p>
      </div>

      <div className="flex gap-3 mt-10">
        <Skeleton>
          <Link
            href={{
              pathname: `/pages/edit/${page?.componentType[0]?.title}/${page?.brandName}`,
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
