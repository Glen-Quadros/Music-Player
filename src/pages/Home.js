import React from "react";
import { Logo, MusicList, MusicPlayer } from "../components";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Logo />
      <MusicList />
      <MusicPlayer />
    </div>
  );
};

export default Home;
