import React from "react";
import { Numbers } from "../numbers/Numbers";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

export const AboutUs = () => {
    const { dataIsLoaded, data, dataError } = useAppSelector(
        (state: RootState) => state.data
      );
    return (
        <div className="container-fluid-02 position-relative" style={{zIndex: '1'}}>
            <div className="text-primary fw-bold text-center">HYTEC COMPANY</div>
            <h1 style={{fontWeight:900}} className="fs-6 text-dark text-center">{data.sections.aboutus}</h1>
            <Numbers/>
        </div>
    )
}
