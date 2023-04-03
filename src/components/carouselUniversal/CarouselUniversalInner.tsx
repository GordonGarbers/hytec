import React, { useState } from "react";
import { ESection, IDataDetails } from "../../interfaces/interfaces";
import Skeleton from "react-loading-skeleton";
import { HeroCircularProgress } from "../hero/HeroCircularProgress";
import { getImageRatio } from "../../utils/createImagePlaceholder";
import { Spinner } from "../loaders/Spinner";
import { useImageCache } from "../hooks/useImageCache";
import { useImagePlaceholder } from "../hooks/useImagePlaceholder";
import { ProcessText } from "../layout/ProcessText";
import { PrimaryButton } from "../primaryButton/PrimaryButton";

interface ICarouselUniversalInnerProps {
  data: IDataDetails;
  index: number;
  isDataLoaded: boolean;
  remap: number;
  section: ESection;
}

export const CarouselUniversalInner: React.FC<ICarouselUniversalInnerProps> = ({
  data,
  index,
  isDataLoaded,
  remap,
  section,
}) => {
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  //cache all images
  const imageUrl = useImageCache(data[section][index]?.image, isImgLoaded);

  const handleImageOnLoad = () => {
    setIsImgLoaded(true);
  };

  return (
    <article className="d-flex flex-column-reverse flex-lg-row w-100 position-relative">
      <div className="w-100 h-100 article-left">
        <div className="container-fluid-02 h-100 w-100 d-flex justify-content-center align-items-center mt-3 mt-sm-3 mt-lt-5  article-left-wrapper">
          <div className="ms-3 article-left-left ps-2 pe-3">
            <p className="text-uppercase text-primary">
              {!isDataLoaded ? (
                data.hero[index]?.smallTitle
              ) : (
                <Skeleton width={40} />
              )}
            </p>

            <h1 className="fw-bold fs-5">
              {!isDataLoaded ? (
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
            
            <ProcessText isLoaded={isDataLoaded} text={data.hero[index]?.text??""} />
            <div>
              {!isDataLoaded ? (
                  <PrimaryButton>{data.buttons.contact}</PrimaryButton>
              ) : (
                <Skeleton width={100} height={40} />
              )}
            </div>
          </div>
          <div  className="h-100 article-left-right"></div>
        </div>
      </div>
      <div className="w-100 overflow-hidden article-right position-relative">
        <HeroCircularProgress remap={remap}/>
        {imageUrl && (
          <img
            onLoad={handleImageOnLoad}
            src={isImgLoaded ? imageUrl : getImageRatio(1920, 1080)}
            alt="img"
            draggable="false"
            className="w-100"
          />
        )}
        {!isImgLoaded && <Spinner size={50} width={8} />}
      </div>
    </article>
  );
};
