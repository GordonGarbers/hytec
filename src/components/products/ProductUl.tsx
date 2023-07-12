import React from 'react';
import { IProducts } from '../../interfaces/interfaces';

interface IProductUI {
  filterProductArticle: IProducts[];
  productArticle: JSX.Element[];
  length: number;
  minMaxFirst: number;
  minMaxSecond?: number;
  useLength: boolean;
}

export const ProductUi: React.FC<IProductUI> = ({
  filterProductArticle,
  productArticle,
  length,
  minMaxFirst,
  minMaxSecond,
  useLength,
}) => {
  return (
    <>
      <ul
        style={{
          gridTemplateColumns: `repeat( auto-fit, minmax(${minMaxFirst}px, ${
            filterProductArticle.length <= length && useLength
              ? minMaxSecond + 'px'
              : '1fr'
          }))`,
        }}
        className="w-100 h-100 list-unstyled grid-wrapper"
      >
        {productArticle}
      </ul>
    </>
  );
};
