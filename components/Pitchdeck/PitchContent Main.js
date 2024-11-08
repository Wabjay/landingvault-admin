"use client"
import { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import Loading from '@/components/blocks/LoadingComponent';
import SearchPitch from '@/components/Pitchdeck/SearchPitch';
import DynamicListComponent from '@/components/Pitchdeck/PitchArray';
import { store } from '../../../stores/store';

const loadTemplates = async () => {
  const response = await axios.get('/templates/getTemplates');
  return response.data;;
};

const loadPitches = async () => {
  try {
    const response = await axios.get(`/pitch/filter?tag=All`);
    return response.data
  } catch (error) {
    console.error('Error in sort function:', error);
    throw error; // Re-throw the error to propagate it further
  }
};

const PitchContent = () => {
  const [searchInput, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All decks');

  const { fetchTemplates, setIsComponentLoading, fetchPitches, componentLoading } = store();

  // Get Input from search component
  const search = (res) => setSearch(res)

  // Fetch Pitch based on query
  const { data: loadedPitches, isLoading, } = useQuery('pitches', loadPitches);

  // Fetch All Templates
  const { data: loadedTemplates } = useQuery('templates', loadTemplates);

  useEffect(() => {
    setIsComponentLoading(isLoading);
    const wordsArray = searchInput?.split(/\s+/);
    const sortPitchesByTagOrSearchInput = () => {
      if (activeTag === 'All decks' && !searchInput) {
        return loadedPitches;
      }
      // If name is provided but keyword is not, return object containing the name
      if (activeTag && !searchInput) {
        return loadedPitches?.filter(pitch => pitch.tag === activeTag);
      }
      // Filter the original array to get objects containing the keyword
      if (searchInput) {
        setActiveTag('All decks')
        // return loadedPitches.filter(pitch => pitch.title.toLowerCase().includes(wordsArray) || pitch.about.includes(wordsArray));
        const newArray = loadedPitches.filter(pitch => wordsArray.some(word => pitch.tag.toLowerCase().includes(word) || pitch.amountRaised.includes(word) || pitch.title.toLowerCase().includes(word) || (pitch.about.includes(word) && word.length > 2)));
        return newArray
      }
      if (!searchInput && !activeTag) {
        return loadedPitches;
      }
      if (searchInput) {
        setActiveTag('All decks')
        return loadedPitches.filter(pitch => pitch.title.toLowerCase().includes(wordsArray));
      }
      return loadedPitches;
    }

    fetchTemplates(loadedTemplates);
    fetchPitches(sortPitchesByTagOrSearchInput());

  }, [componentLoading, fetchPitches, fetchTemplates, isLoading, loadedPitches, loadedTemplates, searchInput, setIsComponentLoading, activeTag]);

  return (
    <div className='w-full bg-[#F2F1E8] px-4 py-10' id='pricing'>
      <div className='w-full laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-8 desktop:px-0 pb-[40px] tablet:pb-[80px] laptop:pb-[100px]'>
        <SearchPitch enterSearch={search} />
        <div className='flex flex-wrap justify-center gap-x-2 gap-y-[10px] mb-6 desktop:mb-[50px] desktop:gap-x-6'>
          <h1 className='text-32 font-bold tablet:text-64 text-[#2E2E27]'>Your Pitchdecks</h1>
        </div>
        <div className='relative grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6 tablet:gap-[30px] laptop:flex-row laptop:gap-[30px] min-h-[200px] relative h-fit'>
          <Loading />
          <DynamicListComponent />
        </div>
      </div>
    </div>
  )
}

export default PitchContent