"use client"
import Table from "@/components/Table/UsersTable";
import { SetStateAction, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { store } from "@/stores/store";
import BackButton from "@/components/blocks/BackButton";
import Card from "@/components/Subscribers/Card";

export default function  Users()  {

  const [users, setUsers] = useState([])
  const [selectedOption, setSelectedOption] = useState("all");
  const [totalUsers, setTotalUsers] = useState(0);

  const { data, token } = store();



  const columns = ['Date of Registration', 'Email Address' ]


  const handleSelectChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
};

useEffect(() => {
  // eslint-disable-next-line no-unused-expressions
  selectedOption === 'all' ? 
  <>
    {setUsers(data.listOfRegisteredUsers)}
  {setTotalUsers(data.totalNumberOfUsers)}
  </>
  
   : 
  // Your logic to handle state change based on the selected option
      axios.get(`/statistics/users?period=${selectedOption}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setUsers(response.data.users)
   setTotalUsers(response.data.NumberOfRegisteredUsers)

        });
    
  // console.log("Selected option changed:", selectedOption);
  // Example logic:
  // if (selectedOption === "today") {
  //     // Do something
  // } else if (selectedOption === "week") {
  //     // Do something else
  // }
}, [data.listOfRegisteredUsers, selectedOption]); // Dependency array ensures the effect runs only when selectedOption changes



  return (
    <div className="bg-[#F2F1E8] min-h-screen px-4 tablet:px-6 laptop:px-10">
        <div className="pt-10 w-full laptop:max-w-[1152px] mx-auto">
          <div className="flex justify-between">
          <p className='text-grey-800 text-40 font-bold mb-5'>Total Subscribers</p>


      <div className='border border-[#2D2D2D] W-[275px] h-fit'>
      <select name="filter" className='w-full' value={selectedOption} onChange={handleSelectChange}>
                <option value="all">All</option>
                <option value="daily">Today</option>
                <option value="weekly">A week</option>
                <option value="monthly">A month</option>
                <option value="yearly">A year</option>
            </select>
</div>
          </div>
      

      <div className="overflow-x-auto text-[#101828] border border-[#EAECF0] shadow-table-shadow">
        <div className="flex flex-wrap gap-4 mb-6">
       <Card name={"No of Subscribers"} value={totalUsers}/>
       <Card name={"Active users"} value={totalUsers}/>
        </div>
        <Table data={users} columns={columns} pageSize={10} />
      </div>
    </div>
    </div>
    
  );
};



