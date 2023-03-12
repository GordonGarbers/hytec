import React, { useRef, useEffect, useState } from "react";
import { MdLanguage } from "react-icons/md";
// import { HiHome } from "react-icons/hi";
// import { ImTruck } from "react-icons/im";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { MdContactMail } from "react-icons/md";
import "./navigation.scss";
import {motion} from "framer-motion";

export const Navigation = () => {
  const ref = useRef<HTMLUListElement>(null);
  const [btn, setBtn] = useState<number>(1);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const onLiBtnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setBtn(e.currentTarget.value);
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


  return (
    <nav
      style={{ maxWidth: "1400px" }}
      className="container-fluid bg-grey-900 px-1 pt-3 pb-1 rounded-bottom shadow-lg"
    >
      <ul
        ref={ref}
        style={{ fontWeight: "600", zIndex: "1", position: "relative" }}
        className="list-unstyled d-flex align-items-center gap-3 px-4"
      >
        <li
          role="button"
          data-add-btn={false}
          className="me-auto d-flex align-items-center gap-2"
          value={0}
        >
          <MdLanguage size={16} />
          EN
        </li>
        <li
          onClick={(e) => onLiBtnClick(e)}
          role="button"
          className=""
          data-add-btn={false}
          value={1}
        >
          Home
        </li>
        <li
          onClick={(e) => onLiBtnClick(e)}
          role="button"
          className=""
          data-add-btn={false}
          value={2}
        >
          Machinery
        </li>
        <li
          onClick={(e) => onLiBtnClick(e)}
          role="button"
          className=""
          data-add-btn={false}
          value={3}
        >
          About us
        </li>
        <li
          onClick={(e) => onLiBtnClick(e)}
          role="button"
          className=""
          data-add-btn={false}
          value={4}
        >
          Contact
        </li>
      </ul>

      <div
        style={{
          transition: "all .3s ease",
          zIndex: "0",
          position: "fixed",
          overflow:'hidden',
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
            ref.current && ref.current.children[btn].getBoundingClientRect().y
          }px`,
        }}
        className="mover"
      >
      </div>
    </nav>
  );
};
