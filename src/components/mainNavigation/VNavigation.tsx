import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { NavMenuIconSM } from './NavMenuIconSM';
import { XLg } from 'react-bootstrap-icons';
import { Translate } from 'react-bootstrap-icons';
import { Ul } from './Ul';
import { Language } from './Language';

interface INavigationProps {
  windowWidth: number;
}

export const VNavigation: React.FC<INavigationProps> = ({ windowWidth }) => {
  const { menu } = useAppSelector((state: RootState) => state.menu);
  return (
    <div
      style={{
        zIndex: '99999',
        transition: `all .2s ease`,
        borderRadius: windowWidth >= 1410 ? '.3rem' : '0',
        height:'100vh',
        top:'0px'
      }}
      data-main-wrapper={menu}
      className="w-100 position-fixed bg-grey-900 ps-3 pe-2 pt-2 pb shadow-lg d-flex d-sm-none flex-column justify-content-start align-items-center main-wrapper "
    >
      <div className="d-flex justify-content-between w-100 align-items-center border-bottom pb-2">
        <div style={{ width: '120px' }}>
          <img className="w-100" src={`${process.env.PUBLIC_URL}/assets/hytec-06.png`} alt="logo" />
        </div>
        <NavMenuIconSM bool={true}>
          <XLg size={32} color="#000" />
        </NavMenuIconSM>
      </div>

      <Language/>
      <Ul windowWidth={windowWidth} />
    </div>
  );
};
