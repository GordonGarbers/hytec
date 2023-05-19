import React, { RefObject, useEffect, useRef } from "react";
import { CarouselHero } from "./CarouselHero";
import "./hero.scss";

interface HeroProps {
  forwardedRef: RefObject<HTMLDivElement>;
}

export const Hero: React.FC = () => {


  return (
    
      <div id="home" className="section position-relative w-100 nav-sections">
        <CarouselHero/>
      </div>
  
  );
};
