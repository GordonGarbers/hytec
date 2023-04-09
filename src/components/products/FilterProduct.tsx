import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  EUseRangeSections,
  IProducts,
  IRange,
} from "../../interfaces/interfaces";
import { BsSliders } from "react-icons/bs";
import { ICategory } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import {
  addCategory,
  removeCategory,
} from "../../features/products/productCategories/productCategories.slice";
import { EColors } from "../../constants/constants";
import { CreateCategoriyElements } from "./CreateCategoryElements";
import { RangeSlider } from "./RangeSlider";
import { useRange } from "./hooks/useRange";

import {
  filterKw,
  filterPrice,
  filterPs,
  filterWeight,
} from "./features/filter.slice";

export const FilterProduct: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const [filter, setFilter] = useState<boolean>(true);

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

  const createCategoriyElements = getCategories.map(
    (categorie: ICategory, idx: number) => {
      return (
        <CreateCategoriyElements categorie={categorie} idx={idx} key={idx} />
      );
    }
  );

  useEffect(() => {
    dispatch(addCategory(getCategories[0]?.category || ""));
  }, [data]);

  /////////////////////////////
  //RANGE CUSTOM HOOK

  //hook price
  const {
    initialValue: initalValuePrice,
    distance: distancePrice,
    step: stepPrice,
  } = useRange(data, EUseRangeSections.price, filterPrice);

  //hook weight
  const {
    initialValue: initalValueWeight,
    distance: distanceWeight,
    step: stepWeight,
  } = useRange(data, EUseRangeSections.weight, filterWeight);

  //hook weight
  const {
    initialValue: initalValueKw,
    distance: distanceKw,
    step: stepKw,
  } = useRange(data, EUseRangeSections.kw, filterKw);

  //hook weight
  const {
    initialValue: initalValuePs,
    distance: distancePs,
    step: stepPs,
  } = useRange(data, EUseRangeSections.kw, filterPs);
  ///////////////////////////////////////////////////////////
  const {
    kw,
    ps,
    displacement,
    fuelTankCapacity,
    speed,
    weight,
    liftingCapacity,
    liftingHeight,
    totalLength,
    totalWidth,
    totalHeight,
    wheelbase,
    price,
  } = useAppSelector((state: RootState) => state.filter);

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
          <div className="accordion-body w-100 d-flex">
            <div className="position-relative w-50">
              <label
                style={{ textTransform: "capitalize" }}
                className="mb-3 fs-13 fw-bold text-dark-light"
                htmlFor=""
              >
                Categories
              </label>
              {createCategoriyElements}
            </div>

            <div className="filter-range-wrapper w-50 d-flex flex-column justify-content-between pe-4">
              <div className="position-relative w-100">
                <label
                  style={{ textTransform: "capitalize" }}
                  className="mb-3 fs-13 fw-bold text-dark-light w-100 text-center"
                  htmlFor=""
                >
                  <span>Price</span>
                  <span className="text-grey-500 fs-15">{" "}(€)</span> 
                </label>
                <RangeSlider
                  min={initalValuePrice.min}
                  max={initalValuePrice.max}
                  step={stepPrice}
                  value={price}
                  filterFunc={filterPrice}
                  distance={distancePrice}
                  sufix={"€"}
                />
              </div>

              <div className="position-relative w-100">
                <label
                  style={{ textTransform: "capitalize" }}
                  className="mb-3 fs-13 fw-bold text-dark-light w-100 text-center"
                  htmlFor=""
                >
                  <span>Weight</span>
                  <span className="text-grey-500 fs-15">{" "}(kg)</span> 
                </label>
                <RangeSlider
                  min={initalValueWeight.min}
                  max={initalValueWeight.max}
                  step={stepWeight}
                  value={weight}
                  filterFunc={filterWeight}
                  distance={distanceWeight}
                  sufix={"kg"}
                />
              </div>
            </div>

            {/* <RangeSlider
              min={initalValueWeight.min}
              max={initalValueWeight.max}
              step={stepWeight}
              value={weight}
              filterFunc={filterWeight}
              distance={distanceWeight}
              sufix={"kg"}
            />

            <RangeSlider
              min={initalValueKw.min}
              max={initalValueKw.max}
              step={stepKw}
              value={kw}
              filterFunc={filterKw}
              distance={distanceKw}
              sufix={"kw"}
            />

            <RangeSlider
              min={initalValuePs.min}
              max={initalValuePs.max}
              step={stepPs}
              value={ps}
              filterFunc={filterPs}
              distance={distancePs}
              sufix={""}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
