import React from "react";
import Home from "./pages/Home";

import "./App.css";
import { ContextProvider } from "./context/Context";

const App = () => {
  return (
    <ContextProvider>
      <div className="app">
        <Home />
      </div>
    </ContextProvider>
  );
};

export default App;
