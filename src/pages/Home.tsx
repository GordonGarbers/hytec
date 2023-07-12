import React, { useEffect } from "react";
import { Hero } from "../components/hero/Hero";
import { Land } from "../components/Land/Land";
import { ContactUs } from "../components/contactus/ContactUs";
import { Products } from "../components/products/Products";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import {motion} from 'framer-motion';
import { transitionSpeed } from "../constants/constants";
import { scrollToSection } from "../utils/getActiveElementScrollPos";
import { useSpy } from "../components/mainNavigation/hooks/useSpy";
import { useLocation } from "react-router-dom";
import { AboutUs } from "../components/aboutus/AboutUs";
import { onMainMenuShowHide } from "../components/products/features/hideShowMainMenu.slice";

export const Home: React.FC = () => {

  const {windowWidth} = useAppSelector((state: RootState) => state.width)
  const {state} = useLocation()
  
  const dispatch = useAppDispatch()

  useSpy(windowWidth > 620 ? -300 : -100)  

  useEffect(()=>{
    scrollToSection(state?.section)
    dispatch(onMainMenuShowHide(false))
  },[])


  return (
    <motion.div
      animate={{opacity:1}}
      initial={{opacity:0}}
      exit = {{opacity:0}}
      transition={{ duration:`${transitionSpeed}`}}
      >
      <Hero/>
      <Products/>
      <AboutUs/>
      <Land />
      <ContactUs />
    </motion.div>
  );
};
