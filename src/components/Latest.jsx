import React from "react";
import { assets } from "../assets/assets";

const Latest = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-blue-500">
      {/* LeftSide of the Header */}
      <div className="w-full sm;w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-blue-600">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-blue-600"></p>
            <p className="font-medium text-sm md:text-base">
              Exclusively on Everest Movies
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            {" "}
            Latest DROPS
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">Watch now</p>
            <p className="w-8 md:w-11 h-[1px] bg-blue-600"></p>
          </div>
        </div>
      </div>

      {/* Right Side of the Header */}
      <img src={assets.hero_img} className="w-full sm:w-2/3" alt="" />
    </div>
  );
};

export default Latest;
