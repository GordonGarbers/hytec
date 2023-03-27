import React from "react";
import { MAXIMUM_CONTAINER_WIDTH } from "../../constants/constants";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-dark">
        <div
          style={{ maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px` }}
          className="container-fluid-02 gap-2 py-4 px-3 fs-14  text-grey-600 d-flex flex-column flex-sm-row align-items-center justify-content-between"
        >
          <div
            style={{ fontWeight: "300" }}
            className="list-unstyled d-flex gap-2 gap-sm-3 gap-md-4 align-items-center justify-content-center"
          >
            <a className="text-decoration-none text-grey-600" href="#">
              Imprint
            </a>
            <a className="text-decoration-none text-grey-600" href="#">
              Privacy Policy
            </a>
            <a className="text-decoration-none text-grey-600" href="#">
              Terms and Conditions
            </a>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-3 gap-sm-5">
            <div className="d-flex align-items-center gap-2 gap-sm-3 gap-md-5">
              <a
                className="text-grey-600"
                href="https://www.facebook.com/HytecBaumaschinen/"
              >
                <BsFacebook size={18} />
              </a>
              <a
                className="text-grey-600"
                href="https://www.instagram.com/hytec_baumaschinen/"
              >
                <AiFillInstagram size={20} />
              </a>
              <a
                className="text-grey-600"
                href="https://www.youtube.com/watch?v=CJW59TkI1ic"
              >
                <FaYoutube size={20} />
              </a>
            </div>
            <div>&copy; 2023 Hytec Baumaschinen GmbH</div>
          </div>
        </div>
      </footer>
    </>
  );
};
