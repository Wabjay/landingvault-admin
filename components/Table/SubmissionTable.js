"use client"
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
// import PopUpData from "../FreeToolsPopUp";

const SubmissionTable = ({ columns, data, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState(false);
  const [popData, setPopData] = useState({});

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const currentPageData = data.slice(startIndex, endIndex);

  const nextPage = () => {
      if (currentPage < totalPages - 1) {
          setCurrentPage(currentPage + 1);
        }
    };
    
    // console.log(currentPageData)
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const selectPage = () => {
      setCurrentPage(currentPage - 1);
  };

  const open = (cell) => {
    setStatus(true);
    setPopData(cell)
    console.log(cell)
};

const closePop = (res) => {
  setStatus(res);
};


  const pages = Array.from({ length: totalPages }, (_, index) => index);
  return (
    <div className="overflow-hidden">
      <table className="table-auto w-full laptop:max-w-[1152px] mx-auto px-4 tablet:px-6 laptop:px-8 xl:px-0 py-[40px] tablet:py-[80px] laptop:py-[100px]">
        <thead className="bg-white border-b border-b-[#EAECF0]">
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
          {currentPageData.map((cell, index) => (
            <tr
              className="border-b border-b-[#BEBEBE] hover:bg-[#EDEDEB]"
              key={index}
            >
              <td className="p-6 whitespace-nowrap lowercase">{moment(cell?.date).format('MMM DD YYYY')}</td>
                <td className="p-6 whitespace-nowrap capitalize">{cell?.email}</td>
                <td className="p-6 whitespace-nowrap capitalize">{cell?.name}</td>
                <td className="p-6 whitespace-nowrap capitalize">{cell?.url}</td>
                <td className='p-6 whitespace-nowrap capitalize'>
                 <Link href={`submission/${cell?.email}`} className="border border-[#E8E8EA] bg-white-button shadow-white-shadow px-2 py-[6px] text-14 font-medium cursor-pointer">View</Link>
                  {/* <p className="border border-[#E8E8EA] bg-white-button shadow-white-shadow px-2 py-[6px] text-14 font-medium cursor-pointer" onClick={()=>open(cell)}>View company</p> */}
              </td>

            </tr>
          ))}
        
        </tbody>
      </table>
      <div className="mt-6 h-fit flex justify-between p-6 bg-white">
        <button className="flex gap-2 items-center border border-[#D0D5DD] bg-white-1 shadow-table-button p-4 rounded-lg" onClick={prevPage} disabled={currentPage === 0}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8346 9.99996H4.16797M4.16797 9.99996L10.0013 15.8333M4.16797 9.99996L10.0013 4.16663" stroke="#344054" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
Previous
        </button>
        {/* <span className="flex gap-2 items-center border border-[#D0D5DD] bg-white-1 shadow-table-button p-4 rounded-lg">
          Page {currentPage + 1} of {totalPages}
        </span> */}

        <span className="flex gap-4 items-center border border-[#D0D5DD] bg-white-1  px-4 shadow-table-button rounded-lg">
         {pages.map(page =>  <span className={`hover:bg-[#D0D5DD] p-4 cursor-pointer ${currentPage === (page) && 'bg-[#D0D5DD]'}`} onClick={()=> setCurrentPage(page)} disabled={currentPage === 0}>{page + 1} </span>)}
        </span>


        <button className="flex gap-2 items-center border border-[#D0D5DD] bg-white-1 shadow-table-button p-4 rounded-lg" onClick={nextPage} disabled={currentPage === totalPages - 1}>
          Next<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16797 9.99996H15.8346M15.8346 9.99996L10.0013 4.16663M15.8346 9.99996L10.0013 15.8333" stroke="#344054" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </button>
      </div>
              {/* <PopUpData setShowData={closePop} showData={status} data={cell}/> */}

      {/* <PopUpData setShowData={closePop} showData={status} data={popData}/> */}

    </div>
  );
};



export default SubmissionTable;
