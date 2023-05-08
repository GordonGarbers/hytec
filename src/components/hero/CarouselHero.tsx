import React from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ESection } from "../../interfaces/interfaces";
import { CarouselUniversal } from "./CarouserlUniversal";

export const CarouselHero: React.FC = () => {

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  
  return (
    <>
      <CarouselUniversal isLoaded={dataIsLoaded} data={data} error={dataError} section = {ESection.hero} useKey={true}>
      </CarouselUniversal>
    </>
  )
};
