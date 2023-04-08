import React, { Dispatch, memo, useEffect } from "react";
import { IRange } from "../../interfaces/interfaces";
import { IInitialState, filterPrice } from "./features/filter.slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";

interface IRangeSliderProps {
  min: number;
  max: number;
  value: IRange;
  step: number;
  // filterFunc: React.Dispatch<React.SetStateAction<IRange>>,
  filterFunc: (payload: { min: number, max: number }) => PayloadAction<IRange>;
  // filterFunc: Dispatch<IRange>
  // filterFunc: typeof filterPrice
  distance: number;
  sufix: string;
  // propsFunction: ()=>void
}

export const RangeSlider: React.FC<IRangeSliderProps> = memo(({
  min,
  max,
  value,
  step,
  filterFunc,
  distance,
  sufix,
}) => {
  const dispatch = useAppDispatch();

  const [minValue, setMinValue] = React.useState<number>(
    value ? value.min : min
  );
  const [maxValue, setMaxValue] = React.useState<number>(
    value ? value.max : max
  );

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step - distance);
    if (value) setMinValue(newMinVal);
    //dispatch(propsFunction({ min: newMinVal, max: maxValue}))
    //propsFunction je ustvari funkcija iz redux slice-a priceValue()
    // onChange({ min: newMinVal, max: maxValue });
    dispatch(filterFunc({ min: newMinVal, max: maxValue }))
  };
  

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step + distance);
    if (value) setMaxValue(newMaxVal);
    // onChange({ min: minValue, max: newMaxVal });
    dispatch(filterFunc({ min: minValue, max: newMaxVal }))
  };


  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="wrapper position-relative d-flex align-items-center">
      <div className="input-wrapper position-relative">
        <input
          className="input position-absolute w-100 pe-none h-100 opacity-0 p-0"
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className="input position-absolute w-100 pe-none h-100 opacity-0 p-0"
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className="control-wrapper w-100 position-absolute">
        <div
          className="position-absolute px-2 fw-bold text-dark-light fs-14 rounded-2"
          style={{ left: `calc(${minPos}% - 15px)`, top: "-20px" }}
        >
          {minValue}
          {sufix}
        </div>
        <div
          className="control bg-primary rounded-pill position-absolute top-50"
          style={{ left: `${minPos}%` }}
        />
        <div className="rail bg-grey-900 position-absolute w-100 rounded-0 top-50">
          <div
            className="inner-rail bg-primary-mono position-absolute h-100 opacity-100"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div
          className="position-absolute px-2 fw-bold text-dark-light fs-14 rounded-2"
          style={{ left: `calc(${maxPos}% - 15px)`, top: "-20px" }}
        >
          <span>{maxValue}</span>
          <span className="fs-15 text-grey-600">{" "}{sufix}</span>
        </div>
        <div
          className="control bg-primary rounded-pill position-absolute top-50"
          style={{ left: `${maxPos}%` }}
        />
      </div>
    </div>
  );
});
