import React, { useEffect, useState } from "react";
import { NavMenuIconSM } from "./NavMenuIconSM";
import { XLg } from "react-bootstrap-icons";
import { Ul } from "./Ul";
import { MAXIMUM_CONTAINER_WIDTH } from "../../constants/constants";
import { Language } from "./Language";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useSpy } from "./hooks/useSpy";

interface INavigationProps {
  windowWidth: number;
}

export const HNavigation: React.FC<INavigationProps> = ({ windowWidth }) => {


  useSpy(-300);

  return (
    <div
      style={{
        maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px`,
        zIndex: "3",
        transition: `all .2s ease`,
        borderRadius: windowWidth >= 1410 ? ".3rem" : "0",
        height: "auto",
        
        // backgroundColor:'rgba(255,255,255,.6)',
        // backdropFilter: 'blur(20px)',
        // border: '1px solid rgba(255,255,255,.1)'
      }}
      // data-main-wrapper={menu}
      className="container-fluid-02 bg-grey-900 position-relative ps-3 ps-sm-3 pe-2 pe-sm-2 shadow-lg py-2 d-none d-sm-flex flex-column flex-sm-row justify-content-start justify-content-sm-between align-items-center main-wrapper "
    >
      <Language />
      <Ul windowWidth={windowWidth} />
    </div>
  );
};
