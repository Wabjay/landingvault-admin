"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import SideSection from "@/components/Pitchdeck/SideSection";
import LoadImage from "@/components/blocks/LoadImage";
import { store } from "@/stores/store";
import BackButton from "@/components/blocks/BackButton";
import { LoadingOverlay } from "@/components/blocks/LoadingOverlay";
import Skeleton from "@/components/Skeleton";

const SinglePage = () => {
  const pathname = usePathname();
  const { fetchSinglePage, page: pageData } = store();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const component = pathname?.split("/")[2];
        const title = pathname?.split("/")[3];
        console.log(component, title);
        if (component && title) {
          await fetchSinglePage(component, title);
        }
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, [pathname, fetchSinglePage]);

  if (!pathname) {
    return <Skeleton width="100%" height="100vh">Loading path...</Skeleton>;
  }

  return (
    <div className="w-full">
      <div className="bg-[#FFF] relative">
        {isLoading && <LoadingOverlay />}
        <div className="w-full max-w-[1152px] mx-auto p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-14 desktop:gap-24">
          <div className="bg-[#F2F1E8]">
            <div className="w-full max-w-[1440px] mx-auto px-4 tablet:px-6 laptop:px-0 desktop:px-0 bg-white">
              <BackButton to="/pages" color="" />
              <div className="grid grid-cols-1 laptop:grid-cols-[auto_1fr] laptop:gap-6 desktop:gap-8 laptop:justify-end">
                <div className="bg-[#F2F1E8] order-2 laptop:order-1 w-full">
                  <div className="mx-auto px-4 tablet:px-6 laptop:px-8 desktop:px-0">
                    <div className="flex flex-col gap-8 w-full laptop:w-fit">
                      {pageData?.pageImage ? (
                        <LoadImage
                          alt={pageData.brandName || "Page Image"}
                          src={pageData.pageImage}
                          style="w-full h-full laptop:w-[640px] desktop:w-[757px]"
                        />
                      ) : (
                        <Skeleton width="100%" height="400px">
                          Loading image...
                        </Skeleton>
                      )}
                    </div>
                  </div>
                </div>
                {pageData ? (
                  <SideSection page={pageData} />
                ) : (
                  <Skeleton width="300px" height="600px">
                    Loading sidebar...
                  </Skeleton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;