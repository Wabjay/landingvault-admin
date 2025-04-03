"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import Link from "next/link";
import { createSlug, removeSlug } from "./slug";
import { store } from "@/stores/store";

interface Tag {
  id: string;
  name: string;
  title: string;
}

export default function Tags() {
  const [activeTag, setActiveTag] = useState<string>("Landing page");
  const [tags, setTags] = useState<Tag[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tagsContainerRef = useRef<HTMLUListElement | null>(null);

  const {metrics, pages, fetchPages } = store();

  const sortTag = (tag: string) => {
    setActiveTag(tag);
    console.log(tag)
    const tags = tag
    .toLowerCase()
    .replace("page", "")
    .trim();
    fetchPages({ component: tag, page: "" });


  }
    
    // useEffect(()=>{
    //   const filteredPages = pages?.data?.filter(page => page?.componentType[0] === activeTag);
    //   fetchPages(filteredPages)
    // },[activeTag, pages])

const components = metrics.components.data
  useEffect(() => {
    if (components?.length) {
      const newTags = [...components];
    
      // Sort the tags so "Landing Page" comes first, and the others follow
      newTags.sort((a, b) => {
        if (a.name === "Landing page") return -1;  // Move "Landing Page" to the front
        if (b.name === "Landing page") return 1;   // Keep "Landing Page" at the front
        return 0; // Keep other tags in the same order
      });
    
      setTags(newTags);
    } else {
      setTags([]);
    }
  }, [components]);
  
  const cleanSlugA = removeSlug(activeTag.replace('/', ''));

  const updateArrowsVisibility = () => {
    const container = tagsContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0); // Show left arrow if not at the start
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth); // Show right arrow if not at the end
    }
  };

  const scrollTags = (direction: "left" | "right") => {
    const container = tagsContainerRef.current;
    const scrollAmount = 200;

    if (container) {
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };


  useEffect(() => {
    const container = tagsContainerRef.current;
    if (container) {
      // Initial check
      updateArrowsVisibility();

      // Add scroll listener
      container.addEventListener("scroll", updateArrowsVisibility);

      return () => {
        container.removeEventListener("scroll", updateArrowsVisibility);
      };
    }
  }, [tags]);

  return (
    <div className="relative flex items-center mb-6">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          className="absolute left-0 z-10 p-2 bg-grey-10 border-grey-10 border rounded-full hover:bg-grey-200"
          onClick={() => scrollTags("left")}
        >
          <Image src="/navArrow.svg" alt="Left Arrow" width={20} height={20} />
        </button>
      )}
      {/* Tags Container */}
      {components?.length > 1 &&
      <ul
        ref={tagsContainerRef}
        className="flex overflow-x-auto gap-3 py-2 scrollbar-hide w-full max-w-full no-scrollbar"
      >
        {
        tags.map((tag) => (
          <li key={tag.id}
        
            
            onClick={() => sortTag(tag.name)}
            className={`whitespace-nowrap cursor-pointer text-14 font-medium rounded-full px-3 py-2 border capitalize transition-all ${
              tag.name.toLowerCase().includes(cleanSlugA.toLowerCase())
                ? "border-blue-500 text-blue-500 bg-blue-100"
                : "border-grey-50 text-grey-800 bg-white hover:border-grey-50 hover:text-grey-600 hover:bg-grey-10"
            }`}
          >
            {tag.name}
          
          </li>
        ))}
      </ul> 
}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          className="absolute right-0 z-10 p-2 bg-grey-10 border-grey-10 border rounded-full hover:bg-grey-200"
          onClick={() => scrollTags("right")}
        >
          <Image
            src="/navArrow.svg"
            alt="Right Arrow"
            width={20}
            height={20}
            className="rotate-180"
          />
        </button>
      )}
    </div>
  );
}
