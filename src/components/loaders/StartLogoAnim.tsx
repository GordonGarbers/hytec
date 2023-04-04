import React from "react";
import { motion } from "framer-motion";
import { Centerize } from "../layout/Centerize";
import { Background } from "../background/Background";
import { Svg } from "../header/Svg";

export const StartLogoAnim: React.FC = () => {
  const fillVariant = {
    initial: {
      fill: "#9a9eb3",
      scale: 1,
    },
    animate: {
      fill: "#9a9eb3",
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
      <Centerize color="#2d2e36">
      
        <div style={{zIndex:0}} className=" d-flex flex-column align-items-center position-relative ">
          
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
                stroke="#333"
                strokeWidth="0"
                />
            </motion.svg>
            <div style={{}}className="pt-3">
              <svg width="130" height="48" viewBox="0 0 250 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 47V1H11.5V47H1.5Z" fill="#F7D100"/>
                <path d="M17.5 28V18.5H35V1H45V47H35V28H17.5Z" fill="#F7D100"/>
                <path d="M72.5 31L50 1H62.5L78.5 21L93.5 1H106L83.5 31V47H72.5V31Z" fill="#F7D100"/>
                <path d="M110 11V1H151.5V11H136.5V47H125.5V11H110Z" fill="#F7D100"/>
                <path d="M156 47V1H198V11H166.5V37H198V47H156Z" fill="#F7D100"/>
                <path d="M172.5 28V20H196V28H172.5Z" fill="#F7D100"/>
                <path d="M222 1H249V11H221C215.5 11 211 17.5 211 24C211 31 216.5 36 221 36H249V46H222.5C213 46 201.4 38.7 201 23.5C200.6 8.3 212 1 222 1Z" fill="#F7D100"/>
                <path d="M1.5 47V1H11.5V47H1.5Z" stroke="#F7D100" stroke-width="2"/>
                <path d="M17.5 28V18.5H35V1H45V47H35V28H17.5Z" stroke="#F7D100" stroke-width="0"/>
                <path d="M72.5 31L50 1H62.5L78.5 21L93.5 1H106L83.5 31V47H72.5V31Z" stroke="#F7D100" stroke-width="0"/>
                <path d="M110 11V1H151.5V11H136.5V47H125.5V11H110Z" stroke="#F7D100" stroke-width="0"/>
                <path d="M156 47V1H198V11H166.5V37H198V47H156Z" stroke="#F7D100" stroke-width="0"/>
                <path d="M172.5 28V20H196V28H172.5Z" stroke="#F7D100" stroke-width="0"/>
                <path d="M222 1H249V11H221C215.5 11 211 17.5 211 24C211 31 216.5 36 221 36H249V46H222.5C213 46 201.4 38.7 201 23.5C200.6 8.3 212 1 222 1Z" stroke="#F7D100" stroke-width="2"/>
                </svg>

            </div>

                 
        </div>
    </Centerize>
  );
};
