import React, { useRef, useEffect, useState } from 'react';
import { MdLanguage } from 'react-icons/md';
import { List } from 'react-bootstrap-icons';
import { XLg } from 'react-bootstrap-icons';
import { Translate } from 'react-bootstrap-icons';
import './navigation.scss';
import { motion } from 'framer-motion';

const variants = {
  initial: { x: 0 },
  animate: { x: '100%' },
};

export const Navigation = () => {
  const ref = useRef<HTMLUListElement>(null);
  const [btn, setBtn] = useState<number>(1);
  const [menu, setMenu] = useState<boolean>(false);

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
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);



  return (
    <nav className="">
      <div
        onClick={() => setMenu(!menu)}
        style={{ top: '65px', right: '10px', zIndex:'99999999'}}
        className="d-sm-none position-fixed"
      >
        {menu ? <List size={30} /> : <XLg size={30} />}
      </div>
      <motion.div
        variants={variants}
        animate={menu ? 'animate' : 'initial'}
        style={{ maxWidth: '1400px' }}
        className="position-relative container-fluid 3bg-grey-900 px-1 pt-3 pb-1 rounded-bottom shadow-lg  d-flex flex-column flex-sm-row justify-content-between align-items-center"
      >
        <div className="w-100 w-xs-0 me-auto d-flex flex-row align-items-center mb-3 justify-content-between px-3">
          <div
            role="button"
            data-add-btn={false}
            className="d-flex align-items-center gap-2 "
          >
            <Translate size={20} />
            EN
          </div>
        </div>
        <ul
          ref={ref}
          style={{ fontWeight: '600', zIndex: '1', position: 'relative' }}
          className={`list-unstyled flex-column flex-sm-row align-items-center gap-3 px-3 d-flex`}
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
            About&nbsp;us
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
        className={`mover`}
        style={{
          transition: 'all .3s ease',
          zIndex: '-1',
          position: 'absolute',
          overflow: 'hidden',
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
      ></div>
    </nav>
  );
};
