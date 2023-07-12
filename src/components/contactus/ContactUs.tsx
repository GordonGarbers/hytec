import React from 'react';
import { MAXIMUM_CONTAINER_WIDTH } from '../../constants/constants';
import { Form } from './Form';
import './contactus.scss';
import { PigeonMap } from './Map';

export const ContactUs: React.FC = () => {
  return (
    <div
      id="contact"
      style={{}}
      className="text-grey-800 bg-dark position-relative nav-sections"
    >
      <div
        style={{ maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px` }}
        className="container-fluid-02 pt-8 pt-md-10 pb-7"
      >
        <div className="ps-3 d-flex flex-column-reverse flex-md-row justify-content-between w-100 gap-6 pe-3 pe-sm-3 pe-md-1">
          <Form />
          <PigeonMap />
        </div>

        <div className="info-wrapper d-flex flex-column justify-content-between p-3"></div>
      </div>
    </div>
  );
};
