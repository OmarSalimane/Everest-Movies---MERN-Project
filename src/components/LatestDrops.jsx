import React, { useContext, useEffect, useState } from "react";
import { WatchContext } from "../context/WatchContext";
import Title from "./Title";
import Media from "./Media";
import { Link } from "react-router-dom";

const LatestDrops = () => {
  const { medias } = useContext(WatchContext);
  const [latestMedias, setLatestMedias] = useState([]);

  useEffect(() => {
    setLatestMedias(medias.slice(0, 12));
  }, []);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"DROPS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-blue-600">
          Discover our latest DROPS this month on Everest Movies
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6">
        {latestMedias.map((item, index) => (
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
  );
};

export default LatestDrops;
