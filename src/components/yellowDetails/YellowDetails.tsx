import React, { RefObject } from "react";
import { SideFollowUs } from "../sideFollowUs/SideFollowUs";

interface IYellowDetailsProps {
  forwardedRef: RefObject<HTMLDivElement>;
}

export const YellowDetails: React.FC<IYellowDetailsProps> = ({
  forwardedRef,
}) => {
  return (
    <div
      ref={forwardedRef}
      style={{ maxWidth: "1400px", zIndex: "0" }}
      className="container-fluid bg-primary my-6 py-6 rounded-1 position-relative overflow-hidden"
    >
      <div
        style={{
          left: "0px",
          top: "0px",
          clipPath: "polygon(60% 100%, 100% 100%, 100% 0%, 65% 0%)",
        }}
        className="bg-primary-mono w-100 h-100 position-absolute"
      ></div>
      <SideFollowUs />
    </div>
  );
};
