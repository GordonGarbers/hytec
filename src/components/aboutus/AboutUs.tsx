import React from 'react';
import { Numbers } from '../numbers/Numbers';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { ProcessText } from '../layout/ProcessText';
import { EColors } from '../../constants/constants';
import Skeleton from 'react-loading-skeleton';
import { SideFollowUs } from '../sideFollowUs/SideFollowUs';
import './aboutus.scss';

export const AboutUs = () => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );
  return (
    <div id="aboutus" className="pb-6 pt-6 pt-sm-8 nav-sections">
      <div
        className="container-fluid-02 d-flex flex-column justify-content-center align-items-center position-relative"
        style={{ zIndex: '1' }}
      >
        <div className="aboutus-wrapper w-100 d-flex justify-content-center gap-6">
          <div
            className="d-flex flex-column justify-content-start align-items-center px-3"
            style={{ maxWidth: '500px' }}
          >
            <div>
              <div className="text-primary fw-bold text-center">
                HYTEC COMPANY
              </div>
              <h1
                style={{ fontWeight: 900 }}
                className="fs-5 text-dark text-center"
              >
                {data.sections.aboutus}
              </h1>
            </div>
            <div className="">
              {!dataIsLoaded ? (
                <ProcessText
                  isLoaded={dataIsLoaded}
                  text={data.text.aboutus ?? ''}
                  color={EColors.skeletonBaseColorDefault}
                  size={windowWidth < 1350 ? 14 : 13}
                  textColor="text-dark-light"
                />
              ) : (
                <Skeleton height={16} count={5} />
              )}
              <SideFollowUs />
            </div>
          </div>
        </div>

        <Numbers />
      </div>
    </div>
  );
};
