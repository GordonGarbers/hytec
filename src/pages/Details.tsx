import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getImageRatio } from "../utils/createImagePlaceholder";
import { Spinner } from "../components/loaders/Spinner";
import { useImageCache } from "../components/hooks/useImageCache";
import { IDataDetails, IProducts } from "../interfaces/interfaces";
import { ImgCache } from "./ImgCache";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ProcessText } from "../components/layout/ProcessText";
import { PrimaryButton } from "../components/primaryButton/PrimaryButton";
import { IoIosArrowForward } from "react-icons/io";
import { addCategory } from "../features/products/productCategories/productCategories.slice";
import { onMinMaxSave } from "../components/products/features/minMaxValues.slice";
import { ContactUs } from "../components/contactus/ContactUs";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { EColors } from "../constants/constants";

interface INavigateType {
  product: IProducts;
  data: IDataDetails;
}

export const Details: React.FC = () => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const [showMore, setShowMore] = useState<boolean>(false);

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const location = useLocation();
  const products = location.state.product as IProducts;
  // const data = location.state.data as IDataDetails;

  //scrolling
  const scrollToOptions = { top: 0, left: 0, behavior: "instant" };

  const scrollTop = () => {
    window.scrollTo(scrollToOptions as unknown as ScrollToOptions);
  };

  useEffect(() => {
    scrollTop();
  }, []);
  //

  const finalProduct = data.products.filter(
    (dataProducts: IProducts, idx: number) => {
      return dataProducts.id === products?.id;
    }
  )[0];

  // create images for carousel
  const carouselImages = products.carouselImages.map(
    (url: string, idx: number) => {
      return (
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
      );
    }
  );

  //create buttons form carousel
  const carouselButtons = products.carouselImages.map(
    (_: string, idx: number) => {
      return (
        <button
          key={idx}
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={idx}
          className={`${idx === 0 ? "active" : ""}`}
          aria-current={`${idx === 0 ? "true" : "false"}`}
          aria-label={`Slide ${idx + 1}`}
        ></button>
      );
    }
  );

  return (
    <div style={{ minHeight: "100vh", zIndex: "1", marginTop: "130px" }}>
      <article className="container-fluid-02 p-3">
        {/* <h3 className="fs-9 mb-4">
          <span style={{ fontWeight: "900" }} className="text-primary">
            HYTEC
          </span>{" "}
          {finalProduct?.name}
        </h3> */}
        <nav className="fs-14 d-flex align-items-center gap-1 mb-3">
          <NavLink to={process.env.PUBLIC_URL} className="text-grey-400">
            Home
          </NavLink>

          <IoIosArrowForward className="text-primary" />

          <NavLink to={process.env.PUBLIC_URL} className="text-grey-400">
            {!dataIsLoaded ? (
              finalProduct?.categorie ? (
                decodeURIComponent(finalProduct?.categorie)
              ) : (
                ""
              )
            ) : (
              <Skeleton count={1} width={60} />
            )}
          </NavLink>

          <IoIosArrowForward className="text-primary" />

          <div className="text-grey-400">
            {!dataIsLoaded ? (
              finalProduct?.name ? (
                decodeURIComponent(finalProduct?.name)
              ) : (
                ""
              )
            ) : (
              <Skeleton count={1} width={60} />
            )}
          </div>
        </nav>
        <div className={`w-100 rounded-3`} style={{}}>
          {/*  */}

          {/* <div className="d-grid" style={{gridTemplateColumns:'fit-content(700px) auto', gap:'20px'}}> */}
          {/* <div className="d-grid gap-5" style={{gridTemplateColumns:'repeat(minmax(300px, 1fr))'}}> */}
          <div className="d-flex gap-4" >
            <div className="d-flex flex-column gap-4" style={{ width: "60%" }}>
              {
                !dataIsLoaded
                ?

                  <div
                    style={{ transition: "all .3s ease" }}
                    id="carouselExampleIndicators"
                    className={`carousel slide overflow-hidden rounded-1`}
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">{carouselButtons}</div>
                    <div className="carousel-inner">{carouselImages}</div>

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                :
                <div className="position-relative w-100 h-100">

                  <Spinner size={60} width={5} />
                </div>
              }
              </div>

            {/*  */}
            <div
              className={`d-flex flex-column gap-5 justify-content-between p-4 rounded-1`}
              style={{ width: "40%", backgroundColor: "#fff" }}
            >
              <div className="d-flex flex-column">
                <div className="fs-13 text-grey-400">
                  {!dataIsLoaded ? (
                    finalProduct?.categorie.toUpperCase()
                  ) : (
                    <Skeleton count={1} height={16} width={80} />
                  )}
                </div>
                <div className="fs-6">
                  <span style={{ fontWeight: "900" }} className="text-primary">
                    HYTEC
                  </span>{" "}
                  {!dataIsLoaded ? (
                    finalProduct?.name
                  ) : (
                    <div className="w-100 h-100 position-relative">

                      <Skeleton count={1} height={28} width={80} />
                    </div>
                  )}
                </div>

                <ProcessText
                  isLoaded={dataIsLoaded}
                  text={
                    showMore
                      ? finalProduct?.description
                        ? finalProduct?.description
                        : ""
                      : finalProduct?.description
                      ? finalProduct?.description.slice(0, 200) + "..."
                      : ""
                  }
                  size={14}
                  textColor="text-grey-500"
                >
                  <button
                    className=" fw-bold fs-15 text-dark btn btn-outline-primary-500 p-1"
                    onClick={() => setShowMore(!showMore)}
                  >
                    <span>show {!showMore ? "more" : "less"}</span>{" "}
                    {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}{" "}
                  </button>
                </ProcessText>
              </div>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-column align-items-start bg-grey-900 p-3 rounded-1">
                  <div className="d-flex flex-row align-items-start justify-content-between w-100">
                    <div
                      className="fs-8 text-dark-light mb-4"
                      style={{ fontWeight: "800" }}
                    >
                      {!dataIsLoaded ? (
                        finalProduct?.price ? (
                          finalProduct?.price + " "
                        ) : (
                          ""
                        )
                      ) : (
                        <Skeleton count={1} height={24} width={80} />
                      )}
                      <span className="fs-10 text-dark-light">&euro;</span>{" "}
                      <span className="fs-14 text-grey-500">(zzgl. MwSt.)</span>
                    </div>
                  </div>
                  <div className=" w-100 ">
                    <h3 className="fs-13 fw-bold">Kostenlose Extras:</h3>

                    {!dataIsLoaded ? (
                      finalProduct?.extras.map((item: string, idx: number) => {
                        return (
                          <div key={idx} className="fs-14">
                            {" "}
                            &bull; {item}
                          </div>
                        );
                      })
                    ) : (
                      <Skeleton count={5}  width={"100%"} />
                    )}
                  </div>
                </div>
                {!dataIsLoaded 
                  ? <PrimaryButton>{data.buttons.contact}</PrimaryButton> 
                  : <Skeleton count={1} height={28} width={"100%"} baseColor={EColors.primary}/>
                }
                
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
