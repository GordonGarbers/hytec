import React from 'react';
import { MAXIMUM_CONTAINER_WIDTH } from '../../constants/constants';
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { FaYoutube } from 'react-icons/fa';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import Skeleton from 'react-loading-skeleton';

export const Footer: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );
  return (
    <>
      <footer className="bg-dark" style={{zIndex:'1'}}>
        <div
          style={{ maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px`}}
          className="container-fluid-02 gap-2 py-4 px-3 fs-15  text-grey-600 d-flex flex-column flex-sm-row align-items-center justify-content-between"
        >
          <div
            style={{ fontWeight: '300' }}
            className="list-unstyled d-flex gap-2 gap-sm-3 gap-md-4 align-items-center justify-content-center"
          >
            <a className="text-decoration-none text-grey-600 p-1 rounded-1" href="#">
              {!dataIsLoaded ? (
                data.footer.imprint ?? ''
              ) : (
                <Skeleton width={60} baseColor="#4e5058" />
              )}
            </a>
            <a className="text-decoration-none text-grey-600 p-1 rounded-1" href="#">
            {!dataIsLoaded ? (
                data.footer.privacyPolicy?? ''
              ) : (
                <Skeleton width={60} baseColor="#4e5058" />
              )}
            </a>
            <a className="text-decoration-none text-grey-600 p-1 rounded-1" href="#">
            {!dataIsLoaded ? (
                data.footer.termsAndConditions ?? ''
              ) : (
                <Skeleton width={80} baseColor="#4e5058" />
              )}
            </a>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-3 gap-sm-5">
            <div className="d-flex align-items-center gap-2 gap-sm-3 gap-md-5">
              <a
                className="text-grey-600"
                href="https://www.facebook.com/HytecBaumaschinen/"
              >
                <BsFacebook size={18} />
              </a>
              <a
                className="text-grey-600"
                href="https://www.instagram.com/hytec_baumaschinen/"
              >
                <AiFillInstagram size={20} />
              </a>
              <a
                className="text-grey-600"
                href="https://www.youtube.com/watch?v=CJW59TkI1ic"
              >
                <FaYoutube size={20} />
              </a>
            </div>
            <div>&copy; 2023 Hytec Baumaschinen GmbH</div>
          </div>
        </div>
      </footer>
    </>
  );
};
