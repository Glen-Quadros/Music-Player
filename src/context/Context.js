import React, { createContext, useState, useContext, useEffect } from 'react';

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", backgroundColor);
  }, [backgroundColor]);

  return (
    <Context.Provider value={{ backgroundColor, setBackgroundColor, selectedSongId, setSelectedSongId }}>
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => useContext(Context);
