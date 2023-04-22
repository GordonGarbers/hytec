import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getImageRatio } from "../utils/createImagePlaceholder";
import { Spinner } from "../components/loaders/Spinner";
import { useImageCache } from "../components/hooks/useImageCache";
import { IDataDetails, IProducts } from "../interfaces/interfaces";
import { ImgCache } from "./ImgCache";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ProcessText } from "../components/layout/ProcessText";
import { PrimaryButton } from "../components/primaryButton/PrimaryButton";

interface INavigateType {
  product: IProducts;
  data: IDataDetails;
}

export const Details: React.FC = () => {
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
        <nav className="fs-14">

          <NavLink
            to="/"
            className='text-dark'
          >
            Home 
          </NavLink>

          <NavLink
            to="/"
            className='text-dark'
          >
            /{decodeURIComponent(finalProduct?.categorie)}
          </NavLink>

          <NavLink
            to={`/${finalProduct?.categorie}/${finalProduct?.name}`}
            className='text-dark'
          >
            /{decodeURIComponent(finalProduct?.name)}
          </NavLink>

        </nav>
        <div className="w-100 d-flex flex-column flex-lg-row gap-5">
          <div
            style={{ transition: "all 1s ease" }}
            id="carouselExampleIndicators"
            className="carousel slide overflow-hidden rounded-2  w-100"
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

          <div className=" w-100">
            <h3 className="fs-9 mb-4">
              <span style={{ fontWeight: "900" }} className="text-primary">
                HYTEC
              </span>{" "}
              {finalProduct?.name}
            </h3>
            <ProcessText
              isLoaded={dataIsLoaded}
              text={finalProduct?.description}
              size={14}
            />
            <PrimaryButton>{data.buttons.contact}</PrimaryButton>
          </div>
        </div>
      </article>
    </div>
  );
};
function stringToBytes(originalString: string) {
  throw new Error("Function not implemented.");
}
