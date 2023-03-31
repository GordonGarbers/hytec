import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { wrap } from "@popmotion/popcorn";
import { Article } from "./Article";
import { ArrowButtons } from "./ArrowButtons";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { pauseHero } from "../../features/pauseHeroPage/pauseHeroPage";
import { RootState } from "../../app/store";
import { ESection } from "../../interfaces/interfaces";

import { HeroCircularProgress } from "./HeroCircularProgress";

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
  const time = 6000;

  const dispatch = useAppDispatch();

  const [pause, setPause] = useState<boolean>(true);
  const { pauseAnim } = useAppSelector((state: RootState) => state.pause);


  const arrowUpPressed = useKeyPress("ArrowLeft");
  const arrowDownPressed = useKeyPress("ArrowRight");
  const keyPPressed = useKeyPress("KeyP");



  const { heroDetailsIsLoaded, heroDetailsData, heroDetailsError } =
    useAppSelector((state: RootState) => state.heroDetails);
  
  const [[page, direction], setPage] = useState([0, 1]);
  const detailIndex: number = wrap(0, heroDetailsData.hero.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  //SET TIME
  const [seconds, setSeconds] = useState<number>(time);
  const remap = Math.trunc((seconds / time) * 100);

  useEffect(() => {
    if (arrowUpPressed) {
      setSeconds(time);
      paginate(-1);
      dispatch(pauseHero(true))
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      setSeconds(time);
      paginate(1);
      dispatch(pauseHero(true))
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (keyPPressed) {
      dispatch(pauseHero(!pauseAnim))
    }
  }, [keyPPressed]);



  const interval: any = useRef(null);


  const runInterval = useCallback(() => {
    interval.current = setInterval(() => {
      setSeconds((seconds) => seconds - 100);
      if (seconds <= 0) {
        paginate(direction);
        setSeconds(time);
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

  useEffect(()=>{
    dispatch(pauseHero(true)) 
  },[])

  useEffect(() => {
    pauseAnim ? runInterval() : pauseInterval();
  }, [pauseAnim]);

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
              setSeconds(time);
              dispatch(pauseHero(true))
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {/* OVO JE UNIVERZALNO */}
            <Article
              data={heroDetailsData.hero}
              index={detailIndex}
              isHeroDataLoaded={heroDetailsIsLoaded}
              remap={remap}
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
