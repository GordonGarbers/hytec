import React, { useEffect, useRef, useState } from "react";
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
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);

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
    sessionStorage.setItem("btnValue", e.currentTarget.value.toString());
    sessionStorage.setItem("btnName", e.currentTarget.textContent?.split(" ").join("").toLowerCase()??"");
  };

  useEffect(() => {
    const btnValue = sessionStorage.getItem("btnValue") || activeBtnValue;
    const btnName = sessionStorage.getItem("btnName") || activeBtnName;
    dispatch(
      setNavButton({
        activeBtnValue: parseInt(btnValue as string),
        activeBtnName: btnName
      })
    );
  }, [activeBtnValue, activeBtnName, dispatch]);

  // console.log('Active btn name: ', typeof activeBtnValue);

  return (
    <>
      <ul
        ref={ref}
        className=" text-secondary mt-7 mt-sm-1 list-unstyled d-flex flex-column align-items-start flex-sm-row gap-4 gap-sm-6 px-3 pb-0"
      >
        {data.nav.map((item: string, idx: number) => {
          // console.log('Prvi broj: ', activeBtnValue as number, 'Drugi broj: ', idx, typeof activeBtnValue, typeof idx);
          return (
            <Li
              key={idx}
              btnName={item}
              value={idx}
              data={false}
              func={onLiBtnClick}
              addToClassName={
                // item.split(" ").join("").toLowerCase() === activeBtnName &&
                activeBtnValue === idx &&
                windowWidth < 620
                  ? "selected-button"
                  : ""
              }
            />
          );
        })}
        {windowWidth > 620 && (
          <Mover show={windowWidth} ulRef={ref} btnToMove={activeBtnValue} />
        )}
      </ul>
    </>
  );
};
