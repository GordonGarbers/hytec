import React, { useState } from "react";
import { useImageCache } from "../components/hooks/useImageCache";
import { getImageRatio } from "../utils/createImagePlaceholder";
import { Spinner } from "../components/loaders/Spinner";

interface IImgCacheProps {
  url: string;
  idx: number;
  basePath: string;
  productNamePath: string;
  imgSizeX: number;
  imgSizeY: number;
  imageAlt: string;
}

export const ImgCache: React.FC<IImgCacheProps> = ({ url, idx, basePath, productNamePath, imgSizeX, imgSizeY, imageAlt}) => {
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const handleImageOnLoad = () => {
    setIsImgLoaded(true);
  };
  
  const imageUrl = useImageCache(
    `${process.env.PUBLIC_URL}/${basePath}${productNamePath}${url}`,
    isImgLoaded
  );


  return (
    <div key = {idx} className={`${url === '01.webp' ? 'active' : ''}`}>
        <div className="w-100 overflow-hidden article-right position-relative">
        {imageUrl && (
            <img
            onLoad={handleImageOnLoad}
            width={imgSizeX}
            height={imgSizeY}
            src={isImgLoaded ? imageUrl : getImageRatio(imgSizeX, imgSizeY)}
            alt={imageAlt}
            draggable="false"
            className="w-100"
            style={{width:'100%', height:'auto'}}
            />
        )}
        {!isImgLoaded && <Spinner size={50} width={8} />}
        </div>
    </div>
  );
};

