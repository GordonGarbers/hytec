import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { IProducts } from "../../interfaces/interfaces";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { ProcessText } from "../layout/ProcessText";
import { EColors } from "../../constants/constants";
import Skeleton from "react-loading-skeleton";
import { imageCacheBetter } from "../hooks/imageCacheBetter";

export const Products: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [cachedImages, setCachedImages] = useState<string>("");

  const productArticle = data.products.map(
    (product: IProducts, idx: number) => {
      const fullImagePath = `${product.basePath}${product.productNamePath}${product.heroImage}`;

    //   imageCacheBetter(fullImagePath)
    //   .then((cachedImageUrl) => {
    //     setCachedImages(cachedImageUrl)
        
    //   })
    //   .catch((error) => {
    //     // obrada greške
    //   });


      return (
        <article
            key={product.id}
          style={{ backgroundColor: "#fff" }}
          className="w-100 overflow-hidden rounded-2 shadow-sm"
        >
          <img
            src={fullImagePath}
            className="p-3"
            alt={product.productNamePath}
            style={{ width: "100%" }}
          />
          <div className="w-100 p-3 text-dark" style={{fontWeight:500}}>
            {!dataIsLoaded ? (
              <div className="text-primary-dark fs-15">
                {product.categorie.toUpperCase()}
              </div>
            ) : (
              <Skeleton count={1} width={60} baseColor={EColors.primary}/>
            )}
            {!dataIsLoaded ? (
              <p
                className="fs-9 fw-bold text-dark-light"
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
                className="fs-14 text-grey-500 mb-5"
              >
                {product.description.substring(0, 130) + "..."}
              </p>
            ) : (
              <Skeleton count={3} />
            )}

            <div className="d-flex flex-row-reverse justify-content-between align-items-center">
                {!dataIsLoaded ? (
                <button
                    style={{ fontWeight: 600 }}
                    className="btn btn-primary fs-12 rounded-1 d-flex gap-2 align-items-center px-3 text-dark-form"
                >
                    Details <HiOutlineArrowNarrowRight size={20} />
                </button>
                ) : (
                <Skeleton count={1} width={100} height={40} baseColor={EColors.primary}/>
                )}
                {!dataIsLoaded ? (
                    <div className="fw-bold text-dark-light fs-12">{product.price}</div>
                ) : (
                <Skeleton count={1} width={50} />
                )}
            </div>
            


          </div>
        </article>
      );
    }
  );

  return (
    <div style={{ zIndex: "1" }} className="bg-grey-900">
      <div className="container-fluid-02 mb-6 mt-8 p-3">
        <div className="text-primary fw-bold text-center ">HYTEC EQUIPMENT</div>
        <h1
          style={{ fontWeight: "900" }}
          className="text-dark fs-6 mb-6 text-center "
        >
          Browse our machinery
        </h1>
        <div
          className="w-100 h-100"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
            gap: "1.5rem",
          }}
        >
          {productArticle}
        </div>
      </div>
    </div>
  );
};
