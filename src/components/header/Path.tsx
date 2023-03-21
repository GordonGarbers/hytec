import React from "react";
import { motion } from "framer-motion";
import { ILogoVariants } from "../../interfaces/interfaces";

interface IPathProps {
    dPath: string;
    strokeWidth: number,
    repeat: number,
    strokeColor: string,
    delayNum: number,
    duration: number,
    delayConst: number
}

const variants = {
    initial: {
      pathLength: 0,
    },
    animate: {
      pathLength: 1,

    },
  };



export const Path: React.FC<IPathProps> = ({dPath, strokeWidth, repeat, strokeColor, delayNum, duration, delayConst}) => {
    return (
        <motion.path
        
            variants={variants}
            initial="initial"
            animate="animate"
            transition = {{
              duration: duration,
              delay: delayConst * delayNum,
              repeat: repeat,
              repeatType: "loop",
            }}
            d={dPath}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
      />
    )
}
