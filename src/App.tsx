import React from "react";
import "../src/sass/main.scss";
import { Header } from "./components/header/Header";
import { Navigation } from "./components/navigation/Navigation";

function App() {
  return (
    <div className = ''>
      <Header />
      <Navigation/>
    </div>

  );
}

export default App;
