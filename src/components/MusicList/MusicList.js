import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useContextProvider } from "../../context/Context";

import "./MusicList.css";
import axios from "axios";
import Song from "../Song/Song";

const MusicList = () => {
  const [musicList, setMusicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("forYou");
  const { setBackgroundColor, selectedSongId, setSelectedSongId } =
    useContextProvider();

  useEffect(() => {
    const fetchMusic = async () => {
      const response = await axios.get("https://cms.samespace.com/items/songs");
      const musicData = response.data.data;
      setMusicList(musicData);
    };
    fetchMusic();
  }, []);

  const filteredMusicList = musicList
    .filter((music) =>
      music.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((music) => (selectedTab === "topTracks" ? music.top_track : true));

  const handleSongClick = (id, accent) => {
    setSelectedSongId(id);
    setBackgroundColor(accent);
  };

  return (
    <div className="musicListContainer">
      <div className="header">
        <div
          className={`tab ${selectedTab === "forYou" ? "active" : "inactive"}`}
          onClick={() => setSelectedTab("forYou")}>
          For You
        </div>
        <div
          className={`tab ${
            selectedTab === "topTracks" ? "active" : "inactive"
          }`}
          onClick={() => setSelectedTab("topTracks")}>
          Top Tracks
        </div>
      </div>
      <div className="search">
        <input
          placeholder="Search Song, Artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IoIosSearch className="icon" />
      </div>
      <div className="musics">
        {filteredMusicList.map((music) => (
          <Song
            key={music.id}
            data={music}
            cover={`https://cms.samespace.com/assets/${music.cover}`}
            isSelected={music.id === selectedSongId}
            onClick={() => handleSongClick(music.id, music.accent)}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicList;
