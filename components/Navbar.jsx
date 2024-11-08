/* eslint-disable @next/next/no-img-element */
"use client"
import Image from 'next/image';
import Icon from "@/assets/icon_search.png"
import Calendar from "@/assets/calendar.svg"
import Clock from "@/assets/clock.svg"
import Notification from "@/assets/notification.svg"
import { useEffect, useState } from "react"


const Navbar = () => {

  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const option = { hour: '2-digit', minute: '2-digit', hour12: true };
  const formattedTime = currentTime.toLocaleTimeString(undefined, option);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString(undefined, options);
  return (
    <div className='w-full bg-white'>
      <div className='w-full h-20 px-8 flex justify-between items-center'>
        
        <div className="flex gap-[14px]">
          <Image src={Calendar} alt="calendar" className="w-5 h-5"/>
          <p className="text-[#9B9FAE] text-[16px]">{formattedDate}</p>
        </div>
        <div className="flex gap-[14px]">
          <Image src={Clock} alt="calendar" className="w-5 h-5"/>
          <p className="text-[#9B9FAE] text-[16px]">{formattedTime}</p>
        </div>
       
      </div>
    </div>)
}

export default Navbar