import React from "react";

interface ICenterizeProps {
  children: React.ReactNode;
  color?: string
}

export const Centerize: React.FC<ICenterizeProps> = ({ children, color }) => {
  return (
    <div
      style={{ left: "0px", top: "0px", backgroundColor:`${color}`}}
      className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center"
    >
      {children}
    </div>
  );
};
