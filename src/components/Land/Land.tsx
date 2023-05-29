import React, { useEffect, useRef, useState } from 'react';
import { logoPos } from '../../constants/constants';
import { logoPosType } from '../../constants/constants';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getImageRatio } from '../../utils/createImagePlaceholder';
import { Spinner } from '../loaders/Spinner';
import Tilt from 'react-parallax-tilt';
import Skeleton from 'react-loading-skeleton';
import { PrimaryButton } from '../primaryButton/PrimaryButton';
import { ProcessText } from '../layout/ProcessText';
import { EColors } from '../../constants/constants';
import './land.scss'

const variants = {
  from: {
    scale: 0.5,
    opacity: 0,
  },
  to: {
    scale: 1,
    opacity: 1,
  },
};

const variantsText = {
  from: {
    y: -40,
    opacity: 0,
  },
  to: {
    y: 0,
    opacity: 1,
  },
};

export const Land: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const handleImageOnLoad = () => {
    setIsImgLoaded(true);
  };

  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  const ref = useRef<HTMLDivElement>(null);

  const logoPosElements = logoPos.map((item: logoPosType, idx: number) => {
    return (
      <motion.div
        variants={variants}
        initial="from"
        whileInView="to"
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          delay: scrollY > 400 ? 0.1 * idx : 0,
          type: 'spring',
          stiffness: 100,
        }}
        key={idx}
        style={{
          maxWidth: windowWidth <= 620 ? '90px' : '110px',
          top: `${item.x}%`,
          left: `${item.y}%`,
        }}
        className="position-absolute"
      >
        <img
          style={{ width: '100%' }}
          className="bg-dark-light border border-1 border-grey-400 p-2 rounded-2 shadow"
          src={`${process.env.PUBLIC_URL}/assets/hytec-05.png`}
          alt="hytec-logo"
        />
      </motion.div>
    );
  });

  return (
    <div
      id="aboutus" 
      style={{ backgroundColor: '#fff', zIndex:'0'}}
      className="w-100 h-100 position-relative nav-sections"
    >
      {/* <div style={{clipPath: 'polygon(0% 30%, 100% 10%, 100% 0%, 0% 0%)', zIndex:'-1'}}className="w-100 h-100 bg-grey-900 position-absolute"/> */}
      {/* <div className="parent position-absolute w-100">
        <div className="my-element-to-clip bg-primary"></div>
      </div>
      <svg width="0" height="0">
        <defs>
          <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
            <path
              d="M 0,1
									L 0,0
									L 1,0
									L 1,1
									C .65 .4, .9 .8, 0 .2
									Z"
            />
          </clipPath>
        </defs>
      </svg> */}
      <div className="container-fluid-02 d-flex flex-column flex-lg-row w-100 align-items-center py-6">
        <div
          ref={ref}
          style={{ maxWidth: '600px' }}
          className="position-relative w-100"
        >
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} perspective={1000}>
            <div className="w-100 h-100">
              <img
                onLoad={handleImageOnLoad}
                style={{ width: '100%', filter: 'brightness(150%)' }}
                src={
                  isImgLoaded
                    ? `${process.env.PUBLIC_URL}/assets/png/DE_01.png`
                    : getImageRatio(2392, 3198)
                }
                alt="DE-map"
              />
            </div>

            {!isImgLoaded ? <Spinner size={50} width={8} /> : logoPosElements}
          </Tilt>
        </div>
        <motion.div

          variants={variantsText}
          initial="from"
          whileInView="to"
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            delay: 0,
            type: 'spring',
            stiffness:100
            // duration: 0.5,
          }}

          className="article-left-left w-100 px-4 px-sm-9 px-lg-8 mt-5 mt-lg-0"
        >
          <h1 className="fs-5" style={{fontWeight:900}}>
            {!dataIsLoaded ? (
              <>
                {data.dealer?.titleNormalBefore}{' '}
                <span className="text-primary">{data.dealer?.titleAccent}</span>{' '}
                {data.dealer?.titleNormalAfter}
              </>
            ) : (
              <Skeleton count={1} baseColor={EColors.primary} />
            )}
          </h1>
          <ProcessText
            isLoaded={dataIsLoaded}
            text={data.dealer?.text ?? ''}
            color={EColors.primary}
            size={13}
            textColor="text-dark-light"
          />

          <div>
            {!dataIsLoaded ? (
              <PrimaryButton>{data.buttons.apply}</PrimaryButton>
            ) : (
              <Skeleton width={100} height={40} baseColor={EColors.primary} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
