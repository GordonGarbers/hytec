import React from "react";
import { Centerize } from "../layout/Centerize";
import { Oval } from "react-loader-spinner";

interface ISpinnerProps {
  size: number;
  width: number;
}

export const Spinner: React.FC<ISpinnerProps> = ({ size, width }) => {
  return (
    <Centerize>
      <Oval
        height={size}
        width={size}
        color="#f7d100"
        secondaryColor="#f7d100"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        strokeWidth={width}
        strokeWidthSecondary={width}
      />
    </Centerize>
  );
};
