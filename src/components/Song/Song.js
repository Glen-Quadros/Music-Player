import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Song.css";

const Song = ({ data, cover, isSelected, onClick }) => {
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const fetchCoverImage = async () => {
      const response = await axios.get(cover, { responseType: "blob" });
      const imageUrl = URL.createObjectURL(response.data);
      setCoverImage(imageUrl);
    };
    fetchCoverImage();
  }, [cover]);

  return (
    <div className={`songs ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <div className="song">
        <div className="coverImage">
          <img src={coverImage} alt={data.name} />
        </div>
        <div>
          <div className="musicName">{data.name}</div>
          <div className="musicArtist">{data.artist}</div>
        </div>
      </div>
      <div className="timeStamp">
        <p>4.16</p>
      </div>
    </div>
  );
};

export default Song;
