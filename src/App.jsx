import React, { useState } from "react";
import Navbar from "./components/header/Navbar";
import Body from "./components/MainBoard/MainBoard_Body";

function App() {
  const [filter, setFilter] = useState("all"); // Lift filter state to App

  return (
    <div>
      <Navbar />
      <Body filter={filter} setFilter={setFilter} /> {/* Pass filter as a prop */}
    </div>
  );
}

export default App;
