import React from "react";
import { NavMenuIconSM } from "./NavMenuIconSM";
import { XLg } from "react-bootstrap-icons";
import { Ul } from "./Ul";
import { MAXIMUM_CONTAINER_WIDTH } from "../../constants/constants";
import { Language } from "./Language";

interface INavigationProps {
  windowWidth: number;
}

export const HNavigation: React.FC<INavigationProps> = ({ windowWidth }) => {


  return (
    <div
      style={{
        maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px`,
        zIndex: "3",
        transition: `all .2s ease`,
        borderRadius: windowWidth >= 1410 ? ".3rem" : "0",
        height: "auto",
      }}
      // data-main-wrapper={menu}
      className="container-fluid-02  position-relative bg-grey-900 ps-3 ps-sm-3 pe-2 pe-sm-2 pt-2 pt-sm-2 pb shadow-lg d-none d-sm-flex flex-column flex-sm-row justify-content-start justify-content-sm-between align-items-center main-wrapper "
    >

      <div className="d-flex justify-content-between d-sm-none w-100 align-items-center border-bottom pb-2">
        <div style={{ width: "120px" }}>
          <img className="w-100" src={`${process.env.PUBLIC_URL}/assets/hytec-06.png`} alt="logo" />
        </div>
        <NavMenuIconSM bool={true}>
          <XLg size={32} color="#000" />
        </NavMenuIconSM>
      </div>

      <Language/>
      <Ul windowWidth={windowWidth} />
    </div>
  );
};
