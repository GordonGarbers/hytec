import React from "react";

interface IButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<IButtonProps> = ({ children }) => {
  return (
    <button className="btn btn-primary rounded-2" style={{fontWeight:500}}>
      {children}
    </button>
  );
};
