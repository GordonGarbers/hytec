import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { onMainMenuShowHide } from '../components/products/features/hideShowMainMenu.slice';
import { Spinner } from '../components/loaders/Spinner';
import { ContactUs } from '../components/contactus/ContactUs';

export const ImprintInfo = () => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  const dispatch = useAppDispatch();

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(onMainMenuShowHide(true));
  }, [windowWidth]);

  const imprint = data.imprint.map((row: string, idx: number) => {
    return (
      <div
        className={`
        fs-13
        ${idx === 0 ? 'fw-bold' : ''}
        ${idx === 1 || idx === 2 ? 'text-grey-400' : ''}
        ${(idx === 2 || idx === 5) ? 'pb-2' : ''}
        `}
        key={idx}
      >
        {row}
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
              <div className="d-flex align-items-center justify-content-center py-6">
                <div>
                  <h1 className="fw-bold">{data.footer.imprint || ''}</h1>
                  <div className="d-flex flex-column py-4">{imprint}</div>
                </div>
              </div>
            </div>
            <ContactUs />
          </div>
        ) : (
          <Spinner size={80} width={4} />
        )}
      </div>
    </>
  );
};
