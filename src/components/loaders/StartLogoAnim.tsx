import React from "react";
import { motion } from "framer-motion";
import { Centerize } from "../layout/Centerize";

export const StartLogoAnim: React.FC = () => {
  const fillVariant = {
    initial: {
      fill: "#373943",
      scale: 1,
    },
    animate: {
      fill: "#26272e",
      scale: 1.1,
    },
  };

  const variants = {
    initial: {
      pathLength: 0,
      //   fill: '#fff',
    },
    animate: {
      pathLength: 0,
      //   fill: '#8b8d97',
    },
  };

  return (
      //   <Centerize color="#26272e">
      <Centerize color="#fff">
        <div style={{zIndex:0}} className=" d-flex flex-column align-items-center position-relative">

            <motion.svg
                className=""
                variants={fillVariant}
                initial="initial"
                animate="animate"
                transition={{
                delay: 0,
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                type: "tween",
                }}
                width="142"
                height="98"
                viewBox="0 0 284 197"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                variants={variants}
                initial="initial"
                animate="animate"
                transition={{
                    duration: 5,
                    delay: 0,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                d="M27.5 31.5L1 1.5L117.5 47L126.5 74H158L166.5 47L283 1L256 31.5L180 55.5L163 97.5L183.5 61L241.5 47L222 68.5L180 74L212 79L195 98L172 88L188.5 105L177.5 117.5L164 103.5L175.5 129.5L169 142.5L155.5 123.5L164 151.5L144.5 196.5V120L154.5 85H129.5L139 120V196.5L119.5 151.5L128 123.5L115 142.5L108.5 129.5L119.5 103.5L106 117.5L95.5 105L111.5 88L88.5 98L72.5 79L104 74L62 68.5L42.5 47L100.5 61L121 98L104 55.5L27.5 31.5Z"
                //   fill="none"
                stroke="#26272e"
                strokeWidth="1"
                />
            </motion.svg>
            <div style={{width:'180px'}} className = 'mt-3'>
                <img style={{width:'100%'}} src="assets/hytec-05.png" alt="" />
            </div>
        </div>
      
    </Centerize>
  );
};
