import React from 'react';
import { IDataDetails, IProducts } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import { EColors } from '../../constants/constants';
import { useAppDispatch } from '../../app/hooks';
import { increment } from '../../features/counter/counterSlice';
import { onMainMenuShowHide } from '../products/features/hideShowMainMenu.slice';

interface IToDetailsBtnProps {
  dataIsLoaded: boolean;
  product: IProducts;
  data: IDataDetails;
  fullWidth?: boolean;
  reloadPage: boolean;
}

export const ToDetailsBtn: React.FC<IToDetailsBtnProps> = ({
  dataIsLoaded,
  product,
  data,
  fullWidth,
  reloadPage,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onDetailsChange = (product: IProducts) => {
    navigate(`/${product.categorie}/${product.name}`, {
      state: { product, data },
    });

    if (reloadPage) {
      window.location.reload();
    }

    dispatch(increment());
    dispatch(onMainMenuShowHide(true));
  };

  return (
    <>
      {!dataIsLoaded ? (
        <button
          style={{ fontFamily: 'RobotoMedium'}}
          onClick={() => onDetailsChange(product)}
          className={`${
            fullWidth ? 'w-100 justify-content-center' : ''
          } btn btn-primary fs-13 fs-sm-12 rounded-1 d-flex gap-2 align-items-center px-2 px-sm-3 text-dark-form`}
        >
          {data.rest.details} <HiOutlineArrowNarrowRight size={20} />
        </button>
      ) : (
        <Skeleton
          count={1}
          width={100}
          height={40}
          baseColor={EColors.primary}
        />
      )}
    </>
  );
};
