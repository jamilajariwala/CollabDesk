import React from "react";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-[#FFFFE3] z-0 font-sans overflow-x-hidden ">
     
      <div className="fixed   inset-0 z-10  h-screen w-screen bg-[radial-gradient(gray,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-20">
          <Home />
        </div>
    </div>
  );
};

export default App;