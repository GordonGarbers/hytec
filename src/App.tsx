import React from "react";
import "../src/sass/main.scss";
import { Header } from "./components/header/Header";
import { MainNavigation } from "./components/mainNavigation/MainNavigation";
import { Main } from "./components/main/Main";
import { Hero } from "./components/hero/Hero";
import { FlexMainWrapper } from "./components/layout/FlexMainWrapper";
import { ContactUs } from "./contactus/ContactUs";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className = ''>
      <Header />
      <MainNavigation/>
      <FlexMainWrapper>
        <Main>
          <Hero/>
          <div style = {{maxWidth:'1400px'}} className="container-fluid bg-primary my-6 py-8 rounded-1">adadads</div>
          <ContactUs/>
          <Footer/>
        </Main>
      </FlexMainWrapper>

    </div>

  );
}

export default App;
