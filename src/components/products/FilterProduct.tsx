import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { IProducts } from "../../interfaces/interfaces";
import { addCategory, removeCategory } from "../../features/products/productCategories/productCategories.slice";

interface ICategory {
  category: string;
  categoryLabel: string;
  count: number;
}

export const FilterProduct: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const { categories } = useAppSelector((state: RootState) => state.categories);

  const dispatch = useAppDispatch();

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addCategory(e.target.value));
    }else{
      dispatch(removeCategory(e.target.value))
    }
  };

  const getCategories = data.products.reduce(
    (accu: ICategory[], curr: IProducts, idx: number): ICategory[] => {
      const index = accu.findIndex((accuItem) => {
        return accuItem.category === curr.filter.categorie;
      });

      if (index === -1) {
        accu = [...accu, { category: curr.filter.categorie??"", categoryLabel: curr.categorie, count: 1 }];
      } else {
        accu[index].count++;
      }

      return accu;
    },
    []
  );

  const createCategoriyElements = getCategories.map(
    (categorie: ICategory, idx: number) => {
      return (
        <div key={idx} className="form-check">
          <input
            onChange={(e) => onCheck(e)}
            defaultChecked={true}
            className="form-check-input bg-primary border-0"
            type="checkbox"
            value={categorie.category}
            id="flexCheckDefault"
            // checked={false}
          />
          <label
            style={{ textTransform: "capitalize" }}
            className="form-check-label fs-14"
          >
            {categorie.categoryLabel}
            <span className="text-grey-500 fs-14"> ({categorie.count})</span>
          </label>
        </div>
      );
    }
  );

  //set default categorie state
  useEffect(() => {
    getCategories.map((categorie: ICategory) => {
      return dispatch(addCategory(categorie.category))
    })
  }, [data]);

  //print categories
  useEffect(() => {
    console.log(categories);
  }, [categories]);


  return (
    <div style={{ backgroundColor: "#fff" }} className="p-4 mb-5 rounded-2">
      <label
        style={{ textTransform: "uppercase" }}
        className="mb-4 fs-13 fw-bold text-dark"
        htmlFor=""
      >
        Categories
      </label>
      {createCategoriyElements}
    </div>
  );
};
