"use client"
import { useEffect, useState } from 'react';
import Loading from '@/components/blocks/LoadingComponent';
import SearchPitch from '@/components/Pitchdeck/SearchPitch';
import DynamicListComponent from '@/components/Pitchdeck/PitchArray';
import { store } from '@/stores/store';
import { getPitches } from '@/lib/fetchData';
import Link from 'next/link';

const PitchContent = () => {
  const [searchInput, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All decks');
  const [loadedPitches, setLoadedPitches] = useState([]);
  const { setIsComponentLoading, fetchPitches, componentLoading } = store();

  // Get Input from search component
  const search = (res) => setSearch(res);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const pitches = await getPitches();
  //     setIsComponentLoading(pitches.status !== 200);
  //     setLoadedPitches(pitches.data);
  //   };
  //   fetchData();

  // }, [componentLoading]);

  useEffect(() => {
    const wordsArray = searchInput.split(/\s+/);
    const sortPitchesByTagOrSearchInput = () => {
      if (activeTag === 'All decks' && !searchInput) {
        return loadedPitches;
      }
      if (activeTag && !searchInput) {
        return loadedPitches.filter(pitch => pitch.tag === activeTag);
      }
      if (searchInput) {
        setActiveTag('All decks');
        return loadedPitches.filter(pitch =>
          wordsArray.some(word =>
            pitch.tag.toLowerCase().includes(word) ||
            pitch.amountRaised.includes(word) ||
            pitch.title.toLowerCase().includes(word) ||
            (pitch.about.includes(word) && word.length > 2)
          )
        );
      }
      return loadedPitches;
    };

    fetchPitches(sortPitchesByTagOrSearchInput());
  }, [componentLoading, searchInput, activeTag, fetchPitches, loadedPitches]);

  return (
    <div className='w-full bg-[#F2F1E8] px-4 py-10' id='pricing'>
      <div className='w-full laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-8 desktop:px-0 pb-[40px] tablet:pb-[80px] laptop:pb-[100px]'>
        <SearchPitch enterSearch={search} />
        <div className='flex gap-3 w-fit mx-auto mb-5'>
          <Link href="pitchdecks/page-type" className='border border-[#21AB68] bg-[#21AB68] p-4 text-16 text-[#FFFFFF] hover:bg-[#21AB78] w-fit whitespace-nowrap flex items-center gap-2 cursor-pointer'>Page Type</Link>
          <Link href="pitchdecks/deck-type" className='border border-[#21AB68] bg-[#21AB68] p-4 text-16 text-[#FFFFFF] hover:bg-[#21AB78] w-fit whitespace-nowrap flex items-center gap-2 cursor-pointer'>Deck Type</Link>
          <Link href="pitchdecks/amount-raised" className='border border-[#21AB68] bg-[#21AB68] p-4 text-16 text-[#FFFFFF] hover:bg-[#21AB78] w-fit whitespace-nowrap flex items-center gap-2 cursor-pointer'>Amount Raised</Link>
          <Link href="pitchdecks/stage-funding" className='border border-[#21AB68] bg-[#21AB68] p-4 text-16 text-[#FFFFFF] hover:bg-[#21AB78] w-fit whitespace-nowrap flex items-center gap-2 cursor-pointer'>Stage/Funding round</Link>
          <Link href="pitchdecks/pitch-category" className='border border-[#21AB68] bg-[#21AB68] p-4 text-16 text-[#FFFFFF] hover:bg-[#21AB78] w-fit whitespace-nowrap flex items-center gap-2 cursor-pointer'>Pitch deck category</Link>
        </div>
        <div className='flex flex-wrap justify-center gap-x-2 gap-y-[10px] mb-6 desktop:mb-[50px] desktop:gap-x-6'>
          <h1 className='text-32 font-bold tablet:text-64 text-[#2E2E27]'>Pitchdecks</h1>
        </div>
        <div className='relative grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6 tablet:gap-[30px] laptop:flex-row laptop:gap-[30px] min-h-[200px] h-fit'>
          {<DynamicListComponent />}
          {/* {componentLoading ? <Loading /> : <DynamicListComponent />} */}
        </div>
      </div>
    </div>
  );
}

export default PitchContent;
