import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getImageRatio } from "../utils/createImagePlaceholder";
import { Spinner } from "../components/loaders/Spinner";
import { useImageCache } from "../components/hooks/useImageCache";
import { IDataDetails, IProducts } from "../interfaces/interfaces";
import { ImgCache } from "./ImgCache";

interface INavigateType {
  product: IProducts;
  data: IDataDetails;
}

export const Details: React.FC = () => {
  const location = useLocation();

  const products = location.state.product as IProducts;
  const data = location.state.data as IDataDetails;

  console.log(products.productNamePath);

  // create images for carousel
  const carouselImages = products.carouselImages.map(
    (url: string, idx: number) => {
      return <ImgCache key={idx} url={url} idx={idx} basePath = {products.basePath} productNamePath={products.productNamePath}/>;
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
    <div style={{ minHeight: "100vh", zIndex: "1", marginTop:'200px'}}>
      <div className="container-fluid-02">
        <div
        style={{transition:'all 1s ease'}}
          id="carouselExampleIndicators"
          className="carousel slide overflow-hidden rounded-2 w-50"
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
      </div>
    </div>
  );
};