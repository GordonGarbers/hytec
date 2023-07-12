import React, { RefObject } from 'react';

interface IYellowDetailsProps {
  forwardedRef?: RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

export const YellowDetails: React.FC<IYellowDetailsProps> = ({ children }) => {
  return (
    <div
      style={{ zIndex: '0' }}
      className="container-fluid-02 bg-primary p-6 position-relative overflow-hidden rounded-2"
    >
      <div
        style={{
          left: '0px',
          top: '0px',
          clipPath: 'polygon(60% 100%, 100% 100%, 100% 0%, 65% 0%)',
        }}
        className="bg-primary-mono w-100 h-100 position-absolute"
      ></div>
    </div>
  );
};
