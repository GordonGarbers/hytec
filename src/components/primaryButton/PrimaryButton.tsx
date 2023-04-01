import React from "react";

interface IButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<IButtonProps> = ({ children }) => {
  return (
    <button className="btn btn-primary mt-2 mt-sm-3 rounded-2">
      {children}
    </button>
  );
};
