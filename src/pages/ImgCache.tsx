import React, { useState } from "react";
import { useImageCache } from "../components/hooks/useImageCache";
import { getImageRatio } from "../utils/createImagePlaceholder";
import { Spinner } from "../components/loaders/Spinner";

interface IImgCacheProps {
  url: string;
  idx: number;
  basePath: string;
  productNamePath: string;
}

export const ImgCache: React.FC<IImgCacheProps> = ({ url, idx, basePath, productNamePath}) => {
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const handleImageOnLoad = () => {
    setIsImgLoaded(true);
  };

  const imageUrl = useImageCache(
    `${process.env.PUBLIC_URL}/${basePath}${productNamePath}${url}`,
    isImgLoaded
  );


  return (
    <div key = {idx} className={`carousel-item ${url === '01.webp' ? 'active' : ''}`}>
        <div className="w-100 overflow-hidden article-right position-relative">
        {imageUrl && (
            <img
            onLoad={handleImageOnLoad}
            src={isImgLoaded ? imageUrl : getImageRatio(983, 737)}
            alt="img"
            draggable="false"
            className="w-100"
            />
        )}
        {!isImgLoaded && <Spinner size={50} width={8} />}
        </div>
    </div>
  );
};
