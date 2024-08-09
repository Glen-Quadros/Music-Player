import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Slider from "@mui/material/Slider";

import { MdPlayArrow, MdOutlinePause } from "react-icons/md";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaVolumeUp } from "react-icons/fa";
import { useContextProvider } from "../../context/Context";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  const { setBackgroundColor, selectedSongId, setSelectedSongId } = useContextProvider();

  const [musicData, setMusicData] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://cms.samespace.com/items/songs");
      const data = response.data.data;
      setTracks(data);
      const music = data.filter((item) => item.id === selectedSongId);
      setMusicData(music);
      const initialIndex = data.findIndex((item) => item.id === selectedSongId);
      setCurrentTrackIndex(initialIndex);
    };
    fetchData();
  }, [selectedSongId]);

  useEffect(() => {
    const fetchImage = async () => {
      if (musicData.length > 0) {
        const coverUrl = musicData[0].cover;
        const response = await axios.get(
          `https://cms.samespace.com/assets/${coverUrl}`,
          { responseType: "blob" },
        );
        const imageUrl = URL.createObjectURL(response.data);
        setCoverImage(imageUrl);
      }
    };

    fetchImage();
  }, [musicData]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      });
      return () => {
        audioRef.current.removeEventListener("timeupdate", () => {});
      };
    }
  }, [musicData]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = musicData[0]?.url;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.error("Playback error:", error));
      }
    }
  }, [musicData, isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((error) => console.error("Playback error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePreviousTrack = () => {
    if (tracks.length === 0) return;
    const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(newIndex);
    const newTrack = tracks[newIndex];
    setMusicData([newTrack]);
    setSelectedSongId(newTrack.id);
    setIsPlaying(true);
    setBackgroundColor(newTrack.accent);
  };

  const handleNextTrack = () => {
    if (tracks.length === 0) return;
    const newIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
    const newTrack = tracks[newIndex];
    setMusicData([newTrack]);
    setSelectedSongId(newTrack.id);
    setIsPlaying(true);
    setBackgroundColor(newTrack.accent);
  };

  return (
    <div className="musicPlayerContainer">
      <div>
        {musicData.map((item) => (
          <div key={item.id}>
            <div className="title">{item.name}</div>
            <div className="author">{item.artist}</div>
            <div className="coverImg">
              <img src={coverImage} alt="Cover" />
            </div>
            <audio ref={audioRef} />
            <div className="controls">
              <Slider
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                min={0}
                max={100}
                sx={{
                  color: "#fff",
                  "& .MuiSlider-track": {
                    backgroundColor: "#fff",
                    width: 10,
                    height: 3,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#grey",
                    height: 5,
                  },
                  "& .MuiSlider-thumb": {
                    display: "none",
                  },
                }}
              />
              <div className="buttons">
                <button className="icon-circle"><PiDotsThreeBold /></button>
                <button onClick={handlePreviousTrack}>
                  <TbPlayerTrackPrevFilled />
                </button>
                <button onClick={handlePlayPause} className="play-button">
                  {isPlaying ? <MdOutlinePause /> : <MdPlayArrow />}
                </button>
                <button onClick={handleNextTrack}>
                  <TbPlayerTrackNextFilled />
                </button>
                <button className="icon-circle"><FaVolumeUp /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
