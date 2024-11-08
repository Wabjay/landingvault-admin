/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ControlIcon from "@/assets/control.png";
import ChartIcon from "@/assets/Chart.png";
import SettingIcon from "@/assets/Setting.png";
import LogoIcon from "@/assets/logo.png";
import { handleLogout } from "@/lib/logout";
import { useNavigation } from "./utils/navigations";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { navigateTo } = useNavigation();
  const { logOut } = handleLogout();

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
    console.log("Logout button");
    logOut(navigateTo);
  };

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-[200px]" : "w-20"
        } bg-white border-r border-r-green-600 h-full p-5 pt-4 relative duration-300`}
      >
        <Image
          src={ControlIcon}
          alt="Toggle Sidebar"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !isOpen && "rotate-180"
          }`}
          onClick={toggleSidebar}
        />

        <div className="flex gap-x-2 items-center">
          {/* <Image
            src={LogoIcon}
            alt="Logo"
            className={`cursor-pointer duration-500 w-10 h-10 ${
              isOpen && "rotate-[360deg]"
            }`}
          /> */}
          {isOpen && (
            <h1 className="text-green-600 font-semibold text-16 whitespace-nowrap">
              LANDINGVAULT
            </h1>
          )}
        </div>

        <ul className="pt-6 relative h-full">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <li
                className="flex rounded-md p-2 cursor-pointer hover:bg-white hover:underline text-green-600 text-xl font-semibold items-center gap-x-4 mb-2 bg-light-white"
              >
                <Image src={item.icon} alt={`${item.label} Icon`} />
                {isOpen && (
                  <span className="origin-left duration-200">{item.label}</span>
                )}
              </li>
            </Link>
          ))}
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
