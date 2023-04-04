import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { IProducts } from '../../interfaces/interfaces';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { ProcessText } from '../layout/ProcessText';
import { EColors } from '../../constants/constants';
import Skeleton from 'react-loading-skeleton';
import { imageCacheBetter } from '../hooks/imageCacheBetter';
import { getImageRatio } from '../../utils/createImagePlaceholder';
import { Spinner } from '../loaders/Spinner';
import { Mover } from '../mover/Mover';
import { useRefresh } from '../hooks/useRefresh';
import debounce from 'lodash/debounce';
import { useWindowAndScrollDetection } from '../hooks/useWindowAndScrollDetection';
import './products.scss';
// import _ from 'lodash';

export const Products: React.FC = () => {
  const { isScrolling, isWindowChange } = useWindowAndScrollDetection();

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

    // sessionStorage.setItem("btnValue3", e.currentTarget.value.toString());
  };

  // useEffect(() => {
  //   const btnValue = sessionStorage.getItem("btnValue") || btnClicked;
  //   setBtnClicked(parseInt(btnValue as string))
  //   // dispatch(
  //   //   setNavButton({
  //   //     activeBtnValue: parseInt(btnValue as string),
  //   //   })
  //   // );
  // }, [btnClicked]);

  const productArticle = data.products.map(
    (product: IProducts, idx: number) => {
      const fullImagePath = `${product.basePath}${product.productNamePath}${product.heroImage}`;

      return (
        <li
          // onMouseEnter={onLiBtnClick}
          onClick={onLiBtnClick}
          value={idx}
          key={product.id}
          style={{ backgroundColor: '#fff' }}
          className="w-100 overflow-hidden rounded-2 shadow-sm"
        >
          <div className="w-100 position-relative" style={{}}>
            {!isImgLoaded && <Spinner size={50} width={8} />}
            <img
              onLoad={handleImageOnLoad}
              // src={fullImagePath}
              src={isImgLoaded ? fullImagePath : getImageRatio(1067, 756)}
              className="p-3"
              style={{ width: '100%' }}
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
                className="fs-15 fs-sm-14 text-grey-500 mb-3 mb-sm-5"
              >
                {product.description.substring(0, 130) + '...'}
              </p>
            ) : (
              <Skeleton count={3} />
            )}

            <div className="d-flex flex-row-reverse justify-content-between align-items-center">
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
    <div style={{ zIndex: '1' }} className="bg-grey-900 overflow-hidden">
      <div className="container-fluid-02 mb-6 mt-5 mt-md-8 p-3">
        <div className="text-primary fw-bold text-center ">HYTEC EQUIPMENT</div>
        <h1
          style={{ fontWeight: '900' }}
          className="text-dark fs-6 mb-6 text-center "
        >
          Browse our machinery
        </h1>
        <ul
          ref={ref}
          className="w-100 h-100 list-unstyled grid-wrapper"
        >
          {productArticle}
        </ul>
        {ref.current?.children && ref.current?.children.length > 0 && (
          <Mover
            ulRef={ref}
            btnToMove={btnClicked}
            offest={0}
            bgColor={true}
            zIndex="-1"
            expand={20}
            rounded={true}
            speed={isScrolling || isWindowChange ? 0 : 0.4}
          />
        )}
      </div>
    </div>
  );
};
