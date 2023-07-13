import React, { useEffect, useState } from "react";
import {
  IDataDetails,
  IProducts,
  IRange,
} from "../../../interfaces/interfaces";
import { EUseRangeSections } from "../../../interfaces/interfaces";
import { useAppDispatch } from "../../../app/hooks";
import { PayloadAction } from "@reduxjs/toolkit";

export const useRange = (
  data: IDataDetails,
  section: EUseRangeSections,
  filterFunc: (payload: { min: number, max: number }) => PayloadAction<IRange>
  
) => {
  const dispatch = useAppDispatch();

  const getFilterValue = data.products.map((product: IProducts) => {
    if (product.filter[section] && product.filter[section] !== Infinity)
      return product.filter[section] as number;
    else return 0;
  });

  const [initialValue, setInitialValue] = useState<IRange>({
    min: 0,
    max: 100,
  });


  useEffect(() => {
    const min = Math.min(...getFilterValue);
    const max = Math.max(...getFilterValue);
    if (getFilterValue && getFilterValue.length) {
      dispatch(filterFunc({ min, max }));
      setInitialValue({ min, max});
    }
  }, [data.products]);
// 
  const [distance, setDistance] = useState<number>(10);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    
    const diff = initialValue.max - initialValue.min
    if(diff >= 500)
    {
      setDistance(Math.floor(diff / 10));
    } else if(diff >= 100 && diff <= 500){
      setDistance(10);  
    }else if(diff < 100){
      setDistance(2);  
    }

  }, [initialValue]);

  return { initialValue, distance, step };
};
