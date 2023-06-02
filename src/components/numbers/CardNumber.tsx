import React, { useEffect, useState } from 'react';
import { MdCalendarMonth } from 'react-icons/md';
import { IconType } from 'react-icons/lib';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import CountUp from 'react-countup';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { EColors } from '../../constants/constants';

interface ICardNumberProps {
  number: number;
  script: string;
  prefix?: string;
  icon: React.ReactNode;
  delayNum: number;
  separator?: string;
  includeArrow: boolean;
  motionDelay: number;
}

const variants = {
  from: {
    scale: 0.4,
    opacity: 0,
  },
  to: {
    scale: 1,
    opacity: 1,
  },
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },

  visible: (i: number) => {
    const delay = i * 0.5;

    return {
      pathLength: 1,
      opacity: 1,
    };
  },
};

export const CardNumber: React.FC<ICardNumberProps> = ({
  number,
  script,
  prefix,
  icon,
  delayNum,
  separator,
  includeArrow,
  motionDelay,
}) => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  return (
    <motion.div
      variants={variants}
      initial="from"
      whileInView="to"
      viewport={{ once: true, amount: 0.8 }}
      transition={{
        delay: windowWidth > 620 ? motionDelay : 0,
        type: 'spring',
        stiffness: 100,
      }}
      style={{ flex: '4' }}
      className="w-100 number-wrapper d-flex flex-column justify-content-center align-items-center  position-relative"
    >
      <motion.svg
        width="100%"
        // height="600"
        viewBox="0 0 600 600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
    <motion.circle
          style={{filter: 'drop-shadow(10px 10px 20px rgb(0,0,0,.05))'}}
          cx="300"
          cy="300"
          r={`${windowWidth >= 620 && windowWidth <= 960 ? 240 : 250}`}
          stroke='#fff'
          strokeWidth='36px'
          custom={1}
        />

        <motion.circle
          cx="300"
          cy="300"
          r={`${windowWidth >= 620 && windowWidth <= 960 ? 240 : 250}`}
          // style={{filter: 'drop-shadow(0px 0px 20px rgb(255,255,0,.2))'}}
          stroke={`${EColors.primary}`}
          strokeWidth='30px'
          variants={draw}
          transition={{
            pathLength: {
              delay: windowWidth > 620 ? motionDelay : 0,
              type: 'spring',
              duration: 2,
              bounce: 0,
            },
            opacity: {
              delay: windowWidth > 620 ? motionDelay : 0,
              duration: 0.01,
            },
          }}
          custom={1}
        />


      </motion.svg>

      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ position: 'absolute' }}
      >
        <div className='d-flex'>

          <div className="d-flex align-items-center">
            <div
              style={{ fontWeight: '800' }}
              className={`${
                includeArrow ? 'd-block' : 'd-none'
              } fs-${windowWidth <= 732 ? windowWidth <= 479 ? 5 : 7 : 6 } text-dark-form pe-2`}
            >{`>`}</div>
          </div>

          <CountUp
            delay={0 * delayNum}
            // prefix={prefix}
            style={{ fontWeight: '800' }}
            className={`fs-${windowWidth <= 732 ? windowWidth <= 479 ? 3 : 6  : 5 } text-dark-light`}
            // start={0}
            end={number}
            enableScrollSpy={true}
            scrollSpyOnce={true}
            separator={separator}
            duration={3}
            decimal=""
            decimals={0}
          />

        </div>
        

        {/* <div>{script.toUpperCase()}</div> */}
        <div
          style={{ zIndex: '1' }}
          className="d-flex justify-content-center align-items-center"
        >
          <div style={{ fontWeight: '500' }} className={`fs-${windowWidth >=479 && windowWidth <= 830 ? windowWidth <= 670 ? windowWidth <= 600 ? 16 : 15 : 14 : 11} text-grey-400`}>
            {script.toUpperCase()}
          </div>
        </div>
      </div>

      {/* <div
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)",
            marginTop: "0px",
          }}
          className="bg-primary-mono w-100 position-relative yellow-part"
        >
          <div
            style={{
              top: "0px",
              left: "0px",
              zIndex: "0",
              clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            className="bg-primary position-absolute w-100 h-100"
          ></div>
        </div> */}

      {/* {icon} */}
      {/* <div
          style={{ zIndex: "1" }}
          className="pt-5 pb-3 d-flex flex-column justify-content-center align-items-center"
        >
          <div className="d-flex align-items-center">
            <div
              style={{ fontWeight: "800" }}
              className={`${
                includeArrow ? "d-block" : "d-none"
              } fs-5 text-primary pe-2`}
            >{`>`}</div>
            

            
          </div>
          <div style={{ fontWeight: "500"}} className="fs-10 text-grey-400">
            {script}
          </div>
        </div> */}
    </motion.div>
  );
};
