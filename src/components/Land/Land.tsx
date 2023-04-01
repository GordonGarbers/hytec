import React, { useEffect, useRef, useState } from "react";
import { logoPos } from "../../constants/constants";
import { logoPosType } from "../../constants/constants";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getImageRatio } from "../../utils/createImagePlaceholder";
import { Spinner } from "../spinner/Spinner";
import Tilt from "react-parallax-tilt";
import Skeleton from "react-loading-skeleton";
import { PrimaryButton } from "../primaryButton/PrimaryButton";

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
      <div className="container-fluid-02 d-flex w-100 align-items-center">
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
        <div className="ms-3 article-left-left w-100 px-8">
          <h1 className="fw-bold fs-5">
            {!dataIsLoaded ? (
              <>
                Became a <span className="text-primary">dealer</span>
              </>
            ) : (
              <Skeleton count={1} />
            )}
          </h1>
          <p style={{ tabSize: "5" }} className="mt-3 mt-sm-4 fs-13">
            {!dataIsLoaded ? (
              `Are you interested in becoming a dealer for our heavy machinery products? We're looking for dedicated individuals or companies who are passionate about construction and heavy equipment. As a dealer, you'll have access to our full range of high-quality products, competitive pricing, and comprehensive support. Join us and help us bring the best in heavy machinery to customers worldwide. Contact us today to learn more about this exciting opportunity.`
            ) : (
              <Skeleton count={4} />
            )}
          </p>
          <div>
            {!dataIsLoaded ? (
              <PrimaryButton>Apply now</PrimaryButton>
            ) : (
              <Skeleton width={100} height={40} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
