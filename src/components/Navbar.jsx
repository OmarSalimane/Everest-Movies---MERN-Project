import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { WatchContext } from "../context/WatchContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getWatchlistCount, setToken } =
    useContext(WatchContext);
  const navigate = useNavigate();

  // Add logout handler function
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Clear token from context
    setToken(null);
    // Navigate to login page
    navigate("/login", { state: { forceLogin: true } });
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.Everest} className="w-32" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-base text-blue-400">
        <NavLink to="/" className="flex flex-col items0center gap-1">
          <p>HOME</p>
          <hr className="W-2/4 border-none h-[1.5px] bg-blue-600 hidden" />
        </NavLink>

        <NavLink to="/library" className="flex flex-col items0center gap-1">
          <p>LIBRARY</p>
          <hr className="W-2/4 border-none h-[1.5px] text-blue-400 hidden" />
        </NavLink>

        <a
          href="http://localhost:8501/"
          className="flex flex-col items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>AI Recommendation</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-blue-600 hidden" />
        </a>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-6 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <Link to="/login">
            <img
              src={assets.profile_icon}
              className="w-6 cursor-pointer"
              alt=""
            />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-black rounded">
              <NavLink className="cursor-pointer hover:text-blue-600">
                {" "}
                My Profile
              </NavLink>
              <NavLink
                to="/watchlist"
                className="cursor-pointer hover:text-blue-600"
              >
                {" "}
                WatchList
              </NavLink>
              {/* Update the Logout NavLink to use the handleLogout function */}
              <button
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-600 text-left"
              >
                {" "}
                Logout
              </button>
            </div>
          </div>
        </div>

        <Link to="/watchlist" className="relative">
          <img src={assets.cart_icon} className="w-7 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-white text-black aspect-square rounded-full text-[8px]">
            {getWatchlistCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-black transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-blue-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>

          {/* The onClick property allows us to close the sidebar menu automatically and redirect us the desired page */}
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/library"
          >
            LIBRARY
          </NavLink>

          {/* Add logout option to the mobile menu as well */}
          <button
            onClick={() => {
              setVisible(false);
              handleLogout();
            }}
            className="py-2 pl-6 border text-left text-blue-600"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
