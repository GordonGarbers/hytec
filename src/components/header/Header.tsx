import React from 'react';
// import hytec from "../../assets/logo/hytec-logo-yellow.webp";
import { MdLocationOn } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import './header.scss';

export const Header: React.FC = () => {
  return (
    <header
      style={{ top: '0px', zIndex:'1' }}
      className="bg-dark pt-2 pt-sm-2 pb-2 pb-sm-4 position-fixed w-100"
    >
      <div
        style={{ maxWidth: '1400px' }}
        className="container-fluid d-flex justify-content-between align-items-center px-3 px-sm-5"
      >

        <div
          className="logo-header"
          data-mdb-animation-start="onHover"
        >
          <img className="w-100" src="assets/hytec-05.png" alt="hytec" />
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
