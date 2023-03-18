import React, { useState } from "react";
import "./hero.scss";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import { ChevronLeft } from "react-bootstrap-icons";
import { ChevronRight } from "react-bootstrap-icons";

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

const image = [
  "assets/carusel/baumachine_01.jpg",
  "assets/carusel/baumachine_02.jpg",
  "assets/carusel/baumachine_03.jpg",
  "assets/carusel/baumachine_04.jpg",
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Hero: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, image.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <section className="section position-relative w-100">
        <div className="buttons-wrapper">
          <button
            onClick={() => paginate(-1)}
            className="m-3 p-3 btn btn-grey-900 rounded-0 shadow-lg border btn-left position-absolute"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="m-3 p-3 btn btn-grey-900 rounded-0 shadow-lg border btn-right position-absolute"
          >
            <ChevronRight size={20} />
          </button>
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
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <article className="d-flex flex-column-reverse flex-lg-row w-100 position-relative">
                <div className="w-100 bg-grey-1000 h-100 article-left">
                  <div className="container-fluid h-100 w-100 d-flex justify-content-center align-items-center mt-3 mt-sm-3 mt-lt-5  bg-grey-1000 article-left-wrapper">
                    <div className="ms-3 article-left-left">
                      <p className="text-uppercase text-primary">hytec</p>
                      <h1 className="fw-bold fs-5">
                        We are the leaders in{" "}
                        <span className="text-primary">Construction</span>
                      </h1>
                      <p className="mt-3 mt-sm-4 fs-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fuga maxime minus laboriosam ex officia ea, maiores aut
                        nostrum quisquam. Blanditiis beatae ipsum in impedit,
                        tempora repudiandae inventore reprehenderit ut labore!
                      </p>
                      <button className="btn btn-primary mt-2 mt-sm-3 rounded-2">
                        Contact us
                      </button>
                    </div>
                    <div className="h-100 article-left-right"></div>
                  </div>
                </div>

                <div className="w-100 overflow-hidden article-right">
                  <img
                    src={image[imageIndex]}
                    alt="img"
                    draggable="false"
                    className="w-100"
                  />
                </div>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};
