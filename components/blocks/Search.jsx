"use client";
import { useState, useEffect } from "react";
import searchIcon from "/public/search.svg";
import Image from "next/image";
import { store } from "@/stores/store";
// import { PageModal } from "./Modal/PageModal";

export default function Search() {
  const [typing, setTyping] = useState(false);
  const { fetchAllPages, pages, fetchPages, fetchSearchedPages, setSearch, searchInput } = store();
  // const { fetchAllPages, pages, fetchPages, fetchSearchedPages, setSearch, searchInput, showSearch } = store();

  useEffect(() => {
    fetchAllPages();
  }, [fetchAllPages]);

  useEffect(() => {


    // Proceed with search logic
    const wordsArray = searchInput.split(/\s+/);
    const sortPagesByTagOrSearch = () => {
      if (!searchInput) {
        return pages.data;
      }

      return pages.data.filter((page) =>
        wordsArray.some(
          (word) =>
            page.brandName.toLowerCase().includes(word) ||
            page.brandDescription.toLowerCase().includes(word)
        ) || page.componentType.some((type) => type.toLowerCase().includes(searchInput.toLowerCase()))
      );
    };

    // fetchSearchedPages(sortPagesByTagOrSearch());
    fetchPages(sortPagesByTagOrSearch());
  }, [searchInput,  pages.data]);

  // Handle focus/typing state
  const handleFocus = () => {
    setTyping(true);
  };

  const handleBlur = () => {
    setTyping(false);
  };

  return (
    <>
      <div
        className={`flex gap-2 p-2 bg-white w-[80%] h-9 laptop:w-full desktop:w-[313px] rounded-lg max-w-[313px] border ${
          typing
            ? "border-blue-400 shadow-buttonFocus bg-white hover:bg-white"
            : "border-grey-50 hover:bg-grey-10 hover:border-grey-50"
        }`}
        onMouseLeave={handleBlur} 
      >
        <Image src={searchIcon} alt="search icon" width="24px" height="24px" />
        <input
          type="text"
          placeholder="Search for a page deck"
          value={searchInput} 
          onFocus={handleFocus} 
          onBlur={handleBlur} 
          onChange={(e) => setSearch(e.target.value)} 
          className="outline-none w-full bg-transparent text-grey-900"
        />
      </div>

      {/* Show modal when search is not empty */}
      {/* {showSearch && <PageModal />} */}
    </>
  );
}
