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

export const Home: React.FC = () => {

  const dispatch = useAppDispatch()



  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function(event) { 
      const scrollpos = localStorage.getItem('scrollpos');
      if (scrollpos) window.scrollTo(0, parseInt(scrollpos));
  });

  window.onbeforeunload = function(e) {
      localStorage.setItem('scrollpos', window.scrollY.toString());
  };
  }, []);



  // const scrollDown = () => {
  //   window.scrollTo({
  //     top:0,
  //     behavior: "smooth"
  //   });
  // };

  // useEffect(()=>{
    //   scrollDown()
    // },[])
    
    const heroRef = useRef<HTMLDivElement>(null);
    const yellowDetailsRef = useRef<HTMLDivElement>(null);

  // const productsRef = useRef<HTMLDivElement>(null);

  const scrollToRef = () => {
    if (yellowDetailsRef.current) {
      window.scrollTo({
        top: yellowDetailsRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  };



  // useEffect(()=>{
  //   if(yellowDetailsRef.current){

  //     console.log(yellowDetailsRef.current.offsetTop);
  //     scrollToRef();
  //   }
  // },[])

  return (
    <>
      {/* <div ref={heroRef} className="bg-primary">Jox</div> */}
      <Hero forwardedRef={heroRef}/>
      <Products/>
      <YellowDetails forwardedRef={yellowDetailsRef}/>
      <Land />
      <Numbers />
      <ContactUs />
    </>
  );
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

