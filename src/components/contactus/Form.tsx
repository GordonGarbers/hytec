import React from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdTitle } from "react-icons/md";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Skeleton from "react-loading-skeleton";


const form = document.querySelector('form');

export const Form: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector((state: RootState) => state.data);

  return (
    <form
    className="form-wrapper"
    action="https://formspree.io/f/mjvdlklv"
    // action="https://formsubmit.co/milesoda@yahoo.com"
    method="POST"
    >
      <div className="">
        <h1 style={{ fontWeight: "600"}} className="fs-6 pt-0 text-primary">
            {data.sections?.contact}
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
              name="name"
              className="form-control bg-dark-form border-0 fs-14 text-grey-700 rounded-1"
              // className="form-control bg-dark border-0 border-bottom border-grey-300 fs-13 text-grey-700 rounded-0"
              id="validationDefault01"
              placeholder={data.form.name??""}
              required
            />
          </div>
        </div>

        <div className="mb-2 mb-md-3">
          <div className="input-container">
            <HiOutlineMail size={18} className="icon" />
            <input
              type="email"
              name="email"
              className="form-control bg-dark-form border-0 fs-14 text-grey-700 rounded-1"
              id="validationDefault02"
              placeholder={data.form.email??""}
              required
            />
          </div>
        </div>

        <div className="mb-2 mb-md-3">
          <div className="input-container">
            <MdTitle size={16} className="icon" />
            <input
              type="text"
              name="subject"
              className="form-control bg-dark-form border-0 fs-14 text-grey-700 rounded-1"
              id="validationDefaultUsername"
              placeholder={data.form.subject??""}
              aria-describedby="inputGroupPrepend2"
              required
            />
          </div>
        </div>

        <div className="form-group mb-3 mb-md-3 ">
          <textarea
            className="form-control bg-dark-form border-0 fs-14 text-grey-700 rounded-1"
            rows={5}
            name="message"
            placeholder={data.form.text??""}
          ></textarea>
        </div>
      </div>

      <button
        className="btn btn-primary fs-14 fw-bold px-2 px-sm-4 py-2 d-flex align-items-center"
        type="submit"
      >
        <span>{data.buttons.send}</span>
      </button>
    </form>
  );
};
