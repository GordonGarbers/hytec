import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { onMainMenuShowHide } from '../components/products/features/hideShowMainMenu.slice';

export const ImprintInfo = () => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(onMainMenuShowHide(true));
  }, [windowWidth]);

  return (
    <>
      <div className='details-article-wrapper'>

        <div
          className="container-fluid-02 p-3"
          style={{ position: 'relative', zIndex: '1' }}
        >
          <p>IMPRINT</p>
        </div>

      </div>
    </>
  );
};
