import React from 'react';
import { Numbers } from '../numbers/Numbers';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { ProcessText } from '../layout/ProcessText';
import { EColors } from '../../constants/constants';
import Skeleton from 'react-loading-skeleton';
import { YellowDetails } from '../yellowDetails/YellowDetails';
import { SideFollowUs } from '../sideFollowUs/SideFollowUs';
import './aboutus.scss';

export const AboutUs = () => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );
  return (
    <div className="py-7">
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

          {/* <div
            className="aboutus-image position-relative rounded-3"
            
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/assets/carusel/baumachine_01.webp)`,
            }}
          ></div> */}
          {/* <div className='aboutus-image d-flex align-items-center justify-content-center p-5 rounded-2'>
            <svg width="284" height="197" viewBox="0 0 284 197" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.5 31.5L1 1.5L117.5 47L126.5 74H158L166.5 47L283 1L256 31.5L180 55.5L163 97.5L183.5 61L241.5 47L222 68.5L180 74L212 79L195 98L172 88L188.5 105L177.5 117.5L164 103.5L175.5 129.5L169 142.5L155.5 123.5L164 151.5L144.5 196.5V120L154.5 85H129.5L139 120V196.5L119.5 151.5L128 123.5L115 142.5L108.5 129.5L119.5 103.5L106 117.5L95.5 105L111.5 88L88.5 98L72.5 79L104 74L62 68.5L42.5 47L100.5 61L121 98L104 55.5L27.5 31.5Z" fill={`${EColors.darkLight}`} stroke="#373943" stroke-width="0"/>
            </svg>
          </div> */}

        </div>

        <Numbers />
        {/* <YellowDetails/> */}
      </div>
    </div>
  );
};
