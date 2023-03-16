import React, { useRef } from 'react';

interface ILiProps {
  btnName: string;
  value: number;
  data: boolean;
  func: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;

}

export const Li: React.FC<ILiProps> = ({ btnName, value, data, func}) => {
  return (
    <li
      onClick={(e) => func(e)}
      role="button"
      className=""
      data-add-btn={data}
      value={value}
    >
      {btnName}
    </li>
  );
};
