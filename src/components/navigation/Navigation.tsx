import React, { useRef, useEffect, useState } from "react";
import { MdLanguage } from "react-icons/md";
import "./navigation.scss";
import {motion} from "framer-motion";

export const Navigation = () => {
  const ref = useRef<HTMLUListElement>(null);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const [btn, setBtn] = useState<number>(1);

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

//   useEffect(() => {
//     if (ref.current) {
//       console.log(ref.current.children[0].getBoundingClientRect().width);
//       console.log(ref.current.children[1].getBoundingClientRect().width);
//       console.log(ref.current.children[2].getBoundingClientRect().width);
//       console.log(ref.current.children[3].getBoundingClientRect().width);
//     }
//   }, [windowWidth, windowHeight]);

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
        >
          <MdLanguage size={16} />
          Language
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
          width: `${
            ref.current &&
            ref.current.children[btn].getBoundingClientRect().width
          }px`,
          height: `${
            ref.current &&
            ref.current.children[btn].getBoundingClientRect().height
          }px`,
          position: "fixed",
          left: `${
            ref.current && ref.current.children[btn].getBoundingClientRect().x
          }px`,
          top: `${
            ref.current && ref.current.children[btn].getBoundingClientRect().y
          }px`,
        }}
        className="mover"
      ></div>
    </nav>
  );
};
