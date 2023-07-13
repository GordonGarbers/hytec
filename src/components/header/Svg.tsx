import React from 'react';
import { Path } from './Path';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
    initial: (value:number) => ({
      fill: initialColor,
      transition:{
        delay: delay * value * 2 + .3,
        duration: duration,
        repeat: repeat,

      }
    }),
    animate:(value:number)=> ({
      fill: animateColor,
      transition:{
        delay: delay * value * 2 + .3,
        duration: duration,
        repeat: repeat,
      }
    }),
  };


  const navigate = useNavigate();

  const onDetailsChange = () => {
    navigate('/')
    };


  return (

    <div style={{cursor:'pointer'}} className='d-flex align-items-center gap-1' onClick={()=>onDetailsChange()}>
      <motion.svg
      variants={fillVariant}
      initial="initial"
      animate="animate"
      custom={0}
      width="60"
      // height="auto"
      viewBox={`0 0 71 50`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        dPath="M7.4516 8.48849L1 1.12276L29.3627 12.2941L31.5538 18.9233H39.2227L41.2921 12.2941L69.6548 1L63.0814 8.48849L44.5787 14.3811L40.44 24.6931L45.4308 15.7315L59.5513 12.2941L54.8039 17.5729L44.5787 18.9233L52.3693 20.1509L48.2306 24.8159L42.6311 22.3606L46.6481 26.5345L43.9701 29.6036L40.6834 26.1662L43.4832 32.5499L41.9007 35.7417L38.614 31.0767L40.6834 37.9514L35.936 49V30.2174L38.3706 21.624H32.2842L34.597 30.2174V49L29.8496 37.9514L31.919 31.0767L28.7541 35.7417L27.1716 32.5499L29.8496 26.1662L26.5629 29.6036L24.0067 26.5345L27.902 22.3606L22.3025 24.8159L18.4071 20.1509L26.076 18.9233L15.8509 17.5729L11.1035 12.2941L25.2239 15.7315L30.2148 24.8159L26.076 14.3811L7.4516 8.48849Z"
        strokeWidth={0}
        repeat={repeat}
        strokeColor={strokeColor}
        delayNum={0}
        duration={duration}
        delayConst={delayConst}
      />
      

    </motion.svg>

      <motion.svg
        variants={fillVariant}
        initial="initial"
        animate="animate"
        custom={1}
        width="100%"
        height="100%"
        viewBox={`0 0 233 45`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <Path
          dPath="M0.23214 44.1176V0.823517H9.6369V44.1176H0.23214Z"
          strokeWidth={strokeWidth}
          repeat={repeat}
          strokeColor={strokeColor}
          delayNum={5}
          duration={duration}
          delayConst={delayConst}
        />
        <Path
          dPath="M15.2798 26.2353V17.2941H31.7381V0.823517H41.1429V44.1176H31.7381V26.2353H15.2798Z"
          strokeWidth={strokeWidth}
          repeat={repeat}
          strokeColor={strokeColor}
          delayNum={6}
          duration={duration}
          delayConst={delayConst}
        />
        <Path
          dPath="M67.006 29.0588L45.8452 0.823517H57.6012L72.6488 19.647L86.756 0.823517H98.5119L77.3512 29.0588V44.1176H67.006V29.0588Z"
          strokeWidth={strokeWidth}
          repeat={repeat}
          strokeColor={strokeColor}
          delayNum={7}
          duration={duration}
          delayConst={delayConst}
        />
        <Path
          dPath="M102.274 10.2353V0.823517H141.304V10.2353H127.196V44.1176H116.851V10.2353H102.274Z"
          strokeWidth={strokeWidth}
          repeat={repeat}
          strokeColor={strokeColor}
          delayNum={8}
          duration={duration}
          delayConst={delayConst}
        />
        <Path
          dPath="M145.536 44.1176V0.823517H185.036V10.2353H155.411V34.7059H185.036V44.1176H145.536Z"
          strokeWidth={strokeWidth}
          repeat={repeat}
          strokeColor={strokeColor}
          delayNum={9}
          duration={duration}
          delayConst={delayConst}
        />
        <Path
          dPath="M161.054 26.2353V18.7059H183.155V26.2353H161.054Z"
          strokeWidth={strokeWidth}
          repeat={repeat}
          strokeColor={strokeColor}
          delayNum={10}
          duration={duration}
          delayConst={delayConst}
        />
        <Path
          dPath="M207.607 0.823517H233V10.2353H206.667C201.494 10.2353 197.262 16.3529 197.262 22.4706C197.262 29.0588 202.435 33.7647 206.667 33.7647H233V43.1765H208.077C199.143 43.1765 188.233 36.3059 187.857 22C187.481 7.6941 198.202 0.823517 207.607 0.823517Z"
          strokeWidth={strokeWidth}
          repeat={repeat}
          strokeColor={strokeColor}
          delayNum={11}
          duration={duration}
          delayConst={delayConst}
        />

      </motion.svg>
    </div>
    
  );
};
