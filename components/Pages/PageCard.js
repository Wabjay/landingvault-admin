import Arrow from "@/assets/arrowUp.svg";
import { createSlug } from '@/components/blocks/slug';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Skeleton from '@/components/blocks/Skeleton';
import LoadImage from '@/components/blocks/LoadImage';
import { store } from '@/stores/store';
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/components/utils/navigations";
import { handleDeletePage } from "@/lib/deleteData";
import { Notification } from "@/components/blocks/Notification";
import axios from "@/lib/axios";


const PageCard = ({ page }) => {
  const { token, fetchAllPages, setIsOverlayLoading } = store();
  const { navigateTo } = useNavigation();

  const onDeletePage = async (page) => {
    try {
      await handleDeletePage(page.brandName, page._id, token, () => {
        fetchAllPages();
        navigateTo("/pages");
      })
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };



  const onDuplicatePage = async (page) => {

    const  updatedTitle = Math.floor(Math.random() * 10) + 1
    const payload = {
      pageImage: page.pageImage,
      pageCoverImage: page.pageCoverImage,
      brandName: page.brandName + updatedTitle,
      brandDescription: page.brandDescription,
      websiteUrl: page.websiteUrl,
      componentType: page.componentType,
      industry: page.industry,
      stacks: page.stacks,
      style: page.style,
      type: page.type,
      mode: page.mode,
      colorPalette: page.colorPalette,
    };
      console.log("payload ", payload)
    try {
      setIsOverlayLoading(true); // Show loading state

      // Make API call to create the page
      await axios.post("/page", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
        },
      });

      Notification("Page Duplicated Successfully"); // Show success message
      fetchAllPages(); // Refresh page list

      // Navigate to the newly created page
    } catch (error) {
      // Handle errors gracefully
      Notification("Error Duplicating Page");
      console.error("Error Duplicating Page:", error);
    } finally {
      setIsOverlayLoading(false); // Hide loading state
    }
  };



  if (!page) return <Skeleton>Loading...</Skeleton>;

  return (
    <div className={`max-w-[264px] w-full flex flex-col h-full overflow-hidden justify-between hover:border-[#21AB68]`}>
      <div className="relative border-[0.5px] border-[#D2D2CF] mb-4">
        <LoadImage
          alt="Page"
          effect="blur"
          src={page?.pageCoverImage}
          height={380}
          style={`w-full h-[380px] page_card`}
        />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 p-2 mx-auto'>
        <div className='flex items-center gap-4 p-2 mx-auto'>
          <Link href={{ pathname: `/pages/${createSlug(page?._id)}` }}>
            <button className="border border-[#A9EFCD] bg-[#A9EFCD] py-1 px-3 rounded-lg text-sm text-[#2E2E2F] font-bold hover:bg-slate-300">View</button>
          </Link>
          <Link href={{ pathname: `/pages/edit/${createSlug(page?._id)}` }}>
            <button className="border border-[#A9EFCD] bg-[#A9EFCD] py-1 px-3 rounded-lg text-sm text-[#2E2E2F] font-bold hover:bg-slate-300">Edit</button>
          </Link>
          <button onClick={() => onDeletePage(page)} className="border border-[#FF6464] bg-[#FF6464] py-1 px-3 rounded-lg text-sm text-white font-medium hover:bg-slate-300">Delete</button>
        </div>
        <button onClick={()=>onDuplicatePage(page)} className="border border-[#A9EFCD] bg-[#A9EFCD] py-1 px-3 rounded-lg text-sm text-white font-medium hover:bg-slate-300">Duplicate Page</button>
        </div>
        
        <Link href={`/pages/${createSlug(page?._id)}`} className="absolute top-2 right-2">
          <Image src={Arrow} alt="Arrow Up" width="24px" height='24px' className='hover:border-[#F2F1E8] hover:border hover:bg-[#F2F1E8]' />
        </Link>
      </div>
      <div className='bg-white'>
        <div className='flex flex-col gap-2 justify-between mb-1'>
          <Skeleton>
            <h5 className='text-16 font-medium text-grey-900'>{page?.brandName}</h5>
            <p className='text-14 text-grey-700'>{page?.componentType?.join(", ") || "N/A"}</p>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default PageCard;
