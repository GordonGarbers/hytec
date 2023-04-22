import React, { RefObject, useEffect, useRef } from "react";
import { CarouselHero } from "./CarouselHero";
import "./hero.scss";

interface HeroProps {
  forwardedRef: RefObject<HTMLDivElement>;
}

// export const Hero: React.FC = React.forwardRef<HTMLDivElement, HeroProps>((props, ref)) => {
 
//   return (
//     <>
//       <section className="section position-relative w-100" ref={ref}>
//         <CarouselHero/>
//       </section>
//     </>
//   );
// };

export const Hero: React.FC<HeroProps> = ({forwardedRef}) => {


  return (
    
      <div className="section position-relative w-100" ref={forwardedRef}>
        <CarouselHero/>
      </div>
  
  );
};
