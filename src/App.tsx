import React from "react";
import "../src/sass/main.scss";
import { Header } from "./components/header/Header";
import { MainNavigation } from "./components/mainNavigation/MainNavigation";
import { Main } from "./components/main/Main";
import { Hero } from "./components/hero/Hero";

function App() {
  return (
    <div className = ''>
      <Header />
      <MainNavigation/>
      <Main>
        <Hero/>
        <div style = {{height:'2000px', maxWidth:'1400px'}} className="container-fluid bg-primary mt-5 rounded-2"></div>
      </Main>

    </div>

  );
}

export default App;
