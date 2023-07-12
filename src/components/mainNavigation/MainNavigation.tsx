import React from 'react';
import './navigation.scss';
import { List } from 'react-bootstrap-icons';
import { NavMenuIconSM } from './NavMenuIconSM';
import { useAppSelector } from '../../app/hooks';
import { HNavigation } from './HNavigation';
import { VNavigation } from './VNavigation';
import { RootState } from '../../app/store';
import { motion } from 'framer-motion';
import { useRefresh } from '../hooks/useRefresh';

export const MainNavigation = () => {
  const { windowWidth, scrollY } = useRefresh();
  const { showHideMainMenu } = useAppSelector(
    (state: RootState) => state.hideShowMainMenu
  );

  return (
    <>
      <motion.nav
        style={{ top: '60px', zIndex: '2' }}
        className={`position-fixed w-100 nav-mover`}
      >
        <div
          style={{ zIndex: '1' }}
          className="position-fixed d-flex align-items-center mb-3 gap-4 gap-sm-1 menu-translate"
        >
          {!showHideMainMenu ? (
            <NavMenuIconSM bool={false}>
              <List size={32} color="#fff" />
            </NavMenuIconSM>
          ) : (
            <></>
          )}
        </div>
        {!showHideMainMenu ? (
          windowWidth > 620 ? (
            <HNavigation windowWidth={windowWidth} />
          ) : (
            <VNavigation windowWidth={windowWidth} />
          )
        ) : (
          <></>
        )}
      </motion.nav>
    </>
  );
};
