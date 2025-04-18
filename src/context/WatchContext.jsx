import { createContext, useEffect, useState } from "react";
import { medias } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const WatchContext = createContext();

const WatchContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [watchlistMedias, setWatchlistMedias] = useState({});
  const [mediass, setMediass] = useState([]);
  const [token, setToken] = useState([]);
  const navigate = useNavigate();

  const addToWatchList = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select Season");
      return;
    }
    let watchlistData = structuredClone(watchlistMedias);

    if (watchlistData[itemId]) {
      if (watchlistData[itemId][size]) {
        watchlistData[itemId][size] += 1;
      } else {
        watchlistData[itemId][size] = 1;
      }
    } else {
      watchlistData[itemId] = {};
      watchlistData[itemId][size] = 1;
    }
    setWatchlistMedias(watchlistData);
  };

  const getWatchlistCount = () => {
    let totalCount = 0;
    for (const items in watchlistMedias) {
      for (const item in watchlistMedias[items]) {
        try {
          if (watchlistMedias[items][item] > 0) {
            totalCount += watchlistMedias[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getMediasData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setMediass(response.data.mediass);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMediasData();
  }, []);

  const updateState = async (itemId, season, state) => {
    let watchlistData = structuredClone(watchlistMedias);

    watchlistData[itemId][season] = state;

    setWatchlistMedias(watchlistData);
  };

  const value = {
    medias,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    watchlistMedias,
    addToWatchList,
    getWatchlistCount,
    updateState,
    backendUrl,
    setToken,
    token,
  };

  return (
    <WatchContext.Provider value={value}>
      {props.children}
    </WatchContext.Provider>
  );
};

export default WatchContextProvider;
