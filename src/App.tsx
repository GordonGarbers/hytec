import React, { useEffect, useState } from "react";
import "../src/sass/main.scss";
import { Header } from "./components/header/Header";
import { MainNavigation } from "./components/mainNavigation/MainNavigation";
import { Main } from "./components/main/Main";
import { Hero } from "./components/hero/Hero";
import { FlexMainWrapper } from "./components/layout/FlexMainWrapper";
import { ContactUs } from "./components/contactus/ContactUs";
import { Footer } from "./components/footer/Footer";
import { Numbers } from "./components/numbers/Numbers";
import { Land } from "./components/Land/Land";
import { heroDetailsPedding } from "./features/heroDetails/heroDetails.slice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { switchLanguage } from "./features/changeLanguage/changeLanguage.slice";
import { RootState } from "./app/store";


function App() {
  const {language} = useAppSelector((state:RootState) => state.lang)
  const dispatch = useAppDispatch();


  useEffect(() => {
    const storedSelectedOption = sessionStorage.getItem('selectedOption') || 'en'
    dispatch(switchLanguage(storedSelectedOption))
  }, [])


  useEffect(() => {
    dispatch(heroDetailsPedding(`json/${language}/data.json`));
  }, [dispatch, language]);



  return (
    <div className = ''>
      <Header />
      <MainNavigation/>
      <FlexMainWrapper>
        <Main>
          <Hero/>
          {/* <div style = {{maxWidth:'1400px'}} className="container-fluid bg-primary mt-6 rounded-1">adadads</div> */}
          <Land/>
          <Numbers/>
          <ContactUs/>
          <Footer/>
        </Main>
      </FlexMainWrapper>

    </div>

  );
}

export default App;
