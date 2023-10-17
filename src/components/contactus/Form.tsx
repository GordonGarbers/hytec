import React from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdTitle } from "react-icons/md";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Skeleton from "react-loading-skeleton";
import { EColors } from "../../constants/constants";
import emailjs from '@emailjs/browser'


export const Form: React.FC = () => {
  const { dataIsLoaded, data } = useAppSelector(
    (state: RootState) => state.data
  );

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('SUBMITING....');

    emailjs.sendForm('service_qik0orp', 'template_msxchh9', e.target as HTMLFormElement, 'WfrFUcIra74fJ0_Mh')


  }

  return (
    <form
      className="form-wrapper"
      // action="https://formspree.io/f/mjvdlklv"
      // action="https://formsubmit.co/milesoda@yahoo.com"
      method="POST"
      onSubmit={sendEmail}
    >
      <div className="">
        <h1 style={{ fontFamily: 'RobotoMedium'}} className="fs-6 pt-0 text-primary">
          {!dataIsLoaded ? (
            data.sections?.contact
          ) : (
            <Skeleton
              count={1}
              height={32}
              width={"60%"}
              baseColor={EColors.primary}
            />
          )}
        </h1>

        <div className="d-flex flex-column gap-2 gap-md-3 gap-lg-4 mt-4">
          <div className="d-flex align-items-center fs-14 gap-2 text-grey-500">
            <MdLocationOn size={16} color="#f7d100" />
            <div className="">Borgwardstrasse 6, 21423 Winsen / Luhe</div>
          </div>
          <div className="d-flex align-items-start flex-column gap-2 gap-lg-3">
            <a
              href="tel: 041716691100"
              className={`border border-grey-300 p-2 rounded-2 text-grey-700 d-inline-flex justify-content-start align-items-center fs-15 gap-2 gap-lg-2 header-info py-2`}
            >
              <div>
                <BsTelephoneFill
                  size={14}
                  className="info-icon"
                  color={`${EColors.primary}`}
                />
              </div>
              <div className="">+49 (0) 4171 66 911 00</div>
            </a>

            <a
              href="mailto: info@hytec-baumaschinen.de"
              className={`border border-grey-300 p-2 rounded-2 text-grey-700 d-inline-flex justify-content-start align-items-center fs-15 gap-2 gap-lg-2  header-info py-2`}
            >
              <div>
                <MdEmail
                  size={16}
                  className="info-icon"
                  color={`${EColors.primary}`}
                />
              </div>
              <div className="">info@hytec-baumaschinen.de</div>
            </a>
          </div>

          <div className="p-3"></div>
        </div>
      </div>
      <div className="form-row fs-13">
        <div className="mb-2 mb-md-3">
          <div className="input-container">
            <FaRegUser size={16} className="icon" />
            {!dataIsLoaded ? (
              <input
                type="text"
                name="name"
                className="form-control bg-dark-form border-0 fs-14 text-grey-700 rounded-1"
                id="validationDefault01"
                placeholder={data.form.name ?? ""}
                required
                autoComplete="off"
              />
            ) : (
              <Skeleton
                count={1}
                height={38}
                width={"100%"}
                baseColor={EColors.darkLight}
              />
            )}
          </div>
        </div>

        <div className="mb-2 mb-md-3">
          <div className="input-container">
            <HiOutlineMail size={18} className="icon" />
            {!dataIsLoaded ? (
              <input
                type="email"
                name="email"
                className="form-control bg-dark-form border-0 fs-14 text-grey-700 rounded-1"
                id="validationDefault02"
                placeholder={data.form.email ?? ""}
                required
                autoComplete="off"
              />
            ) : (
              <Skeleton
                count={1}
                height={38}
                width={"100%"}
                baseColor={EColors.darkLight}
              />
            )}
          </div>
        </div>

        <div className="mb-2 mb-md-3">
          <div className="input-container">
            <MdTitle size={16} className="icon" />
            {!dataIsLoaded ? (
              <input
                type="text"
                name="subject"
                className="form-control bg-dark-form border-0 fs-14 text-grey-700 rounded-1"
                id="validationDefaultUsername"
                placeholder={data.form.subject ?? ""}
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            ) : (
              <Skeleton
                count={1}
                height={38}
                width={"100%"}
                baseColor={EColors.darkLight}
              />
            )}
          </div>
        </div>

        <div className="form-group mb-3 mb-md-3 ">
          {!dataIsLoaded ? (
            <textarea
              className="form-control bg-dark-form border-0 fs-14 text-grey-700 rounded-1"
              rows={5}
              name="message"
              placeholder={data.form.text ?? ""}
            ></textarea>
          ) : (
            <Skeleton
              count={1}
              height={100}
              width={"100%"}
              baseColor={EColors.darkLight}
            />
          )}
        </div>
      </div>
      {!dataIsLoaded ? (
        <button
          className="btn btn-primary fs-14 fw-bold px-2 px-sm-4 py-2 d-flex align-items-center"
          type="submit"
        >
          <span>{data.buttons.send}</span>
        </button>
      ) : (
        <Skeleton
          count={1}
          height={32}
          width={150}
          baseColor={EColors.primary}
        />
      )}
    </form>
  );
};
