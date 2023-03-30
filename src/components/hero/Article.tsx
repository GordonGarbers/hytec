import React, { useState } from "react";
import { IHeroDetails } from "../../interfaces/interfaces";
import Skeleton from "react-loading-skeleton";
import { HeroCircularProgress } from "./HeroCircularProgress";
import { getImageRatio } from "../../utils/createImagePlaceholder";
import { Spinner } from "../spinner/Spinner";

interface IArticleProps {
  data: IHeroDetails;
  index: number;
  isHeroDataLoaded: boolean;
  remap: number;
}

export const Article: React.FC<IArticleProps> = ({
  data,
  index,
  isHeroDataLoaded,
  remap,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleImageOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <article className="d-flex flex-column-reverse flex-lg-row w-100 position-relative">
      {/* <div className="position-absolute bg-primary h-100 yellow-detail"></div> */}
      <div className="w-100 h-100 article-left">
        <div className="container-fluid-02 h-100 w-100 d-flex justify-content-center align-items-center mt-3 mt-sm-3 mt-lt-5  article-left-wrapper">
          <div className="ms-3 article-left-left">
            <p className="text-uppercase text-primary">
              {!isHeroDataLoaded ? (
                data.hero[index]?.smallTitle
              ) : (
                <Skeleton width={40} />
              )}
            </p>

            <h1 className="fw-bold fs-5">
              {!isHeroDataLoaded ? (
                <>
                  {data.hero[index]?.titleNormalBefore}{" "}
                  <span className="text-primary">
                    {data.hero[index]?.titleAccent}
                  </span>{" "}
                  {data.hero[index]?.titleNormalAfter}{" "}
                </>
              ) : (
                <Skeleton count={1} />
              )}
            </h1>
            <p className="mt-3 mt-sm-4 fs-13">
              {!isHeroDataLoaded ? data.hero[index]?.text : <Skeleton count={4} />}
            </p>
            <div>
              {!isHeroDataLoaded ? (
                <button className="btn btn-primary mt-2 mt-sm-3 rounded-2">
                  Contact us
                </button>
              ) : (
                <Skeleton width={100} height={40} />
              )}
            </div>
          </div>
          <div className="h-100 article-left-right"></div>
        </div>
      </div>
      <div className="w-100 overflow-hidden article-right position-relative">
        <HeroCircularProgress remap={remap} />
        <img
          onLoad={handleImageOnLoad}
          src={isLoaded ? data.hero[index]?.image : getImageRatio(1920, 1080)}
          alt="img"
          draggable="false"
          className="w-100"
        />

        {/* {!isLoaded && (
          <img src={getImageRatio(1920, 1080)} alt="img" className="w-100" />
        )}
        <img
          onLoad={handleImageOnLoad}
          src={data[index]?.image}
          alt="img"
          draggable="false"
          className="w-100"
        /> */}

        {!isLoaded &&<Spinner size={50} width={8}/>}
      </div>
    </article>
  );
};
