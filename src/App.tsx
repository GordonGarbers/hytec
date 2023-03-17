import React from "react";
import "../src/sass/main.scss";
import { Header } from "./components/header/Header";
import { Navigation } from "./components/navigation/Navigation";
import { Main } from "./components/main/Main";
import { Hero } from "./components/hero/Hero";

function App() {
  return (
    <div className = ''>
      <Header />
      <Navigation/>
      <Main>
        <Hero/>
        <div style = {{height:'2000px', maxWidth:'1400px'}} className="container-fluid bg-grey-900 mt-5"></div>
      </Main>

    </div>

  );
}

export default App;
