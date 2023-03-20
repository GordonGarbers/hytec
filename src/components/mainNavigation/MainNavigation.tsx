import React, { useEffect, useState } from 'react';
import './navigation.scss';
import { List } from 'react-bootstrap-icons';
import { NavMenuIconSM } from './NavMenuIconSM';
import { useAppDispatch } from '../../app/hooks';
import { HNavigation } from './HNavigation';
import { VNavigation } from './VNavigation';
import { Container } from '../layout/Container';

export const MainNavigation = () => {
  const dispatch = useAppDispatch();

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

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
    <>
      <nav
        style={{ top: '60px', zIndex: '2' }}
        className="position-fixed w-100"
      >
        <div
          style={{ zIndex: '1' }}
          className="position-fixed d-flex align-items-center mb-3 gap-4 gap-sm-0 menu-translate"
        >
          <NavMenuIconSM bool={false}>
            <List size={32} color="#fff" />
          </NavMenuIconSM>
        </div>
        <HNavigation windowWidth={windowWidth} />
        <VNavigation windowWidth={windowWidth} />
      </nav>
    </>
  );
};
