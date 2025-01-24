// "use client"
import { FC } from 'react';
import moment from 'moment';
import SkeletonLoader from '@/components/Skeleton';

type Click = {
  _id: string;
  product: string;
  website: string;
  count: number;
  timestamp: string;
};

const fetchClicks = async (): Promise<Click[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clicks`, {
    cache: 'no-store', // Prevent caching for real-time data
  });
  if (!res.ok) throw new Error('Failed to fetch clicks');
  return res.json();
};



const columns = ['Website', 'Clicked Advert', 'Count', 'Timestamp']


const ClicksPage: FC = async () => {
  const clicks = await fetchClicks();

  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[1050px] p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-10 desktop:gap-24">
    
        <p className='text-grey-800 text-40 font-bold leading-[56px] tracking-[-0.96px] mb-5'>Advert Clicks</p>
      
      </div>
      <table className="table-auto w-full laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-8 xl:px-0 py-[40px] tablet:py-[80px] laptop:py-[100px]">
        <thead className="bg-[#F3F3F4]">
          <tr>
            {columns.map((column) => (
              <th
                className="p-6 text-left whitespace-nowrap text-xs font-medium text-gray-500 uppercase tracking-wider"
                key={column}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white-1">
          {clicks?.map((cell, index) => (
             <tr
             key={index}
              className="border-b border-b-[#EAECF0] hover:bg-[#EDEDEB]"
            >
              <td className="p-6 whitespace-nowrap capitalize">{cell.website}</td>
              <td className="p-6 whitespace-nowrap capitalize">{cell.product}</td>
              <td className="p-6 whitespace-nowrap capitalize">{cell.count}</td>
              <td className="p-6 whitespace-nowrap capitalize">{moment(cell.timestamp).format('MMM DD YYYY')}</td>
            </tr>
            
          ))}
        
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ClicksPage;
