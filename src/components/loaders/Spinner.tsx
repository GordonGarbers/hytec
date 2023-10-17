import React from "react";
import { Centerize } from "../layout/Centerize";
import { Oval } from "react-loader-spinner";

interface ISpinnerProps {
  size: number;
  width: number;
  color?: string
}

// export const Spinner: React.FC<ISpinnerProps> = ({ size, width, color = "#f7d100" }) => {
export const Spinner: React.FC<ISpinnerProps> = ({ size, width, color = "#000" }) => {
  return (
    <Centerize>
      <Oval
        height={size}
        width={size}
        color={color}
        secondaryColor={color}
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
