import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useState } from "react";

interface IArrowButtonsProps {
  paginate: (newDirection: number) => void | null;
  direction: number;
  children: ReactNode;
  addClass: string;
  directionTrigger: number;
}


export const ArrowButtons: React.FC<IArrowButtonsProps> = ({
  paginate,
  direction,
  children,
  addClass,
  directionTrigger
}) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <motion.button
        whileTap={{backgroundColor:'#f7d100'}}
        transition = {{duration:.2}}
      style={{ backgroundColor: "rgba(255,255,255,1)" }}
    //   data-slide = {directionTrigger===direction ? true : false}
      onClick={() => paginate(direction)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`m-3 p-3 btn border rounded-0 border-0 shadow-lg ${addClass} position-absolute`}
    >
      <AnimatePresence>
        <motion.div
        initial={{x: 10}}
        animate={{ x: hover ? 10*direction : 0 }}
        >
            {children}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
