import { motion } from "framer-motion";
import React from "react";
import { EColors } from "../../constants/constants";
import { NavLink } from "react-router-dom";

interface ILiProps {
  children: React.ReactNode;
  btnValue: number;
  btnName: string;
  value: number;
  data: boolean;
  func: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  addToClassName: string;
}

export const Li: React.FC<ILiProps> = ({
  btnName,
  value,
  data,
  func,
  addToClassName,

}) => {


  return (
    <li
      onClick={(e) => func(e)}
      role="button"
      className={`${addToClassName} d-flex justify-content-center align-items-center text-capitalize position-relative `}
      data-add-btn={data}
      value={value}
    >
      <div >{btnName}</div>
    </li>
  );
};
