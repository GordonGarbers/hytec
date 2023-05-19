import { motion } from "framer-motion";
import React from "react";
import { EColors } from "../../constants/constants";
import { NavLink } from "react-router-dom";
import {Link} from 'react-scroll';


interface ILiProps {
  children: React.ReactNode;
  idName: string,
  btnValue: number;
  btnName: string;
  value: number;
  data: boolean;
  func: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  // func: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  addToClassName: string;
}

export const Li: React.FC<ILiProps> = ({
  btnName,
  value,
  data,
  func,
  addToClassName,
  idName
}) => {


  // useEffect(()=>{
    //   scrollDown()
    // },[])


  return (
    <li
      onClick={(e) => func(e)}
      style={{transition:'all .5s ease'}}
      role="button"
      id={`${idName}`}
      className={`${addToClassName} d-flex justify-content-center align-items-center text-capitalize position-relative rounded-2`}
      data-add-btn={data}
      value={value}
    >
      {/* <Link to={idName} smooth={true} offset={-50} duration={0}>{btnName}</Link> */}
      {btnName}
    </li>
  );
};
