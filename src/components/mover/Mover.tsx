import React, { useState, useEffect, useLayoutEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { EColors } from "../../constants/constants";

interface IMoverProps {
  show?: number;
  ulRef: React.RefObject<HTMLUListElement>;
  btnToMove: number;
  offest: number;
  bgColor: boolean;
  zIndex: string;
  expand:number;
  rounded: boolean;
  speed: number;
}

export const Mover: React.FC<IMoverProps> = ({ show, ulRef, btnToMove, offest, bgColor, zIndex, expand, rounded, speed}) => {


  const [i, setI] = useState<number>(0);

  useEffect(()=>{
    setTimeout(()=>{
      setI(1)
    }, 150)
  },[])


    const width =
      ulRef.current &&
      ulRef.current.children[btnToMove].getBoundingClientRect().width + expand;

    const height =
      ulRef.current &&
      ulRef.current.children[btnToMove].getBoundingClientRect().height + expand;

    const x =
      ulRef.current &&
      ulRef.current.children[btnToMove].getBoundingClientRect().x - expand/2;

    const y =
      ulRef.current &&
      ulRef.current.children[btnToMove].getBoundingClientRect().y+offest-expand/2;

  



  return (
    <div
      className={`mover fw-bold text-secondary position-fixed ${bgColor&&'bg-primary'} ${rounded ? 'rounded-4' : 'rounded-0'}`}
      style={{
        zIndex: zIndex,
        width: `${width}px`,
        height: `${height}px`,
        left: ` ${x}px`,
        top: `${y}px`,
        borderBottom: `5px solid ${EColors.primary}`,
        transition: `all ${speed}s ease`
      }}
    ></div>

  );
};
