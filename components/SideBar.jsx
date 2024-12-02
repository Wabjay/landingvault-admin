/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ControlIcon from "@/assets/control.png";
import ChartIcon from "@/assets/Chart.png";
import SettingIcon from "@/assets/Setting.png";
import { handleLogout } from "@/lib/logout";
import { useNavigation } from "./utils/navigations";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { navigateTo } = useNavigation();
  const { logOut } = handleLogout();
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/", icon: ChartIcon },
    { label: "Categories", href: "/categories", icon: ChartIcon },
    { label: "Pages", href: "/pages", icon: ChartIcon },
    { label: "Sponsorship", href: "/sponsorship", icon: ChartIcon },
    { label: "Submission", href: "/submission", icon: ChartIcon },
    { label: "Subscribers", href: "/subscribers", icon: ChartIcon },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogoutClick = () => {
    logOut(navigateTo);
  };

  // Check if the current pathname matches the item's href (exact or partial match)
  const isActive = (href) => {
    
    // Exact match or startsWith for more flexible matching
const url = href.toLowerCase() === "dashboard" ? "/" : href.toLowerCase()
    return pathname === href || pathname.includes(href.toLowerCase());
};


  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-[150px]" : "w-20"
        } bg-white border-r border-r-green-600 h-full pt-4 relative duration-300`}
      >
        {/* Sidebar toggle button */}
        <Image
          src={ControlIcon}
          alt="Toggle Sidebar"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!isOpen && "rotate-180"}`}
          onClick={toggleSidebar}
        />

        {/* Logo and brand name */}
        <div className="flex gap-x-2 items-center">
          {isOpen && (
            <h1 className="text-green-600 p-5 font-semibold text-16 whitespace-nowrap">
              LANDINGVAULT
            </h1>
          )}
        </div>

        {/* Menu items */}
        <ul className="pt-6 relative h-full">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <li
                className={`${
                  isActive(item.label)
                    ? "bg-[#000] text-white" // Active item style
                    : "bg-white text-green-600" // Default item style
                } border border-black flex p-2 cursor-pointer hover:bg-[#000] hover:text-white text-xl font-semibold items-center gap-x-4`}
              >
                {isOpen && (
                  <span className="origin-left duration-200">{item.label}</span>
                )}
              </li>
            </Link>
          ))}

          {/* Logout button */}
          <li
            onClick={handleLogoutClick}
            className="mt-8 flex rounded-md p-2 cursor-pointer hover:bg-white hover:underline text-green-600 text-xl font-semibold items-center gap-x-4"
          >
            <Image src={SettingIcon} alt="Logout Icon" />
            {isOpen && (
              <span className="origin-left duration-200">Log Out</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
