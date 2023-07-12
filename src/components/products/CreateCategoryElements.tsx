import React from 'react';
import { ICategory } from '../../interfaces/interfaces';
import { addCategory } from '../../features/products/productCategories/productCategories.slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

interface ICreateCategoriyElementsProps {
  categorie: ICategory;
  idx: number;
}

export const CreateCategoriyElements: React.FC<
  ICreateCategoriyElementsProps
> = ({ categorie, idx }) => {
  const { categories } = useAppSelector((state: RootState) => state.categories);

  const dispatch = useAppDispatch();

  const onRadioChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    dispatch(addCategory(e.currentTarget.value));
  };

  return (
    <div className="form-check">
      <input
        onClick={(e) => onRadioChange(e)}
        className="form-check-input"
        type="radio"
        name="exampleRadios"
        id={`exampleRadios${idx + 1}`}
        value={categorie.category}
        defaultChecked={categorie.category === categories ? true : false}
        autoComplete="off"
      />
      <label
        style={{ textTransform: 'capitalize' }}
        className="form-check-label fs-14"
      >
        {categorie.categoryLabel}
        <span className="text-grey-500 fs-14"> ({categorie.count})</span>
      </label>
    </div>
  );
};
