import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="w-[14%] sm:w-52 min-h-screen text-black shadow-md overflow-hidden">
      <div className="flex flex-col gap-4 pt-8 px-4">

        <NavLink
          className="flex items-center lg:ml-0 gap-3 py-2 sm:w-full w-14 lg:px-5 px-1"
          to="/add"
        >
          <img width="25" height="30" src="https://img.icons8.com/ios/50/add--v1.png" alt="add--v1"/>
          <p className="hidden md:block rounded-md">Add Items</p>
        </NavLink>

        <div className="w-full">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-around w-10 gap-1 sm:w-full py-3 sm:px-5 ml-1 lg:ml-0 rounded-md transition duration-300"
          >
            <div className="flex items-center gap-2">
            <img className="w-7 h-7" src="https://img.icons8.com/ios-glyphs/50/list--v1.png" alt="list--v1"/>
              <p className="hidden md:block text-nowrap">List Items</p>
            </div>
            {showFilter ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <div
            className={`${
              showFilter ? "block" : "hidden"
            } lg:px-8 lg:ml-8 transition-all duration-300`}
          >
            <NavLink
              to="/menslist"
              className="block text-sm text-black lg:w-full w-[54px] px-1 py-1 cursor-pointer"
            >
              Men
            </NavLink>
            <NavLink
              to="/womenslist"
              className="block text-sm text-black lg:w-full w-[54px] px-1 py-1 cursor-pointer"
            >
              Women
            </NavLink>
            <NavLink
              to="/kidslist"
              className="block text-sm text-black lg:w-full w-[54px] px-1 py-1 cursor-pointer"
            >
              Kids
            </NavLink>
          </div>
        </div>

        <NavLink
          className="flex items-center gap-3 w-14 sm:w-full py-1.5 lg:ml-0 lg:px-5 px-1 transition duration-300"
          to="/orders"
        >
          <img className="w-7 h-7" src="https://img.icons8.com/ios/50/order-completed--v2.png" alt="order-completed--v2"/>
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
