import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode, useState } from 'react';
import { pauseCarousel } from '../../features/pauseHeroPage/pauseHeroPage';
import { useAppDispatch } from '../../app/hooks';

interface IArrowButtonsProps {
  paginate: (newDirection: number) => void | null;
  direction: number;
  children: ReactNode;
  addClass: string;
  directionTrigger: number;
  handleClick: () => void;
}

export const ArrowButtons: React.FC<IArrowButtonsProps> = ({
  paginate,
  direction,
  children,
  addClass,
  handleClick,
}) => {
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState<boolean>(false);

  return (
    <motion.button
      whileTap={{}}
      transition={{ duration: 0.2 }}
      style={{ zIndex: 10 }}
      //   data-slide = {directionTrigger===direction ? true : false}
      onClick={() => {
        handleClick();
        paginate(direction);
        dispatch(pauseCarousel(true));
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`p-2 btn border rounded-0 border-0 shadow-lg ${addClass} bg-primary`}
    >
      <AnimatePresence>
        <motion.div
          initial={{ x: 5 }}
          animate={{ x: hover ? 5 * direction : 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
