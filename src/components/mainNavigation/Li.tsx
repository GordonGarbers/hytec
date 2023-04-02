import React from 'react';

interface ILiProps {
  btnName: string;
  value: number;
  data: boolean;
  func: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  addToClassName: string
}

export const Li: React.FC<ILiProps> = ({ btnName, value, data, func, addToClassName}) => {
  return (
    <li
      onClick={(e) => func(e)}
      role="button"
      className={`${addToClassName} d-flex justify-content-center align-items-center text-capitalize `}
      data-add-btn={data}
      value={value}
    >
      {btnName}
    </li>
  );
};
