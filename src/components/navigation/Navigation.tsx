import React, { useRef, useEffect, useState } from "react";
import { MdLanguage } from "react-icons/md";
// import { HiHome } from "react-icons/hi";
// import { ImTruck } from "react-icons/im";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { MdContactMail } from "react-icons/md";
import "./navigation.scss";
import { motion } from "framer-motion";
import { List } from "react-bootstrap-icons";
import { XLg } from "react-bootstrap-icons";
import { Translate } from "react-bootstrap-icons";

const variants = {
  initial: {
    x: 0,
    transition: {
      type: "tween",
    },
  },
  animate: {
    x: "-100%",
    transition: {
      type: "tween",
    },
  },
};

export const Navigation = () => {
  const ref = useRef<HTMLUListElement>(null);
  const [btn, setBtn] = useState<number>(0);
  const [menu, setMenu] = useState<boolean>(false);
  const [btnName, setBtnName] = useState<string>("Home");

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const onLiBtnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setBtn(e.currentTarget.value);
    setBtnName(e.currentTarget.textContent ?? "");
  };



  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  console.log(menu);

  return (
    <nav style = {{top:'56px'}} className="position-fixed w-100">
      <div
        style={{ zIndex: "1" }}
        className="position-fixed d-flex align-items-center mb-3 gap-4 gap-sm-0 menu-translate"
      >
        <div onClick={() => setMenu(!menu)} className="d-block d-sm-none">
          {menu ? (
            <List size={32} color="#fff" />
          ) : (
            <XLg size={32} color="#fff" />
          )}
        </div>
      </div>

      <motion.div
        variants={variants}
        animate={menu ? "animate" : "initial"}
        // , translate: `${menu ? '100%' : '0%'}`
        style={{ maxWidth: "1400px" }}
        data-menu={`${menu}`}
        className="container-fluid bg-grey-900 ps-3 ps-sm-5 pe-2 pe-sm-3 pt-3 pb shadow-0 shadow-sm-lg d-flex justify-content-center justify-content-sm-between align-items-center main-wrapper "
      >
        <div className="mb-3 gap-4 gap-sm-0 language">
          <div
            role="button"
            data-add-btn={false}
            className="me-auto d-flex align-items-center gap-2 text-secondary"
            style={{ color: "#000" }}
          >
            <Translate size={18} color="#000" />
            EN
          </div>
        </div>

        <ul
          ref={ref}
          style={{ fontWeight: "600" }}
          className=" text-secondary list-unstyled d-flex flex-column flex-sm-row gap-4 gap-sm-6 px-3"
        >
          <li
            onClick={(e) => onLiBtnClick(e)}
            role="button"
            className=""
            data-add-btn={false}
            value={0}
          >
            Home
          </li>
          <li
            onClick={(e) => onLiBtnClick(e)}
            role="button"
            className=""
            data-add-btn={false}
            value={1}
          >
            Machinery
          </li>
          <li
            onClick={(e) => onLiBtnClick(e)}
            role="button"
            className=""
            data-add-btn={false}
            value={2}
          >
            About us
          </li>
          <li
            onClick={(e) => onLiBtnClick(e)}
            role="button"
            className=""
            data-add-btn={false}
            value={3}
          >
            Contact
          </li>
        </ul>
      </motion.div>
      <div
        className={`mover fw-bold text-secondary`}
        style={{
          width: `${
            ref.current &&
            ref.current.children[btn].getBoundingClientRect().width
          }px`,
          height: `${
            ref.current &&
            ref.current.children[btn].getBoundingClientRect().height
          }px`,
          left: `${
            ref.current && ref.current.children[btn].getBoundingClientRect().x
          }px`,
          top: `${
            ref.current && ref.current.children[btn].getBoundingClientRect().y-56
          }px`,
        }}
      >
        {/* <div className={`mover-text`}>{btnName}</div> */}
      </div>
    </nav>
  );
};
