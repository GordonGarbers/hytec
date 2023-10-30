import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { onMainMenuShowHide } from '../components/products/features/hideShowMainMenu.slice';
import './pageNotFound.scss';
import { EColors } from '../constants/constants';

export const PageNotFound = () => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(onMainMenuShowHide(true));
  }, [windowWidth]);


  return (
    <>
      <div className="details-article-wrapper h-100 w-100 position-relative d-flex align-items-center">
            <div
              className="container-fluid-02 p-3"
              style={{ position: 'relative', zIndex: '1' }}
            >
              <div className="d-flex align-items-center justify-content-center pb-8">
                <div className='d-flex flex-column align-items-center justify-content-center '>
                  <h1 style={{fontWeight:'900', fontFamily:'RobotoBlack'}} className="fs-2 text-primary">404</h1>
                  <div className='fs-6 fw-bold text-dark-light'>Page doesn't exist!</div>
                  <div className='sorry text-dark-light'>Sorry, the page you are looking for could not be found.</div>
                  <button
          style={{ fontFamily: 'RobotoMedium', position: 'relative' }}
          onClick={() => {navigate('/')}}
          className={`btn btn-primary btn-to-details fs-13 fs-sm-12 rounded-1 d-flex gap-2 align-items-center px-2 px-sm-3 text-dark-form mt-3`}
        >
            <span className='position-relative' style={{zIndex:'2'}}>

                Back to home
            </span>
          <div
            className="btn-details-inner"
            style={{

              backgroundColor: `${EColors.primaryMono}`,

            }}
          ></div>
        </button>
                </div>
              </div>
            </div>
      </div>
    </>
  );
};
