import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { wrap } from "@popmotion/popcorn";
import { CarouselInner } from "../hero/CarouselUniversalInner";
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
}) => {
  const dispatch = useAppDispatch();

  const { pauseAnim } = useAppSelector((state: RootState) => state.pause);

  const arrowUpPressed = useKeyPress("ArrowLeft");
  const arrowDownPressed = useKeyPress("ArrowRight");
  const keyPPressed = useKeyPress("KeyP");

  const [[page, direction], setPage] = useState([0, 1]);
  const detailIndex: number = wrap(0, data[section].length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const [seconds, setSeconds] = useState<number>(TIME);
  const remap = Math.trunc((seconds / TIME) * 100);

  useEffect(() => {
    if (arrowUpPressed) {
      setSeconds(TIME);
      paginate(-1);
      dispatch(pauseCarousel(true));
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      setSeconds(TIME);
      paginate(1);
      dispatch(pauseCarousel(true));
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (keyPPressed) {
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
      {btnOnOff && (
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
      )}

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
              setSeconds(TIME);
              dispatch(pauseCarousel(true));
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {/* OVO JE UNIVERZALNO */}
            
            <CarouselInner
              data={data}
              section={section}
              index={detailIndex}
              isDataLoaded={isLoaded}
              remap={remap}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
