"use client";
import { SetStateAction, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { store } from "@/stores/store";
import BackButton from "@/components/blocks/BackButton";
import Card from "@/components/Subscribers/Card";
import Table from "@/components/Table/UsersTable";

export default function Users() {
  const [users, setUsers] = useState([]); // Store users data
  const [selectedOption, setSelectedOption] = useState("all"); // Store selected option
  const [totalUsers, setTotalUsers] = useState(0); // Store total users count
  const [loading, setLoading] = useState(false); // Loading state for API request

  const { user, token } = store();

  // Columns for the table
  const columns = ["Date of Registration", "Email Address"];

  const handleSelectChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    // Set the total users count when the selected option is "all"
    if (selectedOption === "all") {
      setTotalUsers(users.length);
    } else {
      // Fetch data from the API based on the selected option (daily, weekly, monthly, yearly)
      setLoading(true); // Start loading
      axios
        .get(`/statistics/users?period=${selectedOption}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setUsers(response.data.users);
          setTotalUsers(response.data.NumberOfRegisteredUsers); // Set total users count
        })
        .catch(function (error) {
          console.error("Error fetching data", error);
        })
        .finally(() => {
          setLoading(false); // End loading
        });
    }
  }, [selectedOption, users.length, token]); // Dependency array ensures the effect runs when selectedOption or users changes

  return (
    <div className="bg-[#F2F1E8] min-h-screen px-4 tablet:px-6 laptop:px-10">
      <div className="pt-10 w-full laptop:max-w-[1152px] mx-auto">
        <div className="flex justify-between">
          <p className="text-grey-800 text-40 font-bold mb-5">Total Subscribers</p>
          <div className="border border-[#2D2D2D] w-[275px] h-fit">
            <select
              name="filter"
              className="w-full"
              value={selectedOption}
              onChange={handleSelectChange}
            >
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
            <Card name={"No of Subscribers"} value={totalUsers} />
            <Card name={"Active users"} value={totalUsers} />
          </div>

          {/* Loading state for API call */}
          {loading ? (
            <div className="text-center p-4">Loading...</div> // Show loading message or spinner
          ) : (
            <Table data={users} columns={columns} pageSize={10} />
          )}
        </div>
      </div>
    </div>
  );
}
