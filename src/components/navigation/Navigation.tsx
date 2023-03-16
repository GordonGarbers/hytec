import React, { useRef, useEffect, useState, SetStateAction } from 'react';
import { MdLanguage } from 'react-icons/md';
import './navigation.scss';
import { motion } from 'framer-motion';
import { List } from 'react-bootstrap-icons';
import { XLg } from 'react-bootstrap-icons';
import { Translate } from 'react-bootstrap-icons';
import { Li } from './Li';
import useForceUpdate from 'use-force-update';

interface ElementBoundingBox {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

const variants = {
  initial: {
    x: '0%',
    transition: {
      type: 'tween',
    },
  },
  animate: {
    x: '-100%',
    transition: {
      type: 'tween',
    },
  },
};

const navButtons = ['Home', 'Machinery', 'About us', 'Contact'];

export const Navigation = () => {
  const forceUpdate = useForceUpdate();

  const ref = useRef<HTMLUListElement>(null);

  const [btn, setBtn] = useState<{ value: number; name: string }>({
    value: 0,
    name: '',
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
        e.currentTarget.textContent?.split(' ').join('').toLowerCase() ?? '',
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
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  const onMenuClick = () => {
    setMenu(!menu);
  };

  const width =
    ref.current &&
    ref.current.children[btn.value].getBoundingClientRect().width;
  const height =
    ref.current &&
    ref.current.children[btn.value].getBoundingClientRect().height;
  const x =
    ref.current && ref.current.children[btn.value].getBoundingClientRect().x;
  const y =
    ref.current && ref.current.children[btn.value].getBoundingClientRect().y;

  // useEffect(() => {
  //   if (windowWidth > 620) setMenu(true)
  //   else setMenu(true)
  // }, []);

  return (
    <>
      <nav style={{ top: '74px' }} className="position-fixed w-100">
        <div
          style={{ zIndex: '1' }}
          className="position-fixed d-flex align-items-center mb-3 gap-4 gap-sm-0 menu-translate"
        >
          <div onClick={onMenuClick} className="d-block d-sm-none">
            {menu ? (
              <List size={32} color="#fff" />
            ) : (
              <XLg size={32} color="#fff" />
            )}
          </div>
        </div>

        <motion.div
          variants={variants}
          animate={menu ? 'animate' : 'initial'}
          // , translate: `${menu ? '100%' : '0%'}`
          style={{ maxWidth: '1400px' }}
          data-menu={`${menu}`}
          className="container-fluid bg-grey-900 ps-3 ps-sm-5 pe-2 pe-sm-3 pt-3 pb shadow-0 shadow-sm-lg d-flex justify-content-center justify-content-sm-between align-items-center main-wrapper "
        >
          <div className="mb-3 gap-4 gap-sm-0 language d-flex align-items-center">
          {/* <div style={{width:'160px'}} className = 'me-4'>
            <img style={{width:'100%'}} src = 'assets/hytec-yellow.webp' alt='img'/>
          </div> */}
            <div
              role="button"
              data-add-btn={false}
              className="me-auto d-flex align-items-center gap-2 text-secondary"
              style={{ color: '#000' }}
            >
              <Translate size={18} color="#000" />
              EN | DE
            </div>
          </div>

          <ul
            ref={ref}
            className=" text-secondary list-unstyled d-flex flex-column flex-sm-row gap-4 gap-sm-6 px-3"
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
                    item.split(' ').join('').toLowerCase() === btn.name &&
                    windowWidth < 620
                      ? 'selected-button'
                      : ''
                  }
                />
              );
            })}
            {/* <Li btnName="Home" value={0} data={false} func={onLiBtnClick}/>
          <Li btnName="Machinery" value={1} data={false} func={onLiBtnClick}/>
          <Li btnName="About us" value={2} data={false} func={onLiBtnClick}/>
          <Li btnName="Contact" value={3} data={false} func={onLiBtnClick}/> */}
          </ul>
        </motion.div>
      </nav>
      <div
        className={`mover fw-bold text-secondary position-fixed ${
          windowWidth < 620 ? 'd-none' : 'd-block'
        } d-sm-block`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: ` ${x}px`,
          top: `${y}px`,
        }}
      ></div>
    </>
  );
};
