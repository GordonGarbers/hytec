import React from 'react';
import { Path } from './Path';
import { motion } from 'framer-motion';

interface ISvgProps {
  initialColor: string;
  animateColor: string;
  strokeWidth: number;
  strokeColor: string;
  delay: number;
  duration: number;
  repeat: number;
  delayConst: number;
  size: number;
}

export const Svg: React.FC<ISvgProps> = ({
  initialColor,
  animateColor,
  strokeWidth,
  strokeColor,
  delay,
  duration,
  repeat,
  delayConst,
  size,
}) => {
  const fillVariant = {
    initial: {
      fill: initialColor,
    },
    animate: {
      fill: animateColor,
    },
  };

  return (
    <motion.svg
      variants={fillVariant}
      initial="initial"
      animate="animate"
      transition={{
        delay: delay,
        duration: duration,
        repeat: repeat,
      }}
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} 48`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        dPath="M1.5 47V1H11.5V47H1.5Z"
        strokeWidth={strokeWidth}
        repeat={repeat}
        strokeColor={strokeColor}
        delayNum={0}
        duration={duration}
        delayConst={delayConst}
      />
      <Path
        dPath="M17.5 28V18.5H35V1H45V47H35V28H17.5Z"
        strokeWidth={strokeWidth}
        repeat={repeat}
        strokeColor={strokeColor}
        delayNum={1}
        duration={duration}
        delayConst={delayConst}
      />
      <Path
        dPath="M72.5 31L50 1H62.5L78.5 21L93.5 1H106L83.5 31V47H72.5V31Z"
        strokeWidth={strokeWidth}
        repeat={repeat}
        strokeColor={strokeColor}
        delayNum={2}
        duration={duration}
        delayConst={delayConst}
      />
      <Path
        dPath="M110 11V1H151.5V11H136.5V47H125.5V11H110Z"
        strokeWidth={strokeWidth}
        repeat={repeat}
        strokeColor={strokeColor}
        delayNum={3}
        duration={duration}
        delayConst={delayConst}
      />
      <Path
        dPath="M156 47V1H198V11H166.5V37H198V47H156Z"
        strokeWidth={strokeWidth}
        repeat={repeat}
        strokeColor={strokeColor}
        delayNum={4}
        duration={duration}
        delayConst={delayConst}
      />
      <Path
        dPath="M172.5 28V20H196V28H172.5Z"
        strokeWidth={strokeWidth}
        repeat={repeat}
        strokeColor={strokeColor}
        delayNum={5}
        duration={duration}
        delayConst={delayConst}
      />
      <Path
        dPath="M222 1H249V11H221C215.5 11 211 17.5 211 24C211 31 216.5 36 221 36H249V46H222.5C213 46 201.4 38.7 201 23.5C200.6 8.3 212 1 222 1Z"
        strokeWidth={strokeWidth}
        repeat={repeat}
        strokeColor={strokeColor}
        delayNum={6}
        duration={duration}
        delayConst={delayConst}
      />
    </motion.svg>
  );
};
