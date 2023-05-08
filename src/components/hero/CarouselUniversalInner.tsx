import React, { useState } from 'react';
import { ESection, IDataDetails, IHero } from '../../interfaces/interfaces';
import Skeleton from 'react-loading-skeleton';
import { HeroCircularProgress } from './HeroCircularProgress';
import { getImageRatio } from '../../utils/createImagePlaceholder';
import { Spinner } from '../loaders/Spinner';
import { useImageCache } from '../hooks/useImageCache';
import { useImagePlaceholder } from '../hooks/useImagePlaceholder';
import { ProcessText } from '../layout/ProcessText';
import { PrimaryButton } from '../primaryButton/PrimaryButton';
import { motion } from 'framer-motion';
import { EColors } from '../../constants/constants';
import { ArrowButtons } from './ArrowButtons';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

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
      <div className="hero-image-wrapper w-100 d-flex position-relative">

          <div
            className="hero-image "
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)',
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>


        <div className="container-fluid-02 d-flex align-items-center px-5 ">
          <div className="w-50">
            <p className="text-uppercase text-primary">
              {!isDataLoaded ? (
                page?.smallTitle
              ) : (
                <Skeleton width={40} baseColor={EColors.primary} />
              )}
            </p>

            <h1 className="fs-5" style={{ fontWeight: 900 }}>
              {!isDataLoaded ? (
                <>
                  {page?.titleNormalBefore}{' '}
                  <span className="text-primary">{page?.titleAccent}</span>{' '}
                  {page?.titleNormalAfter}{' '}
                </>
              ) : (
                <Skeleton count={1} />
              )}
            </h1>

            <ProcessText
              isLoaded={isDataLoaded}
              text={page?.text ?? ''}
              color={EColors.skeletonBaseColorDefault}
              size={13}
              textColor="text-dark-light"
            />
            <div>
              {!isDataLoaded ? (
                <PrimaryButton>{data.buttons.contact}</PrimaryButton>
              ) : (
                <Skeleton width={100} height={40} baseColor={EColors.primary} />
              )}
            </div>
          </div>
        </div>

        {/* <div>

              <img
                onLoad={handleImageOnLoad}
                src={isImgLoaded ? imageUrl : getImageRatio(1920, 1080)}
                alt="img"
                draggable="false"
                className="hero-image"
                width="1920"
                height="1080"
                // style={{width:'100vw', height:'100vh'}}
              /> 
          </div> */}
        {/* {imageUrl && (

        )}
        {!isImgLoaded && <Spinner size={50} width={8} />} */}
      </div>
    </article>
    // <article className="container-fluid-02  d-flex flex-column-reverse flex-lg-row w-100 position-relative">

    //   <div className="w-100 overflow-hidden article-right position-relative">
    //     {imageUrl && (
    //       <img
    //         onLoad={handleImageOnLoad}
    //         src={isImgLoaded ? imageUrl : getImageRatio(1920, 1080)}
    //         alt="img"
    //         draggable="false"
    //         className="w-100"
    //       />
    //     )}
    //     {!isImgLoaded && <Spinner size={50} width={8} />}
    //   </div>

    // </article>
  );
};
