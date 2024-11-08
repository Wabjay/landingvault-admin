import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Arrow from "@/assets/back.svg";
// import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useNavigation } from '../utils/navigations';


function BackButton({color='green-600'}: {color:string}) {
    // const router = 
    const { goBack } = useNavigation()
    // const appRouterInstance: AppRouterInstance = useRouter();


  return (
    <div className="w-full mx-auto laptop:px-0 laptop:bg-transparent desktop:px-0">
    <button
      className={`flex gap-2 py-2 h-10 px-4 mb-6 bg-${color} border border-green-600}`}
      onClick={goBack} type="button">
      <Image src={Arrow} alt="" className="" />
      <span className={`text-${color === 'green-600' ? 'white' : 'green-600'}`}>Back</span>
    </button>
  </div>
  )
}

export default BackButton