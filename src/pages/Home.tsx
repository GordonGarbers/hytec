import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Hero } from "../components/hero/Hero";
import { Land } from "../components/Land/Land";
import { ContactUs } from "../components/contactus/ContactUs";
import { Numbers } from "../components/numbers/Numbers";
import { Products } from "../components/products/Products";
import { YellowDetails } from "../components/yellowDetails/YellowDetails";
import { onMinMaxSave } from "../components/products/features/minMaxValues.slice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import {motion} from 'framer-motion';
import { exit } from "process";
import { transitionSpeed } from "../constants/constants";
import { scrollToSection } from "../utils/getActiveElementScrollPos";
import { setNavButton } from "../features/navButton/navButtons.slice";
import { useSpy } from "../components/mainNavigation/hooks/useSpy";
import { useLocation } from "react-router-dom";

export const Home: React.FC = () => {

  const {windowWidth} = useAppSelector((state: RootState) => state.width)
  const {state} = useLocation()
  
  const dispatch = useAppDispatch()

  useSpy(windowWidth > 620 ? -300 : -100)  

  useEffect(()=>{
    console.log('state: ', state);
    scrollToSection(state)
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
      <YellowDetails/>
      <Land />
      <Numbers />
      <ContactUs />
    </motion.div>
  );
};
