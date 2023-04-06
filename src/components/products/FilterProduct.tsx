import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { IProducts } from '../../interfaces/interfaces';
import { BsSliders } from 'react-icons/bs';
import { motion } from 'framer-motion';
import {
  addCategory,
  removeCategory,
} from '../../features/products/productCategories/productCategories.slice';

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
  const [filter, setFilter] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  //   console.log(ref.current?.getBoundingClientRect().height);
  const dispatch = useAppDispatch();

  //   const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.checked) {
  //       dispatch(addCategory(e.target.value));
  //     } else {
  //       dispatch(removeCategory(e.target.value));
  //     }
  //   };

  const onRadioChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    dispatch(addCategory(e.currentTarget.value));
  };

  const getCategories = data.products.reduce(
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

  //   const createCategoriyElements = getCategories.map(
  //     (categorie: ICategory, idx: number) => {
  //       return (
  //         <div key={idx} className="form-check">
  //           <input
  //             onChange={(e) => onCheck(e)}
  //             defaultChecked={true}
  //             className="form-check-input bg-primary border-0"
  //             type="checkbox"
  //             value={categorie.category}
  //             id="flexCheckDefault"
  //             // checked={false}
  //           />
  //           <label
  //             style={{ textTransform: "capitalize" }}
  //             className="form-check-label fs-14"
  //           >
  //             {categorie.categoryLabel}
  //             <span className="text-grey-500 fs-14"> ({categorie.count})</span>
  //           </label>
  //         </div>
  //       );
  //     }
  //   );

  const createCategoriyElements = getCategories.map(
    (categorie: ICategory, idx: number) => {
      return (
        <div className="form-check" key={idx}>
          <input
            onClick={(e) => onRadioChange(e)}
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id={`exampleRadios${idx + 1}`}
            value={categorie.category}
            // checked = {false}
            defaultChecked={idx === 0 ? true : false}
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
    }
  );

  //set default categorie state
  useEffect(() => {
    dispatch(addCategory(getCategories[0]?.category || ''));
  }, [data]);

  //print categories
  //   useEffect(() => {
  //     console.log(categories);
  //   }, [categories]);

  return (
    <div className="accordion mb-4" id="accordionExample">
      <div className="accordion-item  border-0">
        <h2 className="accordion-header rounded-top p-2 d-flex justify-content-end align-items-center border-bottom border-grey-900" id="headingOne">
            {/* <div className='fs-13'><span className='text-grey-600'>Filter</span></div> */}
          <button
            onClick={() => setFilter(!filter)}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            className="btn pb-2 border-0 pe-2 ps-2 rounded-1 d-flex gap-2 align-items-center"
          >
            <BsSliders size={20} />
          </button>
        </h2>
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
                    style={{ textTransform: 'uppercase' }}
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
