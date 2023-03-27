import React from "react";
import { MdCalendarMonth } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import CountUp from "react-countup";

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
  const {windowWidth} = useAppSelector((state: RootState) => state.width)
  return (
    <motion.div
      variants={variants}
      initial="from"
      whileInView="to"
      viewport={{ once: true, amount: 0.8 }}
      transition={{ delay: windowWidth > 620 ? motionDelay : 0, type: "spring", stiffness: 100 }}
      style={{ backgroundColor: "#fff", flex:'4'}}
      className="w-100 number-wrapper overflow-hidden rounded-3 d-flex flex-column justify-content-center align-items-center bg-grey-00 shadow-lg position-relative"
    >
      <div
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
      </div>

      {icon}
      <div
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
          
          <CountUp
            delay={0 * delayNum}
            // prefix={prefix}
            style={{ fontWeight: "800" }}
            className="fs-5 text-dark-light"
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
        <div style={{ fontWeight: "400" }} className="fs-10 text-grey-400">
          {script}
        </div>
      </div>
    </motion.div>
  );
};
