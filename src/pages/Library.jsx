import React, { useContext, useEffect, useState } from "react";
import { assets, medias } from "../assets/assets";
import { WatchContext } from "../context/WatchContext";
import Title from "../components/Title";
import Media from "../components/Media";
import { Link } from "react-router-dom";

const Library = () => {
  const { medias, search, showSearch } = useContext(WatchContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterMedias, setFilterMedias] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let mediasCopy = medias.slice();

    if (showSearch && search) {
      mediasCopy = mediasCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      mediasCopy = mediasCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      mediasCopy = mediasCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterMedias(mediasCopy);
  };

  useEffect(() => {
    setFilterMedias(medias);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-1- pt-10 border-t">
      {/* Filter Options*/}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-white"
        >
          FILTERS
        </p>
        <img
          src={assets.dropdown_icon}
          className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          alt=""
        />

        {/* Category Filter */}
        <div
          className={`border pl-5 py-3 mt-6 border-blue-500 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium text-white">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-white">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"MOVIES"}
                onChange={toggleCategory}
              />{" "}
              MOVIES
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"TV SHOWS"}
                onChange={toggleCategory}
              />{" "}
              TV SHOWS
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"DOCUMENTARIES"}
                onChange={toggleCategory}
              />{" "}
              DOCUMENTARIES
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border pl-5 py-3 my-5 border-blue-500 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium text-white">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-white">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"DRAMA"}
                onChange={toggleSubCategory}
              />{" "}
              DRAMA
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"SPORTS"}
                onChange={toggleSubCategory}
              />{" "}
              SPORTS
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"CRIME"}
                onChange={toggleSubCategory}
              />{" "}
              CRIME
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"ACTION"}
                onChange={toggleSubCategory}
              />{" "}
              ACTION
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"POLICE"}
                onChange={toggleSubCategory}
              />{" "}
              POLICE
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"CARTEL"}
                onChange={toggleSubCategory}
              />{" "}
              CARTEL
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"FANTASY"}
                onChange={toggleSubCategory}
              />{" "}
              FANTASY
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"LAW"}
                onChange={toggleSubCategory}
              />{" "}
              LAW
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"COMEDY"}
                onChange={toggleSubCategory}
              />{" "}
              COMEDY
            </p>
          </div>
        </div>
      </div>

      {/* Right Side of the page */}

      <div className="flex-1 ml-4">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"OUR"} text2={"LIBRARY"} />
          {/* Media sort */}
          <select className="border-2 border-white text-sm px-2">
            <option value="relevent">Sort by: Relevence</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterMedias.map((item, index) => (
            <Link
              key={index}
              to={`/media/${item._id}`}
              className="w-full h-82 relative overflow-hidden block"
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-center p-2">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
