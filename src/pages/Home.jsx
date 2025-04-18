import React from "react";
import Latest from "../components/Latest";
import LatestDrops from "../components/LatestDrops";
import MostWatched from "../components/MostWatched";
import OurPolicy from "../components/OurPolicy";
import GetInTouch from "../components/GetInTouch";
import Chatbot from "../components/Chatbot";
import SceneRecognition from "../components/SceneRecognition";

const Home = () => {
  return (
    <div>
      <Latest />
      <LatestDrops />
      <MostWatched />
      <OurPolicy />
      <GetInTouch />
      <Chatbot />
      <SceneRecognition />
    </div>
  );
};

export default Home;
