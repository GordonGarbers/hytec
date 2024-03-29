import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { onMainMenuShowHide } from '../components/products/features/hideShowMainMenu.slice';
import { Spinner } from '../components/loaders/Spinner';

export const PrivacyPolicy = () => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(onMainMenuShowHide(true));
  }, [windowWidth]);

  const privacyPolicy = data.privacyPolicy.map((row: string, idx: number) => {
    const isDiv = row.includes('&div')
    const isBold = row.includes('&bold')
    const tempRow = row.replace('&div', '').replace('&bold', '')
    return (
        <div key={idx}>
            {
                isDiv
                ?
                <div key={idx} className={`${isBold ? 'fw-bold' : ''}`}>{tempRow}</div>
                :
                <p key={idx} className={`${isBold ? 'fw-bold' : ''}`}>{tempRow}</p>
            }
        </div>
    );
  });

  return (
    <>
      <div className="details-article-wrapper h-100 w-100 position-relative">
        {!dataIsLoaded ? (
          <div>
            <div
              className="container-fluid-02 p-3"
              style={{ position: 'relative', zIndex: '1' }}
            >
              <div className="d-flex align-items-center justify-content-center py-6" style={{maxWidth:'800px'}}>
                <div>
                  <h1 className="fw-bold">{data.footer.privacyPolicy || ''}</h1>
                  <div className={`d-flex flex-column py-4 fs-${windowWidth < 400 ? '15' : '13'} `}>{privacyPolicy}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Spinner size={80} width={4} />
        )}
      </div>
    </>
  );
};
