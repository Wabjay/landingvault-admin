/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Arrow from "@/assets/arrowUp.svg"
import { createSlug } from '@/components/blocks/slug';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Skeleton from '@/components/blocks/Skeleton';
import LoadImage from '@/components/blocks/LoadImage';
import Link from "next/link";
import { store } from '@/stores/store';
import Image from "next/image";



const TemplateCard = ({ template }) => {

  const {token} = store



  const onDeleteTemplate = (template) => {
    handleDeletePitch(template.name, template._id, token, navigateTo);
};
  return (
    <Link href={{
      pathname: `/template/${createSlug(template.name)}`,
      state: { id: template._id }
    }}>
      <div className={`flex flex-col h-full border border-[#D2D2CF] hover:border-[#21AB68] hover:border-[2px]`}>
       <LoadImage
           alt="Template deck"
           effect="blur"
           src={template?.templateCoverImageUrl}
          height={240}
          style={`w-full h-full max-h-[240px]`}
        />

        <div className='p-3 laptop:p-[14px] desktop:p-4 bg-white'>
          <div className='flex justify-between mb-1'>
            <Skeleton > <h5 className='text-16 font-medium text-[#2E2E27] P-3 text-20 tablet:font-bold'>{template.name}</h5> </Skeleton>
            <Skeleton height={24} width={24}> <Image src={Arrow} alt="Arrow Up" width="24px" height='24px' className='hover:border-[#F2F1E8] hover:border hover:bg-[#F2F1E8]' /></Skeleton>
          </div>
         


          <p className='text-12 font-normal text-[#2E2E27] P-3 flex'>
            <Skeleton> {template?.numberOfPages} pages </Skeleton>
            <Skeleton height={0}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7.5" cy="8.97321" r="1.5" fill="#2E2E27" />
              </svg>{template.cost.naira} 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7.5" cy="8.97321" r="1.5" fill="#2E2E27" /></svg> {template.cost.dollar}
            </Skeleton>
          </p>

        </div>
        <div className='flex w-fit items-center gap-8 p-2 mx-auto'>
        <Link href={{
      pathname: `/template/${createSlug(template.name)}`,
      state: { id: template._id }
    }}>
          <button className="border border-[#A9EFCD] bg-[#A9EFCD] py-1 px-3 rounded-lg text-sm text-[#2E2E2F] font-bold hover:bg-slate-300">View</button>
        </Link>
        <button onClick={()=>onDeleteTemplate(template)} className="border border-[#FF6464] bg-[#FF6464] py-1 px-3 rounded-lg text-sm text-white font-medium hover:bg-slate-300">Delete</button>
      </div>
      </div>
    </Link>

  )
}

export default TemplateCard