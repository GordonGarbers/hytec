import React from "react";
import { ProcessText } from "../layout/ProcessText";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { EColors } from "../../constants/constants";
import Skeleton from "react-loading-skeleton";

export const SparePartsAndTransport = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  return (
    <div
      className="container-fluid-02 d-flex p-3"
      style={{ position: "relative", zIndex: "1"}}
    >
        <div
        className="w-100 my-5 rounded-3 d-flex justify-content-center "
        style={{backgroundColor:'#fff' }}
        >

            <div className=" d-flex gap-5 align-items-start" style={{maxWidth:'700px'}}>
                <div className="m-5 w-50">
                <h1 style={{ fontWeight: "900" }}>
                    {data.rest.sparePartsTitle}
                </h1>
                {!dataIsLoaded ? (
                    <ProcessText
                    isLoaded={dataIsLoaded}
                    text={data.rest.spareParts ?? ""}
                    color={EColors.skeletonBaseColorDefault}
                    size={windowWidth < 1350 ? 13 : 13}
                    textColor="text-dark-light"
                    />
                ) : (
                    <Skeleton height={16} count={5} />
                )}
                </div>

                <div className="m-5 w-50">
                <h1 className="" style={{ fontWeight: "900" }}>
                    {data.rest.transportTitle}
                </h1>
                {!dataIsLoaded ? (
                    <ProcessText
                    isLoaded={dataIsLoaded}
                    text={data.rest.transport ?? ""}
                    color={EColors.skeletonBaseColorDefault}
                    size={windowWidth < 1350 ? 13 : 13}
                    textColor="text-dark-light"
                    />
                ) : (
                    <Skeleton height={16} count={5} />
                )}
                </div>
            </div>
        </div>
    </div>
  );
};
