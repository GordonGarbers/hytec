import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { NavMenuIconSM } from './NavMenuIconSM';
import { XLg } from 'react-bootstrap-icons';
import { Translate } from 'react-bootstrap-icons';
import { Ul } from './Ul';

interface INavigationProps {
  windowWidth: number;
}

export const HNavigation: React.FC<INavigationProps> = ({ windowWidth }) => {
  // const { menu } = useAppSelector((state: RootState) => state.menu);
  return (
    <div
      style={{
        maxWidth: '1400px',
        zIndex: '99999',
        transition: `all .2s ease`,
        borderRadius: windowWidth >= 1410 ? '.3rem' : '0',
        height:'auto',
      }}
      // data-main-wrapper={menu}
      className="container-fluid position-relative bg-grey-900 ps-3 ps-sm-5 pe-2 pe-sm-3 pt-2 pt-sm-2 pb shadow-lg d-none d-sm-flex flex-column flex-sm-row justify-content-start justify-content-sm-between align-items-center main-wrapper "
    >
      <div className="d-flex justify-content-between d-sm-none w-100 align-items-center border-bottom pb-2">
        <div style={{ width: '120px' }}>
          <img className="w-100" src="assets/hytec-06.png" alt="logo" />
        </div>
        <NavMenuIconSM bool={true}>
          <XLg size={32} color="#000" />
        </NavMenuIconSM>
      </div>

      <div
        role="button"
        data-add-btn={false}
        className="position-relative me-auto d-flex align-items-center gap-2 text-secondary fs-13 mb-3 mt-5 mt-sm-1 me-auto me-sm-0 language"
        style={{ color: '#000' }}
      >
        <Translate size={18} color="#000" />
        EN | DE
      </div>
      <Ul windowWidth={windowWidth} />
    </div>
  );
};
