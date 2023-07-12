import React, { useState } from 'react';
import { IDataDetails, IHero } from '../../interfaces/interfaces';
import Skeleton from 'react-loading-skeleton';
import { useImageCache } from '../hooks/useImageCache';
import { ProcessText } from '../layout/ProcessText';
import { PrimaryButton } from '../primaryButton/PrimaryButton';
import { EColors, ESizes } from '../../constants/constants';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';


interface ICarouselUniversalInnerProps {
  data: IDataDetails;
  page: IHero;
  isDataLoaded: boolean;
}

export const CarouselUniversalInner: React.FC<ICarouselUniversalInnerProps> = ({
  data,
  page,
  isDataLoaded,
}) => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const imageUrl = useImageCache(
    `${process.env.PUBLIC_URL}/${page?.image}`,
    isImgLoaded
  );

  const handleImageOnLoad = () => {
    setIsImgLoaded(true);
  };

  return (

      <article className="w-100">
        <div className="container-fluid-02 hero-text-image-wrapper position-relative">
          <div className="hero-text-wrapper">
            <div className="hero-text">
              <p className="text-uppercase text-primary hero-text-p">
                {!isDataLoaded ? (
                  page?.smallTitle
                ) : (
                  <Skeleton width={40} baseColor={EColors.primary} />
                )}
                
              </p>

              <h1 className={`hero-text-h1`} style={{ fontFamily: 'RobotoBlack'}}>
                {!isDataLoaded ? (
                  <>
                    {page?.titleNormalBefore}{' '}
                    {
                      page?.titleAccent.toUpperCase() !== 'HYTEC'
                      ?
                      <span className="text-primary">{page?.titleAccent}</span>
                      :
                      <span style={{position:'relative'}} className="text-primary">{page?.titleAccent}<span className='fs-9' style={{verticalAlign:'super'}}>&reg;</span></span>
                    }
                    {' '}
                    {page?.titleNormalAfter}{' '}
                  </>
                ) : (
                  <Skeleton count={2} />
                )}
              </h1>

              <div>
                {!isDataLoaded ? (
                  <ProcessText
                    isLoaded={isDataLoaded}
                    text={page?.text ?? ''}
                    color={EColors.skeletonBaseColorDefault}
                    size={windowWidth < 1350 ? 14 : 13}
                    textColor="text-dark-light"
                  />
                ) : (
                  <Skeleton height={16} count={5} />
                )}
              </div>

              <div>
                {!isDataLoaded ? (
                  <PrimaryButton fontSize={13}>{data.buttons.contact}</PrimaryButton>
                ) : (
                  <Skeleton width={100} height={40} baseColor={EColors.primary} />
                )}
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div
              className="hero-image position-relative"
              style={{ 
                backgroundImage: `url(${process.env.PUBLIC_URL}/${page?.image})`,
              }}
            >
            </div>
          </div>


        </div>
      </article>

  );
};
