import React from "react";
import { Numbers } from "../numbers/Numbers";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ProcessText } from "../layout/ProcessText";
import { EColors } from "../../constants/constants";
import Skeleton from "react-loading-skeleton";

export const AboutUs = () => {
    const { windowWidth } = useAppSelector((state: RootState) => state.width);

    const { dataIsLoaded, data, dataError } = useAppSelector(
        (state: RootState) => state.data
      );
    return (
        <div className="container-fluid-02 position-relative" style={{zIndex: '1'}}>
          <div className="d-flex flex-column justify-content-center align-items-center">
              <div>
                <div className="text-primary fw-bold text-center">HYTEC COMPANY</div>
                <h1 style={{fontWeight:900}} className="fs-6 text-dark text-center">{data.sections.aboutus}</h1>
              </div>
              <div className="w-50">
                  {!dataIsLoaded ? (
                    <ProcessText
                      isLoaded={dataIsLoaded}
                      text={data.text.aboutus ?? ''}
                      color={EColors.skeletonBaseColorDefault}
                      size={windowWidth < 1350 ? 14 : 13}
                      textColor="text-dark-light"
                    />
                  ) : (
                    <Skeleton height={16} count={5} />
                  )}
                </div>
          </div>
            <Numbers/>
        </div>
    )
}
