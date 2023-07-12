import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { IProducts, IRange } from '../../interfaces/interfaces';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Spinner } from '../loaders/Spinner';
import { useWindowAndScrollDetection } from '../hooks/useWindowAndScrollDetection';
import { Variants } from 'framer-motion';
import './products.scss';
import { FilterProduct } from './FilterProduct';
import { useMediaQuery } from 'react-responsive';
import { ProductUi } from './ProductUl';
import { setNext } from '../../features/next/next.slice';
import { ProductLi } from './ProductLi';

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    rotate: -10,
    scale: 0.6,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export const Products: React.FC = () => {
  const isBigScreen = useMediaQuery({ minWidth: 1052 });
  const isMidScreen = useMediaQuery({ minWidth: 800, maxWidth: 1051 });
  const isSmScreen = useMediaQuery({ minWidth: 620, maxWidth: 799 });
  const isXsScreen = useMediaQuery({ minWidth: 450, maxWidth: 619 });
  const isXxsScreen = useMediaQuery({ minWidth: 408, maxWidth: 449 });
  const isXxxsScreen = useMediaQuery({ minWidth: 200, maxWidth: 407 });

  const { next } = useAppSelector((state: RootState) => state.next);

  const dispatch = useAppDispatch();

  const handleMoreImage = () => {
    dispatch(setNext(4));
  };

  const { categories } = useAppSelector((state: RootState) => state.categories);
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const { isScrolling, isWindowChange } = useWindowAndScrollDetection();

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );
  const { vehicleTypeCheckers } = useAppSelector(
    (state: RootState) => state.vehicleType
  );

  const [btnClicked, setBtnClicked] = useState<number>(0);

  const {
    kw,
    ps,
    displacement,
    fuelTankCapacity,
    speed,
    weight,
    liftingCapacity,
    liftingHeight,
    totalLength,
    totalWidth,
    totalHeight,
    wheelbase,
    price,
  } = useAppSelector((state: RootState) => state.filter);

  const onLiBtnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setBtnClicked(e.currentTarget.value);
    sessionStorage.setItem(
      'productsSelected',
      e.currentTarget.value.toString()
    );
  };

  useEffect(() => {
    const btnValue = sessionStorage.getItem('productsSelected') || btnClicked;
    setBtnClicked(parseInt(btnValue as string));
  }, [btnClicked]);

  const getProductsPerVehicleType = data.products.filter(
    (product: IProducts, idx: number) => {
      return vehicleTypeCheckers.includes(product.vehicleType);
    }
  );

  //FILTERING
  const filterProductArticle = getProductsPerVehicleType

    .filter((product: IProducts) => {
      return categories !== 'all'
        ? categories === product.filter.categorie ?? ''
        : true;
    })

    .filter((product: IProducts) => {
      return (
        product.filter.price >= price.min && product.filter.price <= price.max
      );
    })
    .filter((product: IProducts) => {
      return (
        product.filter.weight >= weight.min &&
        product.filter.weight <= weight.max
      );
    })
    .filter((product: IProducts) => {
      return (
        product.filter.displacement >= displacement.min &&
        product.filter.displacement <= displacement.max
      );
    })
    .filter((product: IProducts) => {
      return (
        product.filter.fuelTankCapacity >= fuelTankCapacity.min &&
        product.filter.fuelTankCapacity <= fuelTankCapacity.max
      );
    });

  const sliceFilterProductArticle = filterProductArticle.slice(0, next);

  const productArticle = sliceFilterProductArticle.map(
    (product: IProducts, idx: number) => {
      const fullImagePath = `${process.env.PUBLIC_URL}/${product.basePath}${product.productNamePath}${product.heroImage}`;

      return (
        <ProductLi
          key={idx}
          product={product}
          data={data}
          idx={idx}
          fullImagePath={fullImagePath}
          dataIsLoaded={dataIsLoaded}
        />
      );
    }
  );

  //get prices range func
  const getPricesRange = (price: IRange) => {};

  return (
    <div
      id="machinery"
      style={{ zIndex: '1' }}
      className="bg-grey-900 overflow-hidden position-relative nav-sections"
    >
      <div
        style={{
          left: 0,
          top: 0,
          backgroundColor: 'rgba(255,255,255, .3)',
          clipPath: 'polygon(0% 700px, 500px 100%, 0% 100%)',
        }}
        className="position-absolute w-100 h-100"
      ></div>

      <div className="container-fluid-02 mb-6 mt-5 mt-md-8 p-3 position-relative">
        <div className="text-primary fw-bold text-center ">HYTEC EQUIPMENT</div>
        <h1
          style={{ fontFamily: 'RobotoBlack'}}
          className="text-dark fs-6 mb-7 text-center "
        >
          {data.sections.machinery}
        </h1>
        <FilterProduct />
        <div className="ps-3 pb-3 fs-14 text-grey-500">
          <span className="fw-bold text-grey-200">
            {filterProductArticle.length}
          </span>{' '}
          {data.rest.resultsFound}
        </div>
        {dataIsLoaded ? (
          <div style={{ height: '100vh' }} className="w-100">
            {/* <StartLogoAnim/> */}
            <Spinner size={60} width={5} />
          </div>
        ) : filterProductArticle.length > 0 ? (
          <>
            {isBigScreen && (
              <ProductUi
                filterProductArticle={filterProductArticle}
                productArticle={productArticle}
                length={3}
                minMaxFirst={300}
                minMaxSecond={324}
                useLength={true}
              />
            )}

            {isMidScreen && (
              <ProductUi
                filterProductArticle={filterProductArticle}
                productArticle={productArticle}
                length={2}
                minMaxFirst={240}
                minMaxSecond={280}
                useLength={true}
              />
            )}

            {isSmScreen && (
              <ProductUi
                filterProductArticle={filterProductArticle}
                productArticle={productArticle}
                length={2}
                minMaxFirst={220}
                minMaxSecond={240}
                useLength={true}
              />
            )}

            {isXsScreen && (
              <ProductUi
                filterProductArticle={filterProductArticle}
                productArticle={productArticle}
                length={2}
                minMaxFirst={190}
                minMaxSecond={190}
                useLength={true}
              />
            )}

            {isXxsScreen && (
              <ProductUi
                filterProductArticle={filterProductArticle}
                productArticle={productArticle}
                length={100}
                minMaxFirst={190}
                useLength={false}
              />
            )}

            {isXxxsScreen && (
              <ProductUi
                filterProductArticle={filterProductArticle}
                productArticle={productArticle}
                length={100}
                minMaxFirst={180}
                useLength={false}
              />
            )}

            {next < filterProductArticle.length &&
              filterProductArticle.length !==
                sliceFilterProductArticle.length && (
                <div className="p-4 text-center mt-4 d-flex justify-content-center">
                  <button
                    onClick={handleMoreImage}
                    className="btn btn-dark fs-14 rounded-1 px-3 py-2 d-flex align-items-center gap-2"
                  >
                    {data.rest.viewMore} <HiOutlineArrowNarrowRight size={20} />
                  </button>
                </div>
              )}
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center pt-6">
            <p className={`${windowWidth > 400 ? 'fs-14' : 'fs-15'} fw-bold `}>
              {data.rest.warningNoProducts}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
