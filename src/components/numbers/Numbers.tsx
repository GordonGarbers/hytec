import React from "react";
import { FaHandshake } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { FaTractor } from "react-icons/fa";
import { CardNumber } from "./CardNumber";
import "./numbers.scss";

export const Numbers: React.FC = () => {
  return (
    <>
      <div className="">
        <div
          style={{ maxWidth: "1400px"}}
          className="container-fluid-02 my-6 d-flex flex-column flex-sm-row gap-3 gap-sm-4 gap-lg-6 px-3 px-sm-3"
        >
          <CardNumber
            number={2005}
            script="founded"
            icon={
              <MdCalendarMonth
                size={70}
                style={{
                  zIndex: "0",
                }}
                className="number-icon p-2 bg-grey-900 text-dark-light shadow rounded-3 position-absolute"
              />
            }
            delayNum={0}
            separator=""
            includeArrow={false}
            motionDelay ={0}
          />

          <CardNumber
  
            number={10000}
            script="machines sold"
            icon={
              <FaTractor
                size={70}
                style={{

                  zIndex: "0",
                }}
                className="number-icon p-2 bg-grey-900 text-dark-light shadow rounded-3 position-absolute"
              />
            }
            delayNum={0.5}
            prefix=">"
            separator="."
            includeArrow={true}
            motionDelay ={.3}
          />

          <CardNumber
            number={100}
            script="dealers"
            icon={
              <FaHandshake
                size={70}
                style={{ 
                  zIndex: "0",
                }}
                className="number-icon p-2 bg-grey-900 text-dark-light shadow rounded-3 position-absolute"
              />
            }
            delayNum={1}
            prefix=">"
            includeArrow={true}
            motionDelay ={.6}
          />
        </div>
      </div>
    </>
  );
};
