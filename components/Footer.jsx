import Phone from '@/assets/phone.svg'
import Email from '@/assets/send.svg'
import Map from '@/assets/map.svg'
import Link from 'next/link'
import Image from 'next/image'


const Footer = () => {
  return (
    <div className='w-full bg-[#1B0D30]'>
      <div className='w-full laptop:max-w-[1152px] px-4 tablet:px-6 laptop:px-8 xl:px-0  mx-auto py-[40px] tablet:py-[80px] laptop:py-[100px]'>
        <div className='flex flex-col laptop:flex-row laptop:items-start laptop:justify-between text-white'>
          <div className='flex flex-col gap-3 desktop:gap-4 text-white font-bold text-left'>
            <p className='text-[20px]  leading-[22px] ] mb-2'>Company</p>
            <Link smooth href='/#works' className='text-[16px]  laptop:text-[16px] leading-[22px] text-white'>About Us</Link>
            <Link smooth href='/#faq' className='text-[16px]  laptop:text-[16px] leading-[22px] text-white'>FAQ</Link>
            <Link smooth href='/#pricing' className='text-[16px] laptop:text-[16px] leading-[22px] text-white'>Blog</Link>
          </div>

          <div className='flex flex-col gap-3 desktop:gap-4 text-white font-bold text-left'>
            <p className='text-[16px]  leading-[22px] ] mb-2'>Legal</p>
            <Link smooth href='/#works' className='text-sm  laptop:text-[16px] leading-[22px] text-white'>Terms and Condition</Link>
            <Link smooth href='/#faq' className='text-sm  laptop:text-[16px] leading-[22px] text-white'>Privacy and security</Link>
            <Link smooth href='/#pricing' className='text-sm laptop:text-[16px] leading-[22px] text-white'>We are hiring</Link>
            <Link smooth href='/#pricing' className='text-sm laptop:text-[16px] leading-[22px] text-white'>Blog</Link>
          </div>

          <div className='flex flex-col gap-3 desktop:gap-4 text-white font-bold text-left'>
            <p className='text-[16px]  leading-[22px] ] mb-2'>Get In Touch</p>
            <Link smooth href='/#works' className='text-sm text-white laptop:text-[16px] leading-[22px] flex gap-2'> <Image src={Phone} alt="" />(+234) 8100-0000-00</Link>
            <Link smooth href='/#faq' className='text-sm text-white laptop:text-[16px] leading-[22px]  flex gap-2'> <Image src={Map} alt="" />009 Marina Lagos, Nigeria</Link>
            <Link smooth href='/#pricing' className='text-sm laptop:text-[16px] leading-[22px] text-white flex gap-2'> <Image src={Email} alt="" />Arya@example.com</Link>
          </div>

      
        </div>
      </div>
    </div>)
}

export default Footer