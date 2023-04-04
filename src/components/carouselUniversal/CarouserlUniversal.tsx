import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { wrap } from "@popmotion/popcorn";
import { CarouselUniversalInner } from "./CarouselUniversalInner";
import { ArrowButtons } from "../hero/ArrowButtons";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { pauseCarousel } from "../../features/pauseHeroPage/pauseHeroPage";
import { RootState } from "../../app/store";
import { useKeyPress } from "../hooks/useKeyPress";
import { ESection, IDataDetails } from "../../interfaces/interfaces";
import { TIME } from "../../constants/constants";

interface ICarouselUniversal {
  isLoaded: boolean;
  data: IDataDetails;
  error: string;
  section: ESection;
  children: React.ReactNode;
  btnOnOff: boolean;
  useKey: boolean;
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

export const CarouselUniversal: React.FC<ICarouselUniversal> = ({
  isLoaded,
  data,
  error,
  section,
  children,
  btnOnOff,
  useKey,
}) => {
  const dispatch = useAppDispatch();

  const { pauseAnim } = useAppSelector((state: RootState) => state.pause);

  const arrowUpPressed = useKeyPress("ArrowLeft");
  const arrowDownPressed = useKeyPress("ArrowRight");
  const keyPPressed = useKeyPress("KeyP");

  const [[page, direction], setPage] = useState([0, 1]);
  const index: number = wrap(0, data[section].length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const [seconds, setSeconds] = useState<number>(TIME);
  const remap = Math.trunc((seconds / TIME) * 100);

  const handleClick = () => {
    setSeconds(TIME);
    dispatch(pauseCarousel(true));
  };

  useEffect(() => {
    if (arrowUpPressed && useKey) {
      setSeconds(TIME);
      paginate(-1);
      dispatch(pauseCarousel(true));
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed && useKey) {
      setSeconds(TIME);
      paginate(1);
      dispatch(pauseCarousel(true));
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (keyPPressed && useKey) {
      dispatch(pauseCarousel(!pauseAnim));
    }
  }, [keyPPressed]);

  const interval: any = useRef(null);

  const runInterval = useCallback(() => {
    interval.current = setInterval(() => {
      setSeconds((seconds) => seconds - 100);
      if (seconds <= 0) {
        paginate(direction);
        setSeconds(TIME);
      }
    }, 100);
  }, [seconds]);

  const pauseInterval = useCallback(() => {
    clearInterval(interval.current);
  }, []);

  const resetInterval = useCallback(() => {
    clearInterval(interval.current);
  }, []);

  useEffect(() => {
    runInterval();

    return () => {
      resetInterval();
    };
  }, [seconds]);

  useEffect(() => {
    dispatch(pauseCarousel(true));
  }, []);

  useEffect(() => {
    pauseAnim ? runInterval() : pauseInterval();
  }, [pauseAnim]);

  return (
    <>
      <div className="carusel-mask w-100 h-100 position-relative">
        {/* <div style={{clipPath: 'polygon(0% 10%, 40% 10%, 100% 100%, 100% 0%, 0% 0%)'}}className="w-100 h-100 bg-primary position-absolute"></div> */}

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
              setSeconds(TIME);
              dispatch(pauseCarousel(true));
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <CarouselUniversalInner
              data={data}
              index={index}
              section={section}
              isDataLoaded={isLoaded}
              remap={remap}
              direction={direction}
              paginate={paginate}
              btnOnOff={btnOnOff}
              handleClick={handleClick}
            ></CarouselUniversalInner>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
