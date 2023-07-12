import React from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ESection } from "../../interfaces/interfaces";
import { CarouselUniversal } from "./CarouserlUniversal";
import { Spinner } from "../loaders/Spinner";

export const CarouselHero: React.FC = () => {

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  return (
    <>
      {
        dataIsLoaded 
        ?
          <div style={{ height: "100vh" }} className="w-100">
            <Spinner size={60} width={5} />
          </div>
          :
      <CarouselUniversal isLoaded={dataIsLoaded} data={data} error={dataError} section = {ESection.hero} useKey={true}>
      </CarouselUniversal>
      }
    </>
  )
};
