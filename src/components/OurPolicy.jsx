import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-red-600">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold text-white">Smooth Streaming</p>
        <p className="text-blue-500">
          Enjoy a fully engaging streaming experience
        </p>
      </div>

      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold text-white">Quality</p>
        <p className="text-blue-500">
          Highly quality streaming on Everest Movies
        </p>
      </div>

      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold text-white">24/7 Support</p>
        <p className="text-blue-500">We are available 24/7 for our customers</p>
      </div>
    </div>
  );
};

export default OurPolicy;
