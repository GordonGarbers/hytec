import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { IProducts } from "../../interfaces/interfaces";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { EColors } from "../../constants/constants";
import Skeleton from "react-loading-skeleton";
import { getImageRatio } from "../../utils/createImagePlaceholder";
import { Spinner } from "../loaders/Spinner";
import { useWindowAndScrollDetection } from "../hooks/useWindowAndScrollDetection";
import { AnimatePresence, motion } from "framer-motion";
import "./products.scss";
import { SideFollowUs } from "../sideFollowUs/SideFollowUs";
import { FilterProduct } from "./FilterProduct";
import { useMediaQuery } from "react-responsive";

// const variants = {
//   from: {
//     scale: 0.7,
//     opacity: 0,
//   },
//   to: {
//     scale: 1,
//     opacity: 1,
//   },
// };

const imageToLoad = 4;

export const Products: React.FC = () => {
  const isBigScreen = useMediaQuery({ minWidth: 1052 });
  const isMidScreen = useMediaQuery({ minWidth: 800, maxWidth: 1051 });
  const isSmScreen = useMediaQuery({ minWidth: 620, maxWidth: 799 });
  const isXsScreen = useMediaQuery({ minWidth: 450, maxWidth: 619 });
  const isXxsScreen = useMediaQuery({ minWidth: 408, maxWidth: 449 });
  const isXxxsScreen = useMediaQuery({ minWidth: 200, maxWidth: 407 });

  const [next, setNext] = useState<number>(imageToLoad);

  const handleMoreImage = () => {
    setNext(next + imageToLoad);
  };

  const { categories } = useAppSelector((state: RootState) => state.categories);
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const { isScrolling, isWindowChange } = useWindowAndScrollDetection();
  // const [clicked, setClicked] = useState<boolean>(false);

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [btnClicked, setBtnClicked] = useState<number>(0);

  const ref = useRef<HTMLUListElement>(null);

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

  const filterProductArticle = data.products
    .slice(0, next)
    .filter((product: IProducts) => {
      return categories.includes(product.filter.categorie ?? "");
    });

  const productArticle = filterProductArticle.map(
    (product: IProducts, idx: number) => {
      const fullImagePath = `${product.basePath}${product.productNamePath}${product.heroImage}`;
      return (
        <li
          onClick={onLiBtnClick}
          value={idx}
          key={product.id}
          style={{
            backgroundColor: "#fff",
            transition: "all 1s ease",
          }}
          className="w-100 rounded-2 shadow-sm position-relative list"
        >
          {idx === btnClicked ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={btnClicked}
                initial={{ scale: .7, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                // exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="underline bg-primary rounded-2"
                layoutId="underline"
                style={{ outline: `10px solid ${EColors.primary}` }}
              />
            </AnimatePresence>
          ) : null}

          <div className="w-100 position-relative" style={{}}>
            {!isImgLoaded && <Spinner size={50} width={8} />}
            <img
              onLoad={handleImageOnLoad}
              // src={fullImagePath}
              src={isImgLoaded ? fullImagePath : getImageRatio(1067, 756)}
              className={`${windowWidth > 327 && windowWidth < 487 ? 'p-1' : 'p-3'}`}
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
                className={`fs-15 fs-sm-14 text-grey-500 ${windowWidth > 327 && windowWidth < 487 ? 'mb-2' : 'mb-3'} mb-sm-5`}
              >
                {product.description.substring(0, windowWidth > 327 && windowWidth < 487 ? 65 : 130) + "..."}
              </p>
            ) : (
              <Skeleton count={3} />
            )}

            <div className=" details-button">
              {!dataIsLoaded ? (
                <button
                  style={{ fontWeight: 600 }}
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

  return (
    <div
      style={{ zIndex: "1" }}
      className="bg-grey-900 overflow-hidden position-relative"
    >
      <div className="container-fluid-02 mb-6 mt-5 mt-md-8 p-3 position-relative">
        <div className="text-primary fw-bold text-center ">HYTEC EQUIPMENT</div>
        <h1
          style={{ fontWeight: "900" }}
          className="text-dark fs-6 mb-5 text-center "
        >
          Browse our machinery
        </h1>
        <FilterProduct />
        {dataIsLoaded ? (
          <div style={{ height: "500px" }} className="w-100">
            {/* <StartLogoAnim/> */}
            <Spinner size={60} width={5} />
          </div>
        ) : (
          <>
            {isBigScreen && (
              <ul
                ref={ref}
                style={{
                  display: "grid",
                  gap: "1.5rem",
                  gridTemplateColumns: `repeat( auto-fit, minmax(300px, ${
                    filterProductArticle.length <= 3 ? "324px" : "1fr"
                  }))`,
                }}
                className="w-100 h-100 list-unstyled grid-wrapper"
              >
                {productArticle}
              </ul>
            )}

            {isMidScreen && (
              <ul
                ref={ref}
                style={{
                  display: "grid",
                  gap: "1.5rem",
                  gridTemplateColumns: `repeat( auto-fit, minmax(240px, ${
                    filterProductArticle.length <= 2 ? "280px" : "1fr"
                  }))`,
                }}
                className="w-100 h-100 list-unstyled grid-wrapper"
              >
                {productArticle}
              </ul>
            )}

            {isSmScreen && (
              <ul
                ref={ref}
                style={{
                  display: "grid",
                  gap: "1.2rem",
                  gridTemplateColumns: `repeat( auto-fit, minmax(220px, ${
                    filterProductArticle.length <= 2 ? "240px" : "1fr"
                  }))`,
                }}
                className="w-100 h-100 list-unstyled grid-wrapper"
              >
                {productArticle}
              </ul>
            )}

            {isXsScreen && (
              <ul
                ref={ref}
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: `repeat( auto-fit, minmax(190px, ${
                    filterProductArticle.length <= 2 ? "200px" : "1fr"
                  }))`,
                }}
                className="w-100 h-100 list-unstyled grid-wrapper"
              >
                {productArticle}
              </ul>
            )}

            {isXxsScreen && (
              <ul
                ref={ref}
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: `repeat( auto-fit, minmax(180px, ${
                    filterProductArticle.length <= 2 ? "140px" : "1fr"
                  }))`,
                }}
                className="w-100 h-100 list-unstyled grid-wrapper"
              >
                {productArticle}
              </ul>
            )}

            {isXxxsScreen && (
              <ul
                ref={ref}
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: `repeat( auto-fit, minmax(140px, 1fr))`,
                }}
                className="w-100 h-100 list-unstyled grid-wrapper"
              >
                {productArticle}
              </ul>
            )}

            {next < data.products.length && (
              <div className="p-4 text-center mt-4 d-flex justify-content-center">
                <button
                  onClick={handleMoreImage}
                  className="btn btn-dark fs-14 rounded-1 px-3 py-2 d-flex  align-items-center gap-2"
                >
                  View more <HiOutlineArrowNarrowRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
