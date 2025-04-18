import React from "react";
import { Link } from "react-router-dom";

const Media = ({ id, image, name, price }) => {
  return (
    <Link className="text-white cursor-pointer" to={`/media/${id}`}>
      <div className="overflow-hidden ">
        <img
          className="hover:scale-110 transition ease-in-out h-64 w-54"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <button
        type="submit"
        className="bg-blue-700 text-white text-center font-semibold text-sm px-10 py-4"
      >
        {price}
      </button>
    </Link>
  );
};

export default Media;
