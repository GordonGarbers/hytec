import React from "react";

interface ICenterizeProps {
  children: React.ReactNode;
}

export const Centerize: React.FC<ICenterizeProps> = ({ children }) => {
  return (
    <div
      style={{ left: "0px", top: "0px" }}
      className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center"
    >
      {children}
    </div>
  );
};
