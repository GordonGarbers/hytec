import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { NavMenuIconSM } from './NavMenuIconSM';
import { XLg } from 'react-bootstrap-icons';
import { Ul } from './Ul';
import { Language } from './Language';
import { useSpy } from './hooks/useSpy';
import { Svg } from '../header/Svg';

interface INavigationProps {
  windowWidth: number;
}

export const VNavigation: React.FC<INavigationProps> = ({ windowWidth }) => {
  const { menu } = useAppSelector((state: RootState) => state.menu);

  useSpy(-100);

  return (
    <div
      style={{
        zIndex: '99999',
        transition: `all .2s ease`,
        borderRadius: windowWidth >= 1410 ? '.3rem' : '0',
        height: '100vh',
        top: '0px',
      }}
      data-main-wrapper={menu}
      className="w-100 position-fixed bg-grey-900 ps-3 pe-2 pt-2 pb shadow-lg d-flex d-sm-none flex-column justify-content-start align-items-center main-wrapper "
    >
      <div className="d-flex justify-content-between w-100 align-items-center border-bottom pb-2">
        {/* <div style={{ width: '120px' }}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/hytec-06.png`}
            width={256}
            height={72}
            style={{ width: '100%', height: 'auto' }}
            alt="logo"
          />
        </div> */}
                <div className="logo-header" data-mdb-animation-start="onHover">
          <Svg
            initialColor="#26272c"
            animateColor="#26272c"
            strokeWidth={1.5}
            strokeColor="#26272c"
            delay={1.5}
            delayConst={0.2}
            duration={1}
            repeat={0}
            size={317}
          />
        </div>
        <NavMenuIconSM bool={true}>
          <XLg size={32} color="#000" />
        </NavMenuIconSM>
      </div>

      <Language />
      <div className="mt-8"></div>
      <Ul windowWidth={windowWidth} />
    </div>
  );
};
