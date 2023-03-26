import React from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdTitle } from "react-icons/md";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";


export const Form: React.FC = () => {
  return (
    <form className="form-wrapper">
      <div className="">
        <h1 style={{ fontWeight: "600" }} className="fs-6 pt-0 text-primary">
          CONTACT US
        </h1>

        <div className="d-flex flex-column gap-2 gap-md-3 gap-lg-4 mt-4">
          <div className="d-flex align-items-center fs-14 gap-2 text-grey-500">
            <MdLocationOn size={16} color="#f7d100" />
            <div className="">
              Borgwardstrasse 6, 21423 Winsen / Luhe
            </div>
          </div>
          <div className="d-flex align-items-center fs-14 gap-2 text-grey-500">
            <BsTelephoneFill size={16} color="#f7d100" />
            <div className="">+49 (0) 4171 66 911 00</div>
          </div>
          <div className="d-flex align-items-center fs-14 gap-2 text-grey-500">
            <MdEmail size={16} color="#f7d100" />
            <div className="">info@hytec-baumaschinen.de</div>
          </div>
          <div className="p-3"></div>
        </div>

      </div>
      <div className="form-row fs-13">
        <div className="mb-2 mb-md-3">
          <div className="input-container">
            <FaRegUser size={16} className="icon" />
            <input
              type="text"
              className="form-control bg-dark-form border-0 fs-13 text-grey-700 rounded-1"
              // className="form-control bg-dark border-0 border-bottom border-grey-300 fs-13 text-grey-700 rounded-0"
              id="validationDefault01"
              placeholder="Name"
              required
            />
          </div>
        </div>

        <div className="mb-2 mb-md-3">
          <div className="input-container">
            <HiOutlineMail size={18} className="icon" />
            <input
              type="email"
              className="form-control bg-dark-form border-0 fs-13 text-grey-700 rounded-1"              id="validationDefault02"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div className="mb-2 mb-md-3">
          <div className="input-container">
            <MdTitle size={16} className="icon" />
            <input
              type="text"
              className="form-control bg-dark-form border-0 fs-13 text-grey-700 rounded-1"              id="validationDefaultUsername"
              placeholder="Subject"
              aria-describedby="inputGroupPrepend2"
              required
            />
          </div>
        </div>

        <div className="form-group mb-3 mb-md-3 ">
          <textarea
            className="form-control bg-dark-form border-0 fs-13 text-grey-700 rounded-1"
            rows={5}
            placeholder="Type your message"
          ></textarea>
        </div>
      </div>

      <button
        className="btn btn-primary fs-13 fw-bold px-5 py-2 d-flex align-items-center"
        type="submit"
      >
        {/* <BiMailSend size={20} className="me-2" /> */}
        <span>Send Message</span>
      </button>
    </form>
  );
};
