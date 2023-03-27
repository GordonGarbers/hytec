import React from "react";
// import hytec from "../../assets/logo/hytec-logo-yellow.webp";
import { MdLocationOn } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Svg } from "./Svg";
import "./header.scss";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { MAXIMUM_CONTAINER_WIDTH } from "../../constants/constants";

export const Header: React.FC = () => {
  const {scrollY} =  useAppSelector((state:RootState) => state.scrollPos)
  return (
    <header
      style={{zIndex: "2", top:'0px'}}
      className={`bg-dark pt-2 pt-sm-2 pb-2 pb-sm-4 position-fixed w-100 position-relative`}
    >
      <div style={{zIndex:'-1', top:'0px', left:'0px', clipPath: "polygon(0% 0%, 20% 0%, 50% 100%, 0% 100%)"}} className="bg-dark-form position-absolute w-100 h-100"></div>
      <div
        style={{ maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px` }}
        className="container-fluid-02 d-flex justify-content-between align-items-center px-3 px-sm-5"
      >
        <div className="logo-header" data-mdb-animation-start="onHover">
          <Svg
            initialColor="#26272c"
            animateColor="#f7d100"
            strokeWidth={1.5}
            strokeColor = "#F7D100"
            delay = {1.5}
            delayConst = {0.2}
            duration = {1}
            repeat = {0}
          />
        </div>

        <div className="d-none d-sm-flex text-grey-800 gap-3 gap-lg-5">
          <div className="d-flex justify-content-center align-items-center fs-14 gap-1 gap-lg-2">
            <MdLocationOn size={18} />
            <div className="d-none d-md-block">
              Borgwardstrasse 6, 21423 Winsen / Luhe
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center fs-14 gap-1 gap-lg-2">
            <BsTelephoneFill size={14} />
            <div className="d-none d-md-block">+49 (0) 4171 66 911 00</div>
          </div>
          <div className="d-flex justify-content-center align-items-center fs-14 gap-1 gap-lg-2">
            <MdEmail size={16} />
            <div className="d-none d-md-block">info@hytec-baumaschinen.de</div>
          </div>
        </div>
      </div>
    </header>
  );
};
