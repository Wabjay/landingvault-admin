/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ControlIcon from "@/assets/control.png";
import ChartIcon from "@/assets/Chart.png";
import SettingIcon from "@/assets/Setting.png";
import LogoIcon from "@/assets/logo.png"; // Uncomment if you plan to use logo
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

  // Check if the current pathname matches the item's href
  const isActive = (href) => pathname.startsWith(href);

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-[200px]" : "w-20"
        } bg-white border-r border-r-green-600 h-full pt-4 relative duration-300`}
      >
        {/* Sidebar toggle button */}
        <Image
          src={ControlIcon}
          alt="Toggle Sidebar"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !isOpen && "rotate-180"
          }`}
          onClick={toggleSidebar}
        />

        {/* Logo and brand name */}
        <div className="flex gap-x-2 items-center">
          {/* <Image
            src={LogoIcon}
            alt="Logo"
            className={`cursor-pointer duration-500 w-10 h-10 ${
              isOpen && "rotate-[360deg]"
            }`}
          /> */}
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
                  isActive(item.href)
                    ? "bg-[#000] text-white"
                    : "bg-white text-green-600"
                } border border-black flex p-2 cursor-pointer hover:bg-[#000] hover:text-white text-xl font-semibold items-center gap-x-4`}
              >
                {/* <Image src={item.icon} alt={`${item.label} Icon`} /> */}
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
