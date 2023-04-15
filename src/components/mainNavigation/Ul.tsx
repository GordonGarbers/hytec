import React, { useEffect, useRef } from "react";
import { Li } from "./Li";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setNavButton } from "../../features/navButton/navButtons.slice";
import { Mover } from "../mover/Mover";
import { useWindowAndScrollDetection } from "../hooks/useWindowAndScrollDetection";
import { useNavigate } from "react-router-dom";

interface IUlProps {
  windowWidth: number;
}

export const Ul: React.FC<IUlProps> = ({ windowWidth }) => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );


  const navigate = useNavigate()

  const { isScrolling, isWindowChange } = useWindowAndScrollDetection();

  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);

  const ref = useRef<HTMLUListElement>(null);

  const { activeBtnValue, activeBtnName } = useAppSelector(
    (state: RootState) => state.navButtons
  );

  const dispatch = useAppDispatch();

  const onLiBtnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, btnName: string) => {
    e.preventDefault();
    dispatch(
      setNavButton({
        activeBtnValue: e.currentTarget.value,
        activeBtnName:
          e.currentTarget.textContent?.split(" ").join("").toLowerCase() ?? "",
      })
    );
    sessionStorage.setItem("btnValue", e.currentTarget.value.toString());
    sessionStorage.setItem(
      "btnName",
      e.currentTarget.textContent?.split(" ").join("").toLowerCase() ?? ""
    );
      // console.log(btnName.split(" ").join("").toLowerCase());
      navigate(btnName==="Home" || btnName==="Start" ? "/" : btnName.split(" ").join("").toLowerCase())
  };

  useEffect(() => {
    const btnValue = sessionStorage.getItem("btnValue") || activeBtnValue;
    const btnName = sessionStorage.getItem("btnName") || activeBtnName;
    dispatch(
      setNavButton({
        activeBtnValue: parseInt(btnValue as string),
        activeBtnName: btnName,
      })
    );
  }, [activeBtnValue, activeBtnName, dispatch]);

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
              func={(e) => onLiBtnClick(e, item)}
              btnValue={activeBtnValue}
              addToClassName={
                // item.split(" ").join("").toLowerCase() === activeBtnName &&
                activeBtnValue === idx && windowWidth < 620
                  ? "selected-button position-relative"
                  : ""
              }
            >
            </Li>
          );
        })}
        {windowWidth > 620 && (
          <Mover
            show={windowWidth}
            ulRef={ref}
            btnToMove={activeBtnValue}
            offest={16}
            bgColor={false}
            zIndex="3"
            expand={0}
            rounded={false}
            speed={isScrolling || isWindowChange ? 0 : 0.3}
          />
        )}
      </ul>
    </>
  );
};
