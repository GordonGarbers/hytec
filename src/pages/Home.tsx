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

export const Home: React.FC = () => {


  const dispatch = useAppDispatch()

  


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
