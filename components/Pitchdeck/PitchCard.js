/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import Arrow from "@/assets/arrowUp.svg";
import { createSlug } from '@/components/blocks/slug';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Skeleton from '@/components/blocks/Skeleton';
import LoadImage from '@/components/blocks/LoadImage';
import { store } from '@/stores/store';
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/components/utils/navigations";
import { handleDeletePitch } from "@/lib/deleteData";
const PitchCard = ({ pitch }) => {
  const { token } = store();
  const { navigateTo } = useNavigation();


  const onDeletePitch = (pitch) => {
      handleDeletePitch(pitch.name, pitch._id, token, navigateTo('pages'));
  };

  return (
    <div className={`flex flex-col h-full rounded-lg border overflow-hidden justify-between border-[#D2D2CF] hover:border-[#21AB68]`}>
      <LoadImage
        alt="Pitch deck"
        effect="blur"
        src={pitch?.coverImage}
        height={240}
        style={`w-full h-[240px]`}
      />
      <div className='p-3 laptop:p-[14px] desktop:py-2 desktop:px-4 bg-white'>
        <div className='flex justify-between mb-1'>
          <Skeleton>
            <h5 className='text-16 font-medium text-[#2E2E27] P-3 text-20 tablet:font-bold'>{pitch?.name}</h5>
            <Image src={Arrow} alt="Arrow Up" width="24px" height='24px' className='hover:border-[#F2F1E8] hover:border hover:bg-[#F2F1E8]' />
          </Skeleton>
        </div>
        <p className='text-12 font-normal text-[#2E2E27] P-3 flex'>
          <Skeleton>{pitch?.contentImagesUrls?.length} pages </Skeleton>
          <Skeleton height={0}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7.5" cy="8.97321" r="1.5" fill="#2E2E27" />
            </svg> Raised {pitch.amountRaised}
          </Skeleton>
        </p>
      </div>
      <div className='flex w-fit items-center gap-8 p-2 mx-auto'>
        <Link href={{
          pathname: `/pitchdecks/${createSlug(pitch?.name)}`
        }}>
          <button className="border border-[#A9EFCD] bg-[#A9EFCD] py-1 px-3 rounded-lg text-sm text-[#2E2E2F] font-bold hover:bg-slate-300">View</button>
        </Link>
        <button onClick={()=>onDeletePitch(pitch)} className="border border-[#FF6464] bg-[#FF6464] py-1 px-3 rounded-lg text-sm text-white font-medium hover:bg-slate-300">Delete</button>
      </div>
    </div>
  );
};

export default PitchCard;
