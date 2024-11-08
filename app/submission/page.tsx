
import SubmissionTable from '@/components/Table/SubmissionTable'

export default function Home() {
  const columns = ['Date', 'Email Address', 'Website Name', 'Website URL', " "]
  const data = [{date: "Jan 13, 2022", url: 'www.teslim234.com', name: 'Full Name', email: 'Teslimajani1@gmail.com'}]

  return (
    <div className="w-full">
      <div className="bg-[#FFF]">
        <div className="w-full laptop:max-w-[1050px] p-4 tablet:p-6 laptop:p-8 xl:px-0 flex flex-col gap-6 tablet:gap-10 laptop:gap-10 desktop:gap-24">
    
        <p className='text-grey-800 text-40 font-bold leading-[56px] tracking-[-0.96px] mb-5'>Our Metrics</p>
        <SubmissionTable columns={columns} data={data} pageSize={6} />
        </div>
      </div>
    </div>
  );
}
