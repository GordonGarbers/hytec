import React from "react";
import { MAXIMUM_CONTAINER_WIDTH } from "../constants/constants";
import { Form } from "./Form";
import "./contactus.scss";
import { PigeonMap } from "./Map";



export const ContactUs: React.FC = () => {
  return (
    <div style={{}} className="text-grey-800 bg-dark">
      <div
        style={{ maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px` }}
        className="container-fluid pt-4 pt-md-5 pb-2"
      >
        <div className="ps-3 d-flex flex-column-reverse flex-md-row justify-content-between w-100 gap-6 pe-3 pe-sm-1">
          <Form />
          <PigeonMap />
        </div>

        <div className="info-wrapper d-flex flex-column justify-content-between p-3">
        </div>
      </div>
    </div>
  );
};
