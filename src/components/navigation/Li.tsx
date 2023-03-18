import React from 'react';

interface ILiProps {
  btnName: string;
  value: number;
  data: boolean;
  func: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  name:string;
}

export const Li: React.FC<ILiProps> = ({ btnName, value, data, func, name}) => {
  return (
    <li
      onClick={(e) => func(e)}
      role="button"
      className={`${name}`}
      data-add-btn={data}
      value={value}
    >
      {btnName}
    </li>
  );
};
