import React from "react";
import { MAXIMUM_CONTAINER_WIDTH } from "../../constants/constants";
import { Form } from "./Form";
import "./contactus.scss";
import { PigeonMap } from "./Map";
import { Container } from "../layout/Container";



export const ContactUs: React.FC = () => {
  return (
    <div style={{}} className="text-grey-800 bg-dark position-relative">
            {/* <div
        style={{
          top: "0px",
          left: "0px",
          zIndex: "0",
          clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 80% 100%)",
        }}
        className="bg-dark-form position-absolute w-100 h-100"
      ></div> */}
      
      <div
        style={{ maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px`}}
        className="container-fluid-02 pt-4 pt-md-7 pb-2"
      >
        <div className="ps-3 d-flex flex-column-reverse flex-md-row justify-content-between w-100 gap-6 pe-3 pe-sm-3 pe-md-1">
          <Form />
          <PigeonMap />
        </div>

        <div className="info-wrapper d-flex flex-column justify-content-between p-3">
        </div>
      </div>
    </div>
  );
};
