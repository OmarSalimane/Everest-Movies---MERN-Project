import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.Everest} className="mb-5 w-48" alt="" />
          <p className="w-full md:w-2/3 text-white">
            "Explore limitless entertainment with Everest Movies, your gateway
            to a world of cinematic adventures. Discover a curated collection of
            movies spanning genres from action-packed thrillers to heartwarming
            dramas, all available at your fingertips. Join our community of film
            enthusiasts and immerse yourself in the magic of storytelling,
            anytime, anywhere."
          </p>
        </div>

        <div>
          <p className="text-xl font:medium mb-5 text-blue-600">Company</p>
          <ul className="flex flex-col gap-1 text-white">
            <li>Home</li>
            <li>About us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-blue-600">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-white">
            <li>+447123456789</li>
            <li>EVERESTMOVIES@COMPANY.COM</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center text-white">
          Copyright 2025@ everestmovies.com - All Right reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
