import React, { useRef, useState } from "react";
import { navButtons } from "../../constants/constants";
import { Li } from "./Li";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setNavButton } from "../../features/navButton/navButtons.slice";
import { Mover } from "../mover/Mover";

interface IUlProps {
  windowWidth: number;
}

export const Ul: React.FC<IUlProps> = ({ windowWidth }) => {

  const ref = useRef<HTMLUListElement>(null);

  const { activeBtnValue, activeBtnName } = useAppSelector(
    (state: RootState) => state.navButtons
  );
  const dispatch = useAppDispatch();

  const onLiBtnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(
      setNavButton({
        activeBtnValue: e.currentTarget.value,
        activeBtnName:
          e.currentTarget.textContent?.split(" ").join("").toLowerCase() ?? "",
      })
    );
  };

  return (
    <>
      <ul
        ref={ref}
        className=" text-secondary mt-7 mt-sm-1 list-unstyled d-flex flex-column align-items-start flex-sm-row gap-4 gap-sm-6 px-3 pb-0"
      >
        {navButtons.map((item: string, idx: number) => {
          return (
            <Li
              key={idx}
              btnName={item}
              value={idx}
              data={false}
              func={onLiBtnClick}
              addToClassName={
                item.split(" ").join("").toLowerCase() === activeBtnName &&
                windowWidth < 620
                  ? "selected-button"
                  : ""
              }
            />
          );
        })}
      </ul>
      <Mover show={windowWidth} ulRef={ref} btnToMove={activeBtnValue} />
    </>
  );
};
