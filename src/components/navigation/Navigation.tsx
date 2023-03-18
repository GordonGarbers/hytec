import React, { useRef, useEffect, useState, SetStateAction } from "react";
import "./navigation.scss";
import { motion } from "framer-motion";
import { List } from "react-bootstrap-icons";
import { XLg } from "react-bootstrap-icons";
import { Translate } from "react-bootstrap-icons";
import { Li } from "./Li";

const variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
  },
};

const navButtons = ["Home", "Machinery", "About us", "Contact"];

export const Navigation = () => {
  const ref = useRef<HTMLUListElement>(null);

  const [btn, setBtn] = useState<{ value: number; name: string }>({
    value: 0,
    name: "",
  });
  const [menu, setMenu] = useState<boolean>(false);

  // const [child, setChild] = useState<ElementBoundingBox>();

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const onLiBtnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setBtn({
      value: e.currentTarget.value,
      name:
        e.currentTarget.textContent?.split(" ").join("").toLowerCase() ?? "",
    });
    // if (
    //   ref.current?.children[btnValue] &&
    //   ref.current?.children[btnValue].getBoundingClientRect()
    // )
    //   setChild(ref.current?.children[btnValue].getBoundingClientRect());
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

  useEffect(() => {
    if (windowWidth > 620) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }, [windowWidth]);

  // useEffect(() => {
  //   if (!menu) document.body.style.overflow = "hidden";
  //   else document.body.style.overflow = "auto";
  // }, [menu]);
  

  const width =
    ref.current &&
    ref.current.children[btn.value].getBoundingClientRect().width;
  const height =
    ref.current &&
    ref.current.children[btn.value].getBoundingClientRect().height;
  const x =
    ref.current && ref.current.children[btn.value].getBoundingClientRect().x;
  const y =
    ref.current &&
    ref.current.children[btn.value].getBoundingClientRect().y + 16;

  console.log(windowWidth);
  return (
    <>
      <nav
        style={{ top: "60px", zIndex: "2" }}
        className="position-fixed w-100"
      >
        <div
          style={{ zIndex: "1" }}
          className="position-fixed d-flex align-items-center mb-3 gap-4 gap-sm-0 menu-translate"
        >
          <motion.div
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 800 }}
            onClick={() => setMenu(false)}
            className="d-block d-sm-none"
          >
            <List size={32} color="#fff" />
          </motion.div>
        </div>

        <div
          style={{
            maxWidth: "1400px",
            zIndex: "99999",
            transition: `all .2s ease`,
          }}
          data-main-wrapper={menu}
          className="container-fluid bg-grey-900 ps-3 ps-sm-5 pe-2 pe-sm-3 pt-2 pt-sm-2 pb shadow-lg d-flex flex-column flex-sm-row justify-content-start justify-content-sm-between align-items-center main-wrapper "
        >
          <div className="d-flex justify-content-between d-sm-none w-100 align-items-center border-bottom pb-2">
            <div style={{ width: "120px" }}>
              <img className="w-100" src="assets/hytec-06.png" alt="logo" />
            </div>
            <motion.div
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 800 }}
              onClick={() => setMenu(true)}
              className="d-block d-sm-none pe-2"
            >
              <XLg size={32} color="#000" />
            </motion.div>
          </div>

          <div className="mb-3 mt-5 mt-sm-1 me-auto me-sm-0 gap-4 gap-sm-0 language d-flex align-items-center">
            <div
              role="button"
              data-add-btn={false}
              className="me-auto d-flex align-items-center gap-2 text-secondary fs-13"
              style={{ color: "#000" }}
            >
              <Translate size={18} color="#000" />
              EN | DE
            </div>
          </div>

          <ul
            ref={ref}
            className=" text-secondary mt-7 mt-sm-1 list-unstyled d-flex flex-column align-items-start flex-sm-row gap-4 gap-sm-6 px-3 pb-0"
          >
            {navButtons.map((item: string, idx: number) => {
              return (
                <Li
                  key={idx}
                  btnName={item}
                  value={idx}
                  data={false}
                  func={onLiBtnClick}
                  name={
                    item.split(" ").join("").toLowerCase() === btn.name &&
                    windowWidth < 620
                      ? "selected-button"
                      : ""
                  }
                />
              );
            })}
          </ul>
        </div>
      </nav>
      <div
        className={`mover fw-bold text-secondary position-fixed ${
          windowWidth < 620 ? "d-none" : "d-block"
        } d-sm-block`}
        style={{
          zIndex: "3",
          width: `${width}px`,
          height: `${height}px`,
          left: ` ${x}px`,
          top: `${y}px`,
        }}
      ></div>
    </>
  );
};
