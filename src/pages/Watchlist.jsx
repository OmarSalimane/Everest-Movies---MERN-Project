import React, { useContext, useEffect, useState } from "react";
import { WatchContext } from "../context/WatchContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Watchlist = () => {
  const { medias, watchlistMedias, updateState } = useContext(WatchContext);

  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in watchlistMedias) {
      for (const item in watchlistMedias[items]) {
        if (watchlistMedias[items][item] > 0) {
          tempData.push({
            _id: items,
            season: item,
          });
        }
      }
    }
    setWatchlistData(tempData);
  }, [watchlistMedias]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"WATCHLIST"} />
      </div>

      <div className="">
        {watchlistData.map((item, index) => {
          const mediaData = medias.find((media) => media._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-white grid grid-cols[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className=" flex items-start gap-6">
                <img src={mediaData.image[0]} className="w-16 sm:w-20" alt="" />
                <div>
                  <p className="text-xl sm:text-lg font-medium">
                    {mediaData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-black px-2 sm:px-3 sm:py-1 border bg-slate-300">
                      Season {item.season}
                    </p>
                  </div>
                </div>
              </div>

              <img
                onClick={() => updateState(item._id, item.season, 0)}
                src={assets.bin_icon}
                className="w-4 sm:w-5 cursor-pointer "
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
