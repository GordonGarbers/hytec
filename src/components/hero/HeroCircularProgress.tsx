import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { BsPlayFill } from "react-icons/bs";
import { BsPauseFill } from "react-icons/bs";
import { pauseCarousel } from "../../features/pauseHeroPage/pauseHeroPage";

interface ICircularProgressProps {
  remap: number;
}

const style = {
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: '3'
};

export const HeroCircularProgress: React.FC<ICircularProgressProps> = ({
  remap,
}) => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const { pauseAnim } = useAppSelector((state: RootState) => state.pause);

  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        width: windowWidth < 960 ? "35px" : "50px",
        height: windowWidth < 960 ? "35px" : "50px",
        bottom: windowWidth < 960 ? "10px" : "20px",
        right: windowWidth < 960 ? "10px" : "50px",
        zIndex: "2",
      }}
      // className="position-absolute"
      className=""
    >
      <CircularProgressbar
        value={remap}
        strokeWidth={5}
        // text={`${seconds/1000} s`}
        styles={buildStyles({
          strokeLinecap: "butt",
          rotation: 0,
          pathTransitionDuration: remap <= 1 ? 0.1 : 0.1,
          // pathColor: `rgba(247, 209, 0, ${remap / 100})`,
          pathColor: "#fff",
          // textColor: '#f88',
          trailColor: "rgba(255,255,255,.3)",
          // backgroundColor: '#eee',
        })}
      />
      <div
        role="button"
        onClick={() => dispatch(pauseCarousel(!pauseAnim))}
        style={{ width: "20px", height: "20px", ...style }}
        className="position-absolute position-relative"
      >
        {!pauseAnim ? (
          <BsPlayFill
            color={"#fff"}
            style={{ width: "100%", height: "100%", ...style }}
            className="position-absolute"
          />
        ) : (
          <BsPauseFill
            color={"#fff"}
            style={{ width: "100%", height: "100%", ...style }}
            className="position-absolute"
          />
        )}
      </div>
    </div>
  );
};
