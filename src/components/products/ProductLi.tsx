import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { IDataDetails, IProducts } from '../../interfaces/interfaces';
import { useAppSelector } from '../../app/hooks';
import { Spinner } from '../loaders/Spinner';
import { getImageRatio } from '../../utils/createImagePlaceholder';
import { RootState } from '../../app/store';
import { EColors } from '../../constants/constants';
import { useImageCache } from '../hooks/useImageCache';
import { ToDetailsBtn } from '../ToDetailsBtn/ToDetailsBtn';

interface IProductLiProps {
  product: IProducts;
  data: IDataDetails;
  idx: number;
  fullImagePath: string;
  dataIsLoaded: boolean;
}

export const ProductLi: React.FC<IProductLiProps> = ({
  product,
  data,
  idx,
  fullImagePath,
  dataIsLoaded,
}) => {
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const imageUrl = useImageCache(fullImagePath, isImgLoaded);
  console.log('--PATH: ', fullImagePath);

  const handleImageOnLoad = () => {
    setIsImgLoaded(true);
  };

  return (
    <li
      value={idx}
      key={product.id}
      style={{
        backgroundColor: '#fff',
      }}
      className="w-100 rounded-2 shadow-sm position-relative list overflow-hidden"
    >
      <div className="w-100 position-relative" style={{}}>
        {!isImgLoaded && <Spinner size={50} width={8} />}
        <img
          onLoad={handleImageOnLoad}
          src={isImgLoaded ? fullImagePath : getImageRatio(983, 737)}
          className={`${
            windowWidth > 327 && windowWidth < 487 ? 'p-1' : 'p-3'
          }`}
          style={{ width: '100%', height: 'auto' }}
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
            style={{ fontWeight: '400' }}
          >
            {product.name}
          </p>
        ) : (
          <Skeleton count={1} width={40} />
        )}

        {!dataIsLoaded ? (
          <p
            style={{ fontWeight: '400', lineHeight: '1rem' }}
            className={`fs-15 fs-sm-14 text-grey-500 ${
              windowWidth > 327 && windowWidth < 487 ? 'mb-2' : 'mb-3'
            } mb-sm-5`}
          >
            {product.description.substring(
              0,
              windowWidth > 428 && windowWidth < 487 ? 65 : 130
            ) + '...'}
          </p>
        ) : (
          <Skeleton count={3} />
        )}

        <div className=" details-button">
          <ToDetailsBtn
            dataIsLoaded={dataIsLoaded}
            product={product}
            data={data}
            fullWidth={false}
            reloadPage={false}
          />

          {!dataIsLoaded ? (
            <div className="fw-bold text-dark-light fs-12">
              {product.price} <span className="fw-bold fs-14">&euro;</span>
            </div>
          ) : (
            <Skeleton count={1} width={50} />
          )}
        </div>
      </div>
    </li>
  );
};
