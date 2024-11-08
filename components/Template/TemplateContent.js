"use client"

import { useEffect, useState } from 'react'
// import { useQuery } from 'react-query';
// import axios from '@/lib/axios'
import TemplateCard from '@/components/Template/TemplateCard'
import Loading from '@/components/blocks/LoadingComponent'
import { useFetchData } from '@/lib/fetchData';
import { store } from '@/stores/store';
import PitchCard from '../Pitchdeck/PitchCard';

// const loadTemplates = async () => {
//   const response = await axios.get('/templates/getTemplates');
//   return response.data;;
// };

const TemplateContent = () => {
  const {getTemplates} = useFetchData()

  const { templates, fetchTemplates, setIsComponentLoading, componentLoading } = store()
  const [loadedTemplates, setLoadedTemplates] = useState([]);


  
  // Fetch All Templates
  // const { data: loadedTemplates, isLoading } = useQuery('templates', loadTemplates);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const templates = await getTemplates();
        fetchTemplates(templates.data);
        setLoadedTemplates(templates.data);
        // console.log(templates.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    console.log(templates)
  },[templates])

  // useEffect(() => {
  //   // setIsComponentLoading(isLoading);

  //   fetchTemplates(loadedTemplates);


  // }, [componentLoading, fetchTemplates, loadedTemplates, setIsComponentLoading]);

  return (
    <div className='w-full bg-[#F2F1E8]'>

      <div className='w-full laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-8 desktop:px-0 pt-[25px] pb-[40px] tablet:pb-[80px] laptop:pb-[100px]'>
        <div className='relative grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6 tablet:gap-[30px] laptop:flex-row laptop:gap-[30px] '>
          <Loading />
          {templates && templates.map(item => (
            // <TemplateCard
            //   key={item._id}
            //   template={item}
            // />
            <PitchCard
            key={item._id}
            pitch={item}
          />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemplateContent