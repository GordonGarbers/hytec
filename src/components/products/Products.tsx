import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { IDataDetails, IProducts, IRange } from "../../interfaces/interfaces";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { EColors } from "../../constants/constants";
import Skeleton from "react-loading-skeleton";
import { getImageRatio } from "../../utils/createImagePlaceholder";
import { Spinner } from "../loaders/Spinner";
import { useWindowAndScrollDetection } from "../hooks/useWindowAndScrollDetection";
import { AnimatePresence, motion } from "framer-motion";
import "./products.scss";
import { FilterProduct } from "./FilterProduct";
import { useMediaQuery } from "react-responsive";
import { ProductUi } from "./ProductUl";
import { Centerize } from "../layout/Centerize";
import { useNavigate } from "react-router-dom";
import { setNext } from "../../features/next/next.slice";

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
    dispatch(setNext(next + 4));
  };

  const { categories } = useAppSelector((state: RootState) => state.categories);
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const { isScrolling, isWindowChange } = useWindowAndScrollDetection();

  const navigate = useNavigate();

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
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

  // const ref = useRef<HTMLUListElement>(null);


  const handleImageOnLoad = () => {
    setIsImgLoaded(true);
  };

  const onLiBtnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setBtnClicked(e.currentTarget.value);
    sessionStorage.setItem(
      "productsSelected",
      e.currentTarget.value.toString()
    );
  };

  useEffect(() => {
    const btnValue = sessionStorage.getItem("productsSelected") || btnClicked;
    setBtnClicked(parseInt(btnValue as string));
  }, [btnClicked]);

  

  //FILTERING
  const filterProductArticle = data.products
    .slice(0, next)
    .filter((product: IProducts) => {
      return categories !== "all"
        ? categories === product.filter.categorie ?? ""
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


  const onDetailsChange = (product: IProducts) => {
    navigate(`details/${product.categorie}/${product.name}`, {
      state: { product, data },
    });
  };

  const productArticle = filterProductArticle.map(
    (product: IProducts, idx: number) => {
      const fullImagePath = `${product.basePath}${product.productNamePath}${product.heroImage}`;
      return (
        <li
          // onMouseEnter ={onLiBtnClick}
          onClick={onLiBtnClick}
          value={idx}
          key={product.id}
          style={{
            backgroundColor: "#fff",
          }}
          className="w-100 rounded-2 shadow-sm position-relative list overflow-hidden"
        >
          {idx === btnClicked ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={btnClicked}
                  initial={{ scale: 0.7, opacity: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  // exit={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  // className="underline bg-primary rounded-2"
                  className="underline bg-primary"
                  layoutId="underline"
                  // style={{ outline: `10px solid ${EColors.primary}` }}
                />
              </AnimatePresence>
            </>
          ) : null}

          <div className="w-100 position-relative" style={{}}>
            {!isImgLoaded && <Spinner size={50} width={8} />}
            <img
              onLoad={handleImageOnLoad}
              // src={fullImagePath}
              src={isImgLoaded ? fullImagePath : getImageRatio(1067, 756)}
              className={`${
                windowWidth > 327 && windowWidth < 487 ? "p-1" : "p-3"
              }`}
              style={{ width: "100%" }}
              loading="lazy"
              alt={product.productNamePath}
            />
          </div>

          <div className="w-100 p-3 text-dark" style={{ fontWeight: 500 }}>
            {!dataIsLoaded ? (
              <div className="text-primary-dark fs-15">
                {product.categorie.toUpperCase()}
              </div>
            ) : (
              <Skeleton count={1} width={60} baseColor={EColors.primary} />
            )}
            {!dataIsLoaded ? (
              <p
                className="fs-11 fs-sm-9 fw-bold text-dark-light"
                style={{ fontWeight: "400" }}
              >
                {product.name}
              </p>
            ) : (
              <Skeleton count={1} width={40} />
            )}

            {!dataIsLoaded ? (
              <p
                style={{ fontWeight: "400", lineHeight: "1rem" }}
                className={`fs-15 fs-sm-14 text-grey-500 ${
                  windowWidth > 327 && windowWidth < 487 ? "mb-2" : "mb-3"
                } mb-sm-5`}
              >
                {product.description.substring(
                  0,
                  windowWidth > 428 && windowWidth < 487 ? 65 : 130
                ) + "..."}
              </p>
            ) : (
              <Skeleton count={3} />
            )}

            <div className=" details-button">
              {!dataIsLoaded ? (
                <button
                  style={{ fontWeight: 600 }}
                  onClick={() => onDetailsChange(product)}
                  className="btn btn-primary fs-13 fs-sm-12 rounded-1 d-flex gap-2 align-items-center px-2 px-sm-3 text-dark-form"
                >
                  Details <HiOutlineArrowNarrowRight size={20} />
                </button>
              ) : (
                <Skeleton
                  count={1}
                  width={100}
                  height={40}
                  baseColor={EColors.primary}
                />
              )}
              {!dataIsLoaded ? (
                <div className="fw-bold text-dark-light fs-12">
                  {product.price}
                </div>
              ) : (
                <Skeleton count={1} width={50} />
              )}
            </div>
          </div>
        </li>
      );
    }
  );

  //get prices range func
  const getPricesRange = (price: IRange) => {};

  return (
    <div
      style={{ zIndex: "1" }}
      className="bg-grey-900 overflow-hidden position-relative"
    >
      
      <div
        style={{
          left: 0,
          top: 0,
          backgroundColor: "rgba(255,255,255, .3)",
          clipPath: "polygon(0% 700px, 500px 100%, 0% 100%)",
        }}
        className="position-absolute w-100 h-100"
      ></div>

      <div className="container-fluid-02 mb-6 mt-5 mt-md-8 p-3 position-relative">
        <div className="text-primary fw-bold text-center ">HYTEC EQUIPMENT</div>
        <h1
          style={{ fontWeight: "900" }}
          className="text-dark fs-6 mb-7 text-center "
        >
          Browse our machinery
        </h1>
        <FilterProduct />
        <div className="ps-3 pb-3 fs-14 text-grey-500"><span className="fw-bold text-grey-200">{filterProductArticle.length}</span> {filterProductArticle.length === 1 ? "result" : "results"} found</div>
        {dataIsLoaded ? (
          <div style={{ height: "500px" }} className="w-100">
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

            {next < data.products.length && (
              <div className="p-4 text-center mt-4 d-flex justify-content-center">
                <button
                  onClick={handleMoreImage}
                  className="btn btn-dark fs-14 rounded-1 px-3 py-2 d-flex align-items-center gap-2"
                >
                  View more <HiOutlineArrowNarrowRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center pt-6">
            <p className={`${windowWidth > 400 ? "fs-14" : "fs-15"} fw-bold `}>
              Sorry, no machinery were found matching your filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
