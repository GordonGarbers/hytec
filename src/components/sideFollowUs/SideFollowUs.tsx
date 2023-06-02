import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { EColors } from "../../constants/constants";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";


export const SideFollowUs = () => {
  return (
    <div
      style={{ zIndex: "3"}}
      className="d-flex flex-row align-items-center gap-3 pt-2 pb-6 rounded-2"
    >
        <div className="fs-13 fw-bold " >Follow Us on</div>
      <HiOutlineArrowNarrowUp size={24} style={{transform:'rotate(90deg)'}}/>
      <a
        className="text-grey-600"
        href="https://www.facebook.com/HytecBaumaschinen/"
      >
        <BsFacebook size={20} color={EColors.darkForm} />
      </a>
      <a
        className="text-grey-600"
        href="https://www.instagram.com/hytec_baumaschinen/"
      >
        <AiFillInstagram size={22} color={EColors.darkForm} />
      </a>
      <a
        className="text-grey-600"
        href="https://www.youtube.com/watch?v=CJW59TkI1ic"
      >
        <FaYoutube size={22} color={EColors.darkForm} />
      </a>
    </div>
  );
};
