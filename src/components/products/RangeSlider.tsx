import React, { Dispatch, memo, useEffect, useRef } from "react";
import { IRange } from "../../interfaces/interfaces";
import { IInitialState, filterPrice } from "./features/filter.slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { onResetFilter } from "./features/resetFilters.slice";
import {
  onFiltersChanged,
  onFiltersRemove,
} from "./features/filtersChanged.slice";
import { RootState } from "../../app/store";
import { onSliderSpeedChange } from "./features/sliderAnimSpeed.slice";
import { XLg } from "react-bootstrap-icons";
import { onMinMaxSave } from "./features/minMaxValues.slice";

interface IRangeSliderProps {
  min: number;
  max: number;
  value: IRange;
  step: number;
  // filterFunc: React.Dispatch<React.SetStateAction<IRange>>,
  filterFunc: (payload: { min: number; max: number }) => PayloadAction<IRange>;
  // filterFunc: Dispatch<IRange>
  // filterFunc: typeof filterPrice
  distance: number;
  sufix: string;
  attrName: string;
  btnSelected: string;
  // propsFunction: ()=>void
  storageSufix: string;
}

export const RangeSlider: React.FC<IRangeSliderProps> = memo(
  ({
    min,
    max,
    value,
    step,
    filterFunc,
    distance,
    sufix,
    attrName,
    btnSelected,
    storageSufix,
  }) => {
    const refMin = useRef<HTMLInputElement>(null);
    const refMax = useRef<HTMLInputElement>(null);

    const { windowWidth } = useAppSelector((state: RootState) => state.width);

    const { filters } = useAppSelector(
      (state: RootState) => state.changedFilters
    );

    const { animSpeed } = useAppSelector(
      (state: RootState) => state.sliderSpeed
    );

    const dispatch = useAppDispatch();

    const {minimum, maximum} =  useAppSelector((state:RootState) => state.minMax[attrName])

    const [minValue, setMinValue] = React.useState<number>(minimum ? minimum : min);
    const [maxValue, setMaxValue] = React.useState<number>(maximum ? maximum : max);

    useEffect(()=>{
      if(minimum && maximum){
        setMinValue(minimum) 
        setMaxValue(maximum) 
      }else{
        setMinValue(min)  
        setMaxValue(max)  
      }

    },[min, max, minimum, maximum])


    useEffect(() => {
      if (value) {
        // setMinValue(value.min);
        // setMaxValue(value.max);
        dispatch(onMinMaxSave({name: attrName, minMax: {min: minValue, max: maxValue}}))
      }
    }, [value]);


    //reset to initial state after presing lower newly created button
    useEffect(() => {
      if (btnSelected === attrName) {
        setMinValue(min);
        setMaxValue(max);
        // dispatch(filterFunc({ min: minimum ? minimum : min, max: maximum ? maximum : max }));
        dispatch(filterFunc({ min,  max }));
        dispatch(onFiltersRemove(btnSelected));
      }
    }, [btnSelected]);

    console.log(minValue, maxValue);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const newMinVal = Math.min(+e.target.value, maxValue - step - distance);
      if (value) setMinValue(newMinVal);
      // dispatch(filterFunc({ min: newMinVal, max: maxValue }))
      dispatch(onResetFilter(false));
      dispatch(onSliderSpeedChange(0));
    };



    const touchHandleMinChange = (e: React.TouchEvent<HTMLInputElement>) => {
      // e.preventDefault();
      dispatch(onResetFilter(false));
      dispatch(onSliderSpeedChange(0));
    };

    const onInputLeave = () => {
      dispatch(filterFunc({ min: minValue, max: maxValue }));
      if (value.min !== minValue || value.max !== maxValue) {
        dispatch(onFiltersChanged(refMin.current?.dataset.myAttr ?? ""));
        
      }
    };

        
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const newMaxVal = Math.max(+e.target.value, minValue + step + distance);
      if (value) setMaxValue(newMaxVal);
      // dispatch(filterFunc({ min: minValue, max: newMaxVal }))
      dispatch(onResetFilter(false));
      dispatch(onSliderSpeedChange(0));
    };
    
    const touchHandleMaxChange = (e: React.TouchEvent<HTMLInputElement>) => {
      // e.preventDefault();
      dispatch(onResetFilter(false));
      dispatch(onSliderSpeedChange(0));
    };
  
    const minPos = ((minValue - min) / (max - min)) * 100;
    const maxPos = ((maxValue - min) / (max - min)) * 100;

    
    const { language } = useAppSelector((state: RootState) => state.lang);

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

    // console.log('FROM SLIDER: ', minimum, minValue, maximum, maxValue);
    useEffect(()=>{
      if(minimum && maximum){
        // console.log('FROM PRICE: ', minimum, maximum, language);
        // dispatch(filterFunc({ min: minimum , max: maximum}));
        dispatch(filterFunc({ min: minValue , max: maxValue}));
      }
    }, [minimum, maximum, min, max, btnSelected])


    useEffect(()=>{
      dispatch(onMinMaxSave({name: attrName,  minMax: {min: 0,  max: 1}}))
    }, [language])


    return (
      <div className="wrapper position-relative d-flex align-items-center mt-1">
        <div className="input-wrapper position-relative">
          <input
            ref={refMin}
            className="input position-absolute w-100 pe-none h-100 opacity-0 p-0"
            type="range"
            value={minValue}
            min={min}
            max={max}
            step={step}
            onChange={handleMinChange}
            onTouchMove={(e) => touchHandleMinChange(e)}
            onMouseUp={onInputLeave}
            onTouchEnd={onInputLeave}
            data-my-attr={attrName}
          />
          <input
            ref={refMax}
            className="input position-absolute w-100 pe-none h-100 opacity-0 p-0"
            type="range"
            value={maxValue}
            min={min}
            max={max}
            step={step}
            onChange={handleMaxChange}
            onTouchMove={(e) => touchHandleMaxChange(e)}
            onMouseUp={onInputLeave}
            onTouchEnd={onInputLeave}
            data-my-attr={attrName}
          />
        </div>

        <div className="control-wrapper w-100 position-absolute">
          <div
            className="control bg-grey-900 border border-primary border-4 rounded-pill position-absolute top-50"
            style={{ left: `${minPos}%`, transition: `all ${animSpeed}s ease` }}
          >
            <div
              className="position-absolute px-2 fw-bold text-dark bg-grey-900 fs-15 rounded-2 d-flex align-items-center gap-1"
              style={{
                left: "50%",
                top: "-24px",
                transform: "translate(-50%, 0%)",
                transition: `all ${animSpeed}s ease`,
              }}
            >
              <span className={`${windowWidth < 400 ? "fs-16" : "fs-15"}`}>
                {minValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span
                className={`${
                  windowWidth < 400 ? "fs-17" : "fs-16"
                } text-grey-600`}
              >
                {" "}
                {sufix}
              </span>
            </div>
          </div>

          <div className="rail bg-grey-900 position-absolute w-100 rounded-0 top-50">
            <div
              className="inner-rail bg-primary-mono position-absolute h-100 opacity-50"
              style={{
                left: `${minPos}%`,
                right: `${100 - maxPos}%`,
                transition: `all ${animSpeed}s ease`,
              }}
            />
          </div>

          <div
            className="control bg-grey-900 border border-primary border-4 rounded-pill position-absolute position-relative top-50"
            style={{ left: `${maxPos}%`, transition: `all ${animSpeed}s ease` }}
          >
            <div
              className="position-absolute px-2 fw-bold text-dark bg-grey-900 fs-15 rounded-2 d-flex align-items-center gap-1"
              style={{
                left: "50%",
                top: "-24px",
                transform: "translate(-50%, 0%)",
              }}
            >
              <span className={`${windowWidth < 400 ? "fs-16" : "fs-15"}`}>
                {maxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span
                className={`${
                  windowWidth < 400 ? "fs-17" : "fs-16"
                } text-grey-600`}
              >
                {" "}
                {sufix}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
