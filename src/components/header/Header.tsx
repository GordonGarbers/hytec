import React, { useState } from "react";
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
  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);

  return (
    <header
      style={{ zIndex: "2", top: "0px" }}
      className={`bg-dark pt-2 pt-sm-2 pb-2 pb-sm-4 position-fixed w-100 position-relative`}
    >
      <div
        style={{
          zIndex: "-1",
          top: "0px",
          left: "0px",
          clipPath: "polygon(0% 0%, 20% 0%, 50% 100%, 0% 100%)",
        }}
        className="bg-dark-form position-absolute w-100 h-100"
      ></div>
      <div
        style={{ maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px` }}
        className="container-fluid-02 d-flex justify-content-between align-items-center ps-3 pe-4"
      >
        <div className="logo-header" data-mdb-animation-start="onHover">
          <Svg
            initialColor="#26272c"
            animateColor="#f7d100"
            strokeWidth={1.5}
            strokeColor="#F7D100"
            delay={1.5}
            delayConst={0.2}
            duration={1}
            repeat={0}
          />
        </div>

        <div className="d-none d-sm-flex gap-3 gap-lg-5 info-header-wrapper">
          <div className=" text-grey-700 d-flex justify-content-center align-items-center fs-14 gap-1 gap-lg-2">
            <MdLocationOn size={18} />
            <div className=" d-block">
              Borgwardstrasse 6, 21423 Winsen / Luhe
            </div>
          </div>

          <a
            href="tel: 041716691100"
            className={`border border-grey-300 p-2 rounded-2 text-grey-700 d-flex justify-content-center align-items-center fs-14 gap-1 gap-lg-2`}
          >
            <div>
              <BsTelephoneFill size={14} className='info-icon'/>
            </div>
            <div className="d-none d-lg-block">+49 (0) 4171 66 911 00</div>
          </a>

          <a
            href="mailto: info@hytec-baumaschinen.de"
            className={`border border-grey-300 p-2 rounded-2 text-grey-700 d-flex justify-content-center align-items-center fs-14 gap-1 gap-lg-2`}
          >
            <div>
              <MdEmail size={16} className='info-icon'/>
            </div>
            <div className="d-none d-lg-block">info@hytec-baumaschinen.de</div>
          </a>

        </div>
      </div>
    </header>
  );
};
