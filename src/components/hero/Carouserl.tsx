import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IHeroDetails } from "../../interfaces/interfaces";
import { wrap } from "@popmotion/popcorn";
import { Article } from "./Article";
import { ArrowButtons } from "./ArrowButtons";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { MdOutlineSwipe } from "react-icons/md";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

import { useKeyPress } from "./hooks/useKeyPress";

const xOffset = 100;
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? `${xOffset}%` : `${-xOffset}%`,
      opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? `${xOffset}%` : `${-xOffset}%`,
      opacity: 1,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Carousel: React.FC = () => {

  const arrowUpPressed = useKeyPress("ArrowLeft");
  const arrowDownPressed = useKeyPress("ArrowRight");


  const { heroDetailsIsLoaded, heroDetailsData, heroDetailsError } =
    useAppSelector((state: RootState) => state.heroDetails);

  const [[page, direction], setPage] = useState([0, 0]);
  const detailIndex: number = wrap(0, heroDetailsData.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  console.log('DIRECTION: ', direction);

  useEffect(() => {
    if (arrowUpPressed) {
      paginate(-1);
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      paginate(1);
    }
  }, [arrowDownPressed]);

  useEffect(()=>{
    const caruselInterval = setInterval(()=>{
      paginate(direction)
    }, 3000)
    return () => clearInterval(caruselInterval)
  },[paginate])

  return (
    <>
      <div className="buttons-wrapper">
        <ArrowButtons
          paginate={paginate}
          direction={-1}
          addClass="btn-left"
          directionTrigger={direction}
        >
          <ChevronLeft size={24} />
        </ArrowButtons>

        <ArrowButtons
          paginate={paginate}
          direction={1}
          addClass="btn-right"
          directionTrigger={direction}
        >
          <ChevronRight size={24} />
        </ArrowButtons>
      </div>
      <div className="carusel-mask w-100 h-100 position-relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            style={{}}
            className="page-wrapper-anim w-100 h-100 d-block d-lg-flex position-absolute"
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.5 },
              opacity: { duration: 0.5 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Article
              data={heroDetailsData}
              index={detailIndex}
              isHeroDataLoaded={heroDetailsIsLoaded}
            />
          </motion.div>
        </AnimatePresence>

        {/* <motion.div className="position-absolute swipe d-flex justify-content-center border border-1 border-grey-700 align-items-center gap-3 p-2 rounded-2 shadow-lg text-dark">
          <MdOutlineSwipe size={24} />
          <div className="fs-13">swipe left / right</div>
        </motion.div> */}
      </div>
    </>
  );
};
