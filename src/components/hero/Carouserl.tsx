import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { IHeroDetails } from "../../interfaces/interfaces";
import { wrap } from "@popmotion/popcorn";
import { Article } from "./Article";
import { ArrowButtons } from "./ArrowButtons";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

interface ICarouselProps {
  heroDetails: IHeroDetails[];
}

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

export const Carousel: React.FC<ICarouselProps> = ({ heroDetails }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const detailIndex: number = wrap(0, heroDetails.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <>
      <div className="buttons-wrapper">
        <ArrowButtons paginate={paginate} direction={-1} addClass="btn-left">
          <ChevronLeft size={20} />
        </ArrowButtons>

        <ArrowButtons paginate={paginate} direction={1} addClass="btn-right">
          <ChevronRight size={20} />
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
            <Article data={heroDetails} index={detailIndex} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
