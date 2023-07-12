import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { EUseRangeSections, IProducts } from '../../interfaces/interfaces';
import { BsSliders } from 'react-icons/bs';
import { ICategory } from '../../interfaces/interfaces';
import { ECategories, EColors } from '../../constants/constants';
import { CreateCategoriyElements } from './CreateCategoryElements';
import { RangeSlider } from './RangeSlider';
import { useRange } from './hooks/useRange';
import {
  addVehicleType,
  removeVehicleType,
} from './features/filterVehicleType.slice';

import {
  filterKw,
  filterPrice,
  filterPs,
  filterWeight,
  filterDisplacement,
  filterFuelTankCapacity,
  filterLiftingCapacity,
  filterLiftingHeight,
  filterSpeed,
  filterTotalHeight,
  filterTotalLength,
  filterTotalWidth,
  filterWheelbase,
} from './features/filter.slice';

import { GrFormClose } from 'react-icons/gr';
import { onSliderSpeedChange } from './features/sliderAnimSpeed.slice';
import { onHytecChanged } from './features/hytec.slice';
import { onHytecProChanged } from './features/hytecPro.slice';

export const FilterProduct: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const { vehicleTypeCheckers } = useAppSelector(
    (state: RootState) => state.vehicleType
  );
  const { language } = useAppSelector((state: RootState) => state.lang);

  const [filter, setFilter] = useState<boolean>(true);
  const { reset } = useAppSelector((state: RootState) => state.resetFilter);
  const { filters } = useAppSelector(
    (state: RootState) => state.changedFilters
  );
  const { windowWidth } = useAppSelector((state: RootState) => state.width);
  const [btnSelected, setButtonSelected] = useState<string>('');

  const dispatch = useAppDispatch();

  const onFilterButtonClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setButtonSelected(e.currentTarget.value);
    dispatch(onSliderSpeedChange(0.25));
  };

  useEffect(() => {
    setButtonSelected('');
  }, [filters]);

  const { hytec } = useAppSelector((state: RootState) => state.hytec);
  const { hytecPro } = useAppSelector((state: RootState) => state.hytecPro);

  const getProductsPerVehicleType = data.products.filter(
    (product: IProducts, idx: number) => {
      return vehicleTypeCheckers.includes(product.vehicleType);
    }
  );

  const getCategories = getProductsPerVehicleType.reduce(
    (accu: ICategory[], curr: IProducts, idx: number): ICategory[] => {
      const index = accu.findIndex((accuItem) => {
        return accuItem.category === curr.filter.categorie;
      });
      if (index === -1) {
        accu = [
          ...accu,
          {
            category: curr.filter.categorie ?? '',
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
    [{ category: 'all', categoryLabel: ' All', count: 0 }]
  );

  const createCategoriyElements = getCategories.map(
    (categorie: ICategory, idx: number) => {
      return (
        <CreateCategoriyElements categorie={categorie} idx={idx} key={idx} />
      );
    }
  );

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

  //hook kw
  const {
    initialValue: initalValueKw,
    distance: distanceKw,
    step: stepKw,
  } = useRange(data, EUseRangeSections.kw, filterKw);

  //hook ps
  const {
    initialValue: initalValuePs,
    distance: distancePs,
    step: stepPs,
  } = useRange(data, EUseRangeSections.kw, filterPs);

  const {
    initialValue: initalValueDisplacement,
    distance: distanceDisplacement,
    step: stepDisplacement,
  } = useRange(data, EUseRangeSections.displacement, filterDisplacement);

  const {
    initialValue: initalValueFuelTankCapacity,
    distance: distanceFuelTankCapacity,
    step: stepFuelTankCapacity,
  } = useRange(
    data,
    EUseRangeSections.fuelTankCapacity,
    filterFuelTankCapacity
  );

  const {
    initialValue: initalValueSpeed,
    distance: distanceSpeed,
    step: stepSpeed,
  } = useRange(data, EUseRangeSections.speed, filterSpeed);

  const {
    initialValue: initalValueLiftingCapacity,
    distance: distanceLiftingCapacity,
    step: stepLiftingCapacity,
  } = useRange(data, EUseRangeSections.liftingCapacity, filterLiftingCapacity);

  const {
    initialValue: initalValueLiftingHeight,
    distance: distanceLiftingHeight,
    step: stepLiftingHeight,
  } = useRange(data, EUseRangeSections.liftingHeight, filterLiftingHeight);

  const {
    initialValue: initalValueTotalLength,
    distance: distanceTotalLength,
    step: stepTotalLength,
  } = useRange(data, EUseRangeSections.totalLength, filterTotalLength);

  const {
    initialValue: initalValueTotalWidth,
    distance: distanceTotalWidth,
    step: stepTotalWidth,
  } = useRange(data, EUseRangeSections.totalWidth, filterTotalWidth);

  const {
    initialValue: initalValueTotalHeight,
    distance: distanceTotalHeight,
    step: stepTotalHeight,
  } = useRange(data, EUseRangeSections.totalHeight, filterTotalHeight);

  const {
    initialValue: initalWheelbase,
    distance: distanceWheelbase,
    step: stepWheelbase,
  } = useRange(data, EUseRangeSections.wheelbase, filterWheelbase);
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

  const onVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === 'hytec') dispatch(onHytecChanged(!hytec));
    else dispatch(onHytecProChanged(!hytecPro));
    dispatch(addVehicleType(e.currentTarget.value));

    if (e.currentTarget.checked) {
      dispatch(addVehicleType(e.currentTarget.value));
    } else {
      dispatch(removeVehicleType(e.currentTarget.value));
    }
  };

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
          <div
            className="accordion-body w-100 d-flex d-md-grid flex-column gap-5"
            style={{ gridTemplateColumns: '330px 1fr' }}
          >
            <div
              className={`d-flex gap-5 w-100 flex-${
                windowWidth > 350 ? 'row' : 'column'
              }`}
            >
              <div className="position-relative">
                <label
                  style={{ textTransform: 'capitalize' }}
                  className="mb-3 fs-13 fw-bold text-dark-light"
                  htmlFor=""
                >
                  {data.filterCategories.vehicleType}
                </label>

                {/* <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="hytec" id="hytecChecker" onChange={(e)=>onVehicleChange(e)} checked={hytec} />
                  <label className="form-check-label fs-14" htmlFor="flexCheckDefault">
                    Hytec
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="hytec pro" id="hytecProChecker" onChange={(e)=>onVehicleChange(e)} checked={hytecPro} />
                  <label className="form-check-label fs-14" htmlFor="flexCheckChecked">
                    Hytec Pro
                  </label>
                </div> */}

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="hytec"
                    id="hytecChecker"
                    onChange={(e) => onVehicleChange(e)}
                    checked={hytec}
                  />
                  <label
                    className="form-check-label fs-14"
                    htmlFor="flexCheckDefault"
                  >
                    Hytec
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="hytec pro"
                    id="hytecProChecker"
                    onChange={(e) => onVehicleChange(e)}
                    checked={hytecPro}
                  />
                  <label
                    className="form-check-label fs-14"
                    htmlFor="flexCheckChecked"
                  >
                    Hytec Pro
                  </label>
                </div>
              </div>

              <div className="position-relative">
                <label
                  style={{ textTransform: 'capitalize' }}
                  className="mb-3 fs-13 fw-bold text-dark-light"
                  htmlFor=""
                >
                  {data.filterCategories.categories}
                </label>
                {createCategoriyElements}
              </div>
            </div>

            <div className="d-flex w-100 flex-column flex-lg-row gap-3 align-items-start">
              <div className="w-100 filter-range-wrapper d-flex flex-column justify-content-between px-4 gap-4">
                <div className="position-relative w-100">
                  <label
                    style={{ textTransform: 'capitalize' }}
                    className={`mb-3 ${
                      windowWidth > 400 ? 'fs-13' : 'fs-14'
                    }  fw-bold text-dark-light w-100 text-center`}
                    htmlFor=""
                  >
                    <span>{data.filterCategories.price}</span>
                    <span className="text-grey-500 fs-15"> (€)</span>
                  </label>
                  <RangeSlider
                    min={initalValuePrice.min}
                    max={initalValuePrice.max}
                    step={stepPrice}
                    value={price}
                    filterFunc={filterPrice}
                    distance={distancePrice}
                    attrName={ECategories.price}
                    btnSelected={btnSelected}
                    storageSufix="1"
                    sufix={'€'}
                  />
                </div>

                <div className="position-relative w-100">
                  <label
                    style={{ textTransform: 'capitalize' }}
                    className={`mb-3 ${
                      windowWidth > 400 ? 'fs-13' : 'fs-14'
                    }  fw-bold text-dark-light w-100 text-center`}
                    htmlFor=""
                  >
                    <span>{data.filterCategories.weight}</span>
                    <span className="text-grey-500 fs-15"> (kg)</span>
                  </label>
                  <RangeSlider
                    min={initalValueWeight.min}
                    max={initalValueWeight.max}
                    step={stepWeight}
                    value={weight}
                    filterFunc={filterWeight}
                    distance={distanceWeight}
                    attrName={ECategories.weight}
                    btnSelected={btnSelected}
                    sufix={'kg'}
                    storageSufix="2"
                  />
                </div>
              </div>

              <div className="w-100 filter-range-wrapper d-flex flex-column justify-content-between px-4  gap-4">
                <div className="position-relative w-100">
                  <label
                    style={{ textTransform: 'capitalize' }}
                    className={`mb-3 ${
                      windowWidth > 400 ? 'fs-13' : 'fs-14'
                    }  fw-bold text-dark-light w-100 text-center`}
                    htmlFor=""
                  >
                    <span>{data.filterCategories.displacement}</span>
                    <span className="text-grey-500 fs-15"> (€)</span>
                  </label>
                  <RangeSlider
                    min={initalValueDisplacement.min}
                    max={initalValueDisplacement.max}
                    step={stepDisplacement}
                    value={displacement}
                    filterFunc={filterDisplacement}
                    distance={distanceDisplacement}
                    attrName={ECategories.displacement}
                    btnSelected={btnSelected}
                    sufix={'cm3'}
                    storageSufix="3"
                  />
                </div>

                <div className="position-relative w-100">
                  <label
                    style={{ textTransform: 'capitalize' }}
                    className={`mb-3 ${
                      windowWidth > 400 ? 'fs-13' : 'fs-14'
                    }  fw-bold text-dark-light w-100 text-center`}
                    htmlFor=""
                  >
                    <span>{data.filterCategories.fuelTank}</span>
                    <span className="text-grey-500 fs-15"> (kg)</span>
                  </label>
                  <RangeSlider
                    min={initalValueFuelTankCapacity.min}
                    max={initalValueFuelTankCapacity.max}
                    step={stepFuelTankCapacity}
                    value={fuelTankCapacity}
                    filterFunc={filterFuelTankCapacity}
                    distance={distanceFuelTankCapacity}
                    attrName={ECategories.fuelTank}
                    btnSelected={btnSelected}
                    sufix={'l'}
                    storageSufix="4"
                  />
                </div>
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

          {/* MAIN RESET */}
          {/* <button
            onClick={() => dispatch(onResetFilter(true))}
            className="btn btn-primary"
          >
            RESET
          </button> */}
          {/* CREATE FILTER BUTTONS */}
          <div className="d-flex gap-1 p-3">
            {filters.map((filter: string, idx: number) => {
              return (
                <button
                  onClick={(e) => onFilterButtonClicked(e)}
                  key={idx}
                  className={`btn btn-grey-900 rounded-3 d-flex align-items-center ${
                    windowWidth > 490 ? 'gap-1 px-2' : 'gap-0 px-1'
                  } `}
                  value={filter}
                >
                  <span
                    className={`${
                      windowWidth > 490 ? 'fs-14' : 'fs-15'
                    } fw-bold text-dark-light`}
                  >
                    {windowWidth > 360
                      ? filter === 'fuel tank'
                        ? data.filterCategories['fuelTank']
                        : data.filterCategories[filter]
                      : filter === 'fuel tank'
                      ? ` ${data.filterCategories['fuelTank']?.slice(0, 3)}...`
                      : ` ${data.filterCategories[filter]?.slice(0, 3)}...`}
                  </span>
                  <GrFormClose />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
