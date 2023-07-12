import React from 'react';

interface IButtonProps {
  children: React.ReactNode;
  fontSize?: number;
}

export const PrimaryButton: React.FC<IButtonProps> = ({
  children,
  fontSize,
}) => {
  return (
    <button
      className={`btn btn-primary rounded-2 fs-${fontSize ? fontSize : 13}`}
      style={{ fontFamily: 'RobotoMedium'}}
    >
      {children}
    </button>
  );
};
