import React from 'react';
import { ProcessText } from '../layout/ProcessText';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { EColors } from '../../constants/constants';
import Skeleton from 'react-loading-skeleton';
import { FaTools } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import './SparePartsAndTransport.scss'
import { ImgCache } from '../../pages/ImgCache';

export const SparePartsAndTransport = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  return (
    <div
      className="container-fluid-02 p-3 transport-container"
    >
      <div
        className="w-100 my-5 rounded-2 overflow-hidden spare-wrapper spare-transport-wrapper"
      >
        <div
          className="p-5 rounded-1 spare-transport-text-wrapper"
        >
            <div className = 'spare-transport-text'>

                <div className="d-flex align-items-center gap-3">
                    <FaTools color={`${EColors.primary}`} size={32} />
                    <h1 className = 'spare-transport-text-title' style={{ fontWeight: '900', color: `${EColors.darkLight}` }}>
                    {data.rest.sparePartsTitle}
                    </h1>
                </div>

                {!dataIsLoaded ? (
                    <ProcessText
                    isLoaded={dataIsLoaded}
                    text={data.rest.spareParts ?? ''}
                    color={EColors.skeletonBaseColorDefault}
                    size={windowWidth < 1350 ? windowWidth < 500 ? 15 : 14 : 14}
                    textColor="text-dark-light"
                    />
                ) : (
                    <Skeleton height={16} count={5} />
                )}
            </div>
        </div>

        <div className="spare-transport-image-wrapper">
          <div className='spare-image spare-transport-image-main' >
          {/* <ImgCache
            key={0}
            url="01.webp"
            idx={0}
            basePath="assets/machinery/"
            productNamePath="F170/"
            imgSizeX={983}
            imgSizeY={737}
            imageAlt="01.webp"
          /> */}
            <img
            className='spare-transport-img'
              width="983"
              height="737"
              src={`${process.env.PUBLIC_URL}/assets/machinery/F170/01.webp`}
            />
          </div>
        </div>
      </div>





      <div
        // className="w-100 my-5 rounded-3 d-flex justify-content-start overflow-hidden"
        className="w-100 my-5 rounded-2 overflow-hidden transport-wrapper spare-transport-wrapper"
      >
        <div className="spare-transport-image-wrapper" >
          <div className = 'transport-image spare-transport-image-main'>
            <img
                className='spare-transport-img'
              width="983"
              height="737"
              src={`${process.env.PUBLIC_URL}/assets/machinery/F55/01.webp`}
            />
          </div>
        </div>

        <div
          className="p-5 rounded-1 spare-transport-text-wrapper"
        >
            <div className = 'spare-transport-text'>

                <div className="d-flex align-items-center gap-3">
                    <TbTruckDelivery color={`${EColors.primary}`} size={40} />
                    <h1 className = 'spare-transport-text-title' style={{ fontWeight: '900', color: `${EColors.darkLight}` }}>
                    {data.rest.transportTitle}
                    </h1>
                </div>

                {!dataIsLoaded ? (
                    <ProcessText
                    isLoaded={dataIsLoaded}
                    text={data.rest.transport ?? ''}
                    color={EColors.skeletonBaseColorDefault}
                    size={windowWidth < 1350 ? windowWidth < 500 ? 15 : 14 : 14}
                    textColor="text-dark-light"
                    />
                ) : (
                    <Skeleton height={16} count={5} />
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
