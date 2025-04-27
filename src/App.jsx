import React, { useState } from "react";
import NavBar from "./components/common/NavBar";
import Home from "./components/Home";

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  return <div className="mx-10">
    <NavBar setActiveTab = {setActiveTab}/>
    <Home activeTab={activeTab} setActiveTab={setActiveTab}/>
  </div>;
}
