import React, { useEffect, useRef, useState } from "react";
import { logoPos } from "../../constants/constants";
import { logoPosType } from "../../constants/constants";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useImagePlaceholder } from "../hooks/useImagePlaceholder";
import { getImageRatio } from "../../utils/createImagePlaceholder";
import { Spinner } from "../spinner/Spinner";

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
// 2392, 3198
export const Land: React.FC = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const imgPlaceholder = useImagePlaceholder(width, height);
  console.log("------", imgPlaceholder);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleImageOnLoad = () => {
    setIsLoaded(true);
    setWidth(2392);
    setHeight(3198);
  };

  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  const ref = useRef<HTMLDivElement>(null);

  //   useEffect(()=>{
  //       console.log(ref.current?.getBoundingClientRect().y);
  //   },[])

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
        style={{ width: "110px", top: `${item.x}%`, left: `${item.y}%` }}
        className="position-absolute"
      >
        <img
          onLoad={handleImageOnLoad}
          style={{ width: "100%" }}
          className="bg-dark-light border border-1 border-grey-400 p-2 rounded-2 shadow"
          src="assets/hytec-05.png"
          alt="hytec-logo"
        />
      </motion.div>
    );
  });

  return (
    <div style={{ backgroundColor: "#fff" }} className="mt-6 py-6">
      <div className="container-fluid-02">
        <div
          ref={ref}
          style={{ maxWidth: "600px" }}
          className="position-relative"
        >
          <img
            style={{ width: "100%" }}
            src={isLoaded ? "assets/png/DE_01.png" : getImageRatio(2392, 3198)}
            alt="DE-map"
          />
          {logoPosElements}
          {!isLoaded ? <Spinner size={100} width={3}/> : <div></div>}
        </div>
      </div>
    </div>
  );
};
