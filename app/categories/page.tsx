
// import ProtectedRoute from "@/components/ProtectedRoute";

import Cards from "@/components/Category/Cards";

export default function Sponsorship() {

  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-10 desktop:gap-24">
    
        <p className='text-grey-800 text-40 font-bold mb-5'>Categories</p>
        <Cards />
        </div>
      </div>
    </div>
  );
}
