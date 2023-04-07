import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { IProducts } from "../../interfaces/interfaces";
import { BsSliders } from "react-icons/bs";
import { ICategory } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import {
  addCategory,
  removeCategory,
} from "../../features/products/productCategories/productCategories.slice";
import { EColors } from "../../constants/constants";
import { CreateCategoriyElements } from "./CreateCategoryElements";
import { addPrice } from "../../features/products/productPrices/productPrices.slice";

export const FilterProduct: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const [filter, setFilter] = useState<boolean>(true);

  //   console.log(ref.current?.getBoundingClientRect().height);
  const dispatch = useAppDispatch();

  const getCategories = data.products.reduce(
    (accu: ICategory[], curr: IProducts, idx: number): ICategory[] => {
      const index = accu.findIndex((accuItem) => {
        return accuItem.category === curr.filter.categorie;
      });

      if (index === -1) {
        accu = [
          ...accu,
          {
            category: curr.filter.categorie ?? "",
            categoryLabel: curr.categorie,
            count: 1,
          },
        ];
      } else {
        accu[index].count++;
      }

      accu[0].count++;
      return accu;
    },
    [{ category: "all", categoryLabel: " All", count: 0 }]
  );

  const getPrices = data.products.map((product: IProducts) => {
    if (product.filter.price && product.filter.price !== Infinity)
      return product.filter.price;
    else return 0;
  });
  const minMaxPrice = {
    min: Math.min(...getPrices),
    max: Math.max(...getPrices),
  };

  const createCategoriyElements = getCategories.map(
    (categorie: ICategory, idx: number) => {
      return (
        <CreateCategoriyElements categorie={categorie} idx={idx} key={idx} />
      );
    }
  );

  //set default categorie state
  useEffect(() => {
    dispatch(addCategory(getCategories[0]?.category || ""));
  }, [data]);

  //set default price range
  useEffect(() => {
    dispatch(addPrice(minMaxPrice));
  }, [data]);

  return (
    <div className="accordion mb-4" id="accordionExample">
      <div className="accordion-item  border-0">
        <div
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
          onClick={() => setFilter(!filter)}
          className="accordion-header overflow-hidden rounded-top p-2 d-flex justify-content-end align-items-center border-bottom border-grey-900 position-relative"
          id="headingOne"
        >
          <div className="bg-primary position-absolute w-100 h-100 rounded-1 filter-bg-colors filter-bg-colors1"></div>
          <div className="bg-primary-mono position-absolute w-100 h-100 rounded-1 filter-bg-colors filter-bg-colors2"></div>
          <span className="fs-14 text-primary filter-text">Filter</span>
          <div className="btn pb-2 border-0 pe-2 ps-2 rounded-1 d-flex gap-2 align-items-center d-flex">
            <BsSliders size={20} color={EColors.darkLight} />
          </div>
        </div>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="position-relative">
              <div>
                <div>
                  <label
                    style={{ textTransform: "uppercase" }}
                    className="mb-3 fs-13 fw-bold text-dark"
                    htmlFor=""
                  >
                    Categories
                  </label>
                  {createCategoriyElements}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
