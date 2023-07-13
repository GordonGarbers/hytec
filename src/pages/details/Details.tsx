import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spinner } from '../../components/loaders/Spinner';
import { IProducts } from '../../interfaces/interfaces';
import { ImgCache } from '../ImgCache';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { ProcessText } from '../../components/layout/ProcessText';
import { PrimaryButton } from '../../components/primaryButton/PrimaryButton';
import { ContactUs } from '../../components/contactus/ContactUs';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import Skeleton from 'react-loading-skeleton';
import {
  EColors,
  EProductSections,
  TITLE,
  transitionSpeed,
} from '../../constants/constants';
import { NavDetails } from './NavDetails';

import './details.scss';
import { Table } from './Table';
import { YTDetails } from './YTDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation as swiperNavigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import { motion } from 'framer-motion';
import { RelatedProducts } from './RelatedProducts';
import { useRandomProducts } from './hooks/useRandomProducts';
import { onMainMenuShowHide } from '../../components/products/features/hideShowMainMenu.slice';
import { SparePartsAndTransport } from '../../components/SparePartsAndTransport/SparePartsAndTransport';


export const Details: React.FC = () => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const { value } = useAppSelector((state: RootState) => state.counter);
  const [showMore, setShowMore] = useState<boolean>(false);

  const { dataIsLoaded, data } = useAppSelector(
    (state: RootState) => state.data
  );

  const dispatch = useAppDispatch();
  const location = useLocation();
  const products = location.state.product as IProducts;

  const scrollToOptions = { top: 0, left: 0, behavior: 'instant' };

  const scrollTop = () => {
    window.scrollTo(scrollToOptions as unknown as ScrollToOptions);
  };

  useEffect(() => {
    scrollTop();
  }, [value]);

  useEffect(() => {
    dispatch(onMainMenuShowHide(true));
    document.title = `${TITLE} | Details`;
  }, [windowWidth]);

  const finalProduct = data.products.filter(
    (dataProducts: IProducts, idx: number) => {
      return dataProducts.id === products?.id;
    }
  )[0];

  const carouselImages = products.carouselImages.map(
    (url: string, idx: number) => {
      return (
        <SwiperSlide key={idx}>
          <ImgCache
            key={idx}
            url={url}
            idx={idx}
            basePath={products?.basePath}
            productNamePath={products?.productNamePath}
            imgSizeX={983}
            imgSizeY={737}
            imageAlt={url}
          />
        </SwiperSlide>
      );
    }
  );

  // const carouselButtons = products.carouselImages.map(
  //   (_: string, idx: number) => {
  //     return (
  //       <button
  //         key={idx}
  //         type="button"
  //         data-bs-target="#carouselExampleIndicators"
  //         data-bs-slide-to={idx}
  //         className={`${idx === 0 ? 'active' : ''}`}
  //         aria-current={`${idx === 0 ? 'true' : 'false'}`}
  //         aria-label={`Slide ${idx + 1}`}
  //       ></button>
  //     );
  //   }
  // );

  const randomProductPerCategorieElements = useRandomProducts(products);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: `${transitionSpeed}` }}
      className="details-article-wrapper"
    >
      <article className="container-fluid-02 p-3">
        <NavDetails
          finalProduct={finalProduct}
          dataIsLoaded={dataIsLoaded}
          relatedProducts={products}
          data={data}
        />
        <div className={`w-100 rounded-3`}>
          {/*  */}

          <div className="details-article">
            <div className="d-flex flex-column gap-4 details-article-left">
              {!dataIsLoaded ? (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  keyboard={{
                    enabled: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Keyboard, Pagination, swiperNavigation]}
                  className="mySwiper"
                >
                  {carouselImages}
                </Swiper>
              ) : (
                <div className="position-relative w-100 h-100">
                  <Spinner size={60} width={5} />
                </div>
              )}
            </div>

            {/*  */}
            <div
              className={`d-flex flex-column rounded-1 details-article-right`}
            >
              <div>
                <div className="fs-13 text-grey-400">
                  {!dataIsLoaded ? (
                    finalProduct?.categorie.toUpperCase()
                  ) : (
                    <Skeleton count={1} height={16} width={80} />
                  )}
                </div>
                <div className="fs-7">
                  <span style={{ fontFamily: 'RobotoBlack'}} className="text-primary">
                    HYTEC
                    <span className="fs-12" style={{ verticalAlign: 'super' }}>
                      &reg;
                    </span>
                  </span>{' '}
                  {!dataIsLoaded ? (
                    finalProduct?.name
                  ) : (
                    <div className="w-100 h-100 position-relative">
                      <Skeleton count={1} height={28} width={80} />
                    </div>
                  )}
                </div>
              </div>

              <div className="article-body h-100">
                <ProcessText
                  isLoaded={dataIsLoaded}
                  text={
                    showMore
                      ? finalProduct?.description
                        ? finalProduct?.description
                        : ''
                      : finalProduct?.description
                      ? finalProduct?.description.slice(0, 200) + '...'
                      : ''
                  }
                  size={windowWidth > 500 ? 13 : 14}
                  textColor="text-grey-500"
                >
                  <button
                    className=" fw-bold fs-15 text-dark btn btn-outline-primary-500 p-1"
                    onClick={() => setShowMore(!showMore)}
                  >
                    <span>
                      {!showMore ? data.rest.showMore : data.rest.showLess}
                    </span>{' '}
                    {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}{' '}
                  </button>
                </ProcessText>

                <div className="d-flex flex-column gap-4 article-price">
                  <div className="d-flex flex-column align-items-start bg-grey-900 p-3 rounded-1">
                    <div className="d-flex flex-row align-items-start justify-content-between w-100">
                      <div
                        className="fs-8 text-dark-light mb-4"
                        style={{ fontFamily: 'RobotoBold'}}
                      >
                        {!dataIsLoaded ? (
                          finalProduct?.price ? (
                            finalProduct?.price + ' '
                          ) : (
                            ''
                          )
                        ) : (
                          <Skeleton count={1} height={24} width={80} />
                        )}
                        <span className="fs-10 text-dark-light">&euro;</span>{' '}
                        <span className="fs-14 text-grey-500">
                          ({data.rest.vat})
                        </span>
                      </div>
                    </div>
                    {finalProduct?.extras.length > 0 && (
                      <div className=" w-100 ">
                        <h3 className="fs-13 fw-bold">
                          {data.rest.freeExtras}:
                        </h3>

                        {!dataIsLoaded ? (
                          finalProduct?.extras.map(
                            (item: string, idx: number) => {
                              return (
                                <div key={idx} className="fs-14">
                                  {''}
                                  &bull; {item}
                                </div>
                              );
                            }
                          )
                        ) : (
                          <Skeleton count={5} width={'100%'} />
                        )}
                      </div>
                    )}
                  </div>
                  {!dataIsLoaded ? (
                    <PrimaryButton fontSize={windowWidth > 500 ? 13 : 14}>
                      {data.buttons.contact}
                    </PrimaryButton>
                  ) : (
                    <Skeleton
                      count={1}
                      height={28}
                      width={'100%'}
                      baseColor={EColors.primary}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className="mt-4 w-100 bg-grey-900">
        <div className="tables-wrapper container-fluid-02 pt-6 pb-2 px-3">
          <Table
            finalProduct={finalProduct}
            sectionName={EProductSections.accessories}
            displayName={data.rest.accessories ?? ''}
            sectionClass="table-second"
            dataIsLoaded={dataIsLoaded}
            data={data}
          />
          <Table
            finalProduct={finalProduct}
            sectionName={EProductSections.specifications}
            displayName={data.rest.specifications ?? ''}
            sectionClass="table-first"
            dataIsLoaded={dataIsLoaded}
            data={data}
          />
        </div>
      </div>

      <div className="container-fluid-02 pt-6 pb-4 px-3">
        <YTDetails url={finalProduct?.video} />
      </div>
      <SparePartsAndTransport />

      <div className="w-100 mt-5 bg-grey-900 ">
        <div className="container-fluid-02 ps-3 pe-3 pt-4 pb-5">
          <div className="text-primary fw-bold text-center fs-13">
            HYTEC EQUIPMENT
          </div>
          <h1
            style={{ fontFamily: 'RobotoBlack'}}
            className="text-dark fs-8 mb-5 text-center "
          >
            {data.rest.relatedProducts}
          </h1>

          <RelatedProducts
            relatedProducts={randomProductPerCategorieElements}
          />
        </div>
      </div>
      <ContactUs />
    </motion.div>
  );
};
