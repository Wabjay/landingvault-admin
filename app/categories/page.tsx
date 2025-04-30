// import ProtectedRoute from "@/components/ProtectedRoute";

import Cards from "@/components/Category/Cards";
import Link from "next/link";

export default function Sponsorship() {
  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-10 desktop:gap-24">
          <div className="flex justify-between">
            <p className="text-grey-800 text-40 font-bold mb-5">Categories</p>
            <Link
              href={`categories/add`}
              className="text-white border border-green-600 bg-green-600 w-[175px] h-10 flex items-center justify-center text-14 font-medium hover:bg-opacity-90"
            >
              Create category
            </Link>
          </div>
          <Cards />
        </div>
      </div>
    </div>
  );
}
