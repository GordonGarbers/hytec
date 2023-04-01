import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

interface IMoverProps {
  show: number;
  ulRef: React.RefObject<HTMLUListElement>;
  btnToMove: number;
}

export const Mover: React.FC<IMoverProps> = ({ show, ulRef, btnToMove }) => {

  const [i, setI] = useState<number>(0);

  useEffect(()=>{
    setTimeout(()=>{
      setI(1)
    }, 150)
  },[])

  const width =
    ulRef.current &&
    ulRef.current.children[btnToMove].getBoundingClientRect().width;
  const height =
    ulRef.current &&
    ulRef.current.children[btnToMove].getBoundingClientRect().height;
  const x =
    ulRef.current &&
    ulRef.current.children[btnToMove].getBoundingClientRect().x;
  const y =
    ulRef.current &&
    ulRef.current.children[btnToMove].getBoundingClientRect().y + 16;
  



  return (
    <div
      //   className={`mover fw-bold text-secondary position-fixed ${show < 620 ? 'd-none' : 'd-block'} d-sm-block`}
      className={`mover fw-bold text-secondary position-fixed `}
      style={{
        zIndex: "3",
        width: `${width}px`,
        height: `${height}px`,
        left: ` ${x}px`,
        top: `${y}px`,
      }}
    ></div>
  );
};
