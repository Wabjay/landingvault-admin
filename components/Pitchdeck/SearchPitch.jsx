import { useState } from 'react'
import Search from '../../assets/search.svg'
import Link from 'next/link'
import Image from 'next/image'




export default function SearchPitch({enterSearch}) {
  const [search, setSearch] =useState('')
 
const searchInput =(e)=>{
  setSearch(e.target.value)
  enterSearch(e.target.value.toLowerCase())
}
  return (
    <div className='flex justify-center items-center gap-6 mb-6 desktop:mb-10 mx-auto'>
       <div className='flex gap-2 p-3 bg-white-1 w-full max-w-[560px] border-[#C1C9C8] hover:border-myGreen-400 border'>
        <Image src={Search} alt="serach icon"  width="24px"height='24px'/>
        <input type="text" placeholder='Search for a pitchdeck' value={search} onChange={searchInput} className='outline-none w-full' />
    </div>
      <Link href='/pitchdecks/add' className="bg-[#21AB68] border-[#21AB68] shadow-navbarLink inline-flex items-center justify-center p-2 h-full text-[#ffffff]  text-sm leading-5 font-normal focus:outline-none ">Add Pitch</Link>
      </div>



  )
}
