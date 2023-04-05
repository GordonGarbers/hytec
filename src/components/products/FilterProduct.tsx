import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { IProducts } from '../../interfaces/interfaces';
import { count } from 'console';

interface ICategory {
  category: string;
  count: number;
}

export const FilterProduct: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  const [isSubscribed, setIsSubscribed] = useState<string[]>([]);

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsSubscribed([...isSubscribed, e.target.value]);
    }
  };

  const getCategories = data.products.reduce(
    (accu: ICategory[], curr: IProducts, idx: number): ICategory[] => {
      const index = accu.findIndex((accuItem) => {
        return accuItem.category === curr.categorie;
      });

      if (index === -1) {
        accu = [...accu, { category: curr.categorie, count: 1 }];
      } else {
        accu[index].count++;
      }

      return accu;
    },
    []
  );

 

  const createCategories = getCategories.map(
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
          />
          <label
            style={{ textTransform: 'capitalize' }}
            className="form-check-label fs-14"
          >
            {categorie.category}
            <span className="text-grey-500 fs-14"> ({categorie.count})</span>
          </label>
        </div>
      );
    }
  );

  //set default categorie state
  useEffect(()=>{
    setIsSubscribed([...getCategories.map((item:ICategory)=>item.category)])
  }, [data])

  useEffect(()=>{
    console.log(isSubscribed);
  }, [isSubscribed])

  return (
    <div style={{ backgroundColor: '#fff' }} className="p-4 mb-5 rounded-2">
      <label
        style={{ textTransform: 'uppercase' }}
        className="mb-4 fs-13 fw-bold text-dark"
        htmlFor=""
      >
        Categories
      </label>
      {createCategories}
    </div>
  );
};
