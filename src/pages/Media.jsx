import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WatchContext } from "../context/WatchContext";
import { assets } from "../assets/assets";
import { ReviewSection } from "../components/Reviews";

const Media = () => {
  const { mediaId } = useParams();
  const { medias, addToWatchList } = useContext(WatchContext);
  const [mediaData, setMediaData] = useState(false);
  const [image, setImage] = useState("");
  const [season, setSeason] = useState("");

  const fetchMediaData = async () => {
    medias.map((item) => {
      if (item._id === mediaId) {
        setMediaData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchMediaData();
  }, [mediaId, medias]);

  return mediaData ? (
    <div className="border-t-2 pt-10 ease-in duration-500 opacity-100">
      <div className="flex gap-6 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="w-full sm:w-[80%] h-full object-cover transition-transform duration-300">
            <img src={image} className="w-full h-90" alt="" />
          </div>
        </div>

        {/* ----------Movie info----------- */}
        <div className="flex-1">
          <h1 className="font-medium text-5xl mt-2 text-white">
            {mediaData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <p className="pl-2 text-white">(1987)</p>
          </div>
          <p className="mt-5 text-2xl font-medium text-white underline">
            Watch Trailer
          </p>
          <p className="mt-5 text-red-100 md:w-4/5">{mediaData.description}</p>
          <p className="mt-5 text-red-100 md:w-4/5">
            Type: {mediaData.category}
          </p>
          <p className="mt-5 text-red-100 md:w-4/5">
            Category: {mediaData.subCategory}
          </p>
          <div className="flex flex-col gap-4 my-8 text-2xl font-medium text-white">
            <p>Seasons</p>
            <div className="flex gap-8 text-lg text-white">
              {mediaData.seasons.map((item, index) => (
                <button
                  onClick={() => setSeason(item)}
                  className={`border py-2 px-4 bg-red-600 ${
                    item === season ? "bg-blue-600 rounded-md" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToWatchList(mediaData._id, season)}
            className="bg-white text-black px-8 py-3 text-sm active:bg-green-600"
          >
            ADD TO MY WATCHLIST
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="ratio ratio-16x9 mt-4">
            <iframe
              width="560"
              height="315"
              src={mediaData.trailer}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20">
        <div className="container mx-auto px-4">
          <ReviewSection mediaId={mediaId} />
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Media;
