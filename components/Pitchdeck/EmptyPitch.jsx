import Image from "next/image";
import Empty from "@/assets/empty.svg";

// Define the EmptyPitch component
const EmptyPitch = () => {
  return (
    <div className="col-start-1 col-end-4 w-fit mx-auto laptop:mt-8 flex flex-col items-center justify-center gap-4 h-full">
      <Image
        src={Empty}
        alt="Empty Search"
        width="136px"
        height="136px"
        className="hover:border-[#F2F1E8] hover:border hover:bg-[#F2F1E8]"
      />
      <div className="w-full max-w-[343px] laptop:max-w-[718px] text-center">
        <h5 className="text-24 text-[#000] font-bold tablet:text-32 laptop:text-[48px] laptop:leading-[56px] laptop:tracking-[-2px]">
          No result found
        </h5>
        <p className="text-[16px] leading-[24px] laptop:text-20 tracking-[0] font-normal text-[#64645F]">
          Oops! It seems like there are no search results matching your query. Please try again with different keywords or refine your search criteria to find what you’re looking for.
        </p>
      </div>
    </div>
  );
};

export default EmptyPitch;
