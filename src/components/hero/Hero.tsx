import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { heroDetailsPedding } from "../../features/heroDetails/heroDetails.slice";
import { Carousel } from "./Carouserl";
import "./hero.scss";

export const Hero: React.FC = () => {
 


  return (
    <>
      <section className="section position-relative w-100">
        <Carousel/>
      </section>
    </>
  );
};
