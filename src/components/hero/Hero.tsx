import React from "react";
import { CarouselHero } from "./CarouselHero";
import "./hero.scss";

export const Hero: React.FC = () => {
 
  return (
    <>
      <section className="section position-relative w-100">
        <CarouselHero/>
      </section>
    </>
  );
};
