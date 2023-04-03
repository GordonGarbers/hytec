import React, { useEffect, useRef, useState } from "react";
import { logoPos } from "../../constants/constants";
import { logoPosType } from "../../constants/constants";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getImageRatio } from "../../utils/createImagePlaceholder";
import { Spinner } from "../loaders/Spinner";
import Tilt from "react-parallax-tilt";
import Skeleton from "react-loading-skeleton";
import { PrimaryButton } from "../primaryButton/PrimaryButton";
import { ProcessText } from "../layout/ProcessText";

const variants = {
  from: {
    scale: 0.5,
    opacity: 0,
  },
  to: {
    scale: 1,
    opacity: 1,
  },
};

export const Land: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const handleImageOnLoad = () => {
    setIsImgLoaded(true);
  };

  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  const ref = useRef<HTMLDivElement>(null);

  const logoPosElements = logoPos.map((item: logoPosType, idx: number) => {
    return (
      <motion.div
        variants={variants}
        initial="from"
        whileInView="to"
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          delay: scrollY > 400 ? 0.1 * idx : 0,
          type: "spring",
          stiffness: 100,
        }}
        key={idx}
        style={{
          maxWidth: windowWidth <= 620 ? "90px" : "110px",
          top: `${item.x}%`,
          left: `${item.y}%`,
        }}
        className="position-absolute"
      >
        <img
          style={{ width: "100%" }}
          className="bg-dark-light border border-1 border-grey-400 p-2 rounded-2 shadow"
          src="assets/hytec-05.png"
          alt="hytec-logo"
        />
      </motion.div>
    );
  });

  return (
    <div style={{ backgroundColor: "#fff" }} className="mt-6 py-6 w-100 h-100">
      <div className="container-fluid-02 d-flex flex-column flex-lg-row w-100 align-items-center">
        <div
          ref={ref}
          style={{ maxWidth: "600px" }}
          className="position-relative w-100"
        >
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} perspective={1000}>
            <div className="w-100 h-100">
              <img
                onLoad={handleImageOnLoad}
                style={{ width: "100%", filter: "brightness(150%)" }}
                src={
                  isImgLoaded
                    ? "assets/png/DE_01.png"
                    : getImageRatio(2392, 3198)
                }
                alt="DE-map"
              />
            </div>

            {!isImgLoaded ? <Spinner size={50} width={8} /> : logoPosElements}
          </Tilt>
        </div>
        <div className="article-left-left w-100 px-4 px-sm-6 px-lg-8 mt-5 mt-lg-0">
          <h1 className="fw-bold fs-5">
            {!dataIsLoaded ? (
              <>
                {data.dealer?.titleNormalBefore}{" "}
                <span className="text-primary">{data.dealer?.titleAccent}</span>{" "}
                {data.dealer?.titleNormalAfter}
              </>
            ) : (
              <Skeleton count={1} />
            )}
          </h1>
          <ProcessText isLoaded={dataIsLoaded} text={data.dealer?.text??""} />

          <div>
            {!dataIsLoaded ? (
              <PrimaryButton>{data.buttons.apply}</PrimaryButton>
            ) : (
              <Skeleton width={100} height={40} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
