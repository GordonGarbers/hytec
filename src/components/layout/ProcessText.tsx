import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface IProcessTextProps {
  isLoaded: boolean;
  text: string;
  color?: string;
  size: number;
  textColor: string;
  children?: React.ReactNode;
}

export const ProcessText: React.FC<IProcessTextProps> = ({
  isLoaded,
  text,
  color,
  size,
  textColor,
  children,
}) => {
  return (
    <div
      className={`proces-text mt-3 mt-sm-4 fs-${size} ${textColor}`}
      style={{ fontWeight: '400' }}
    >
      {!isLoaded ? (
        text?.split('\n').map((item: string, idx: number) => (
          <p key={idx} style={{ textIndent: '30px', lineHeight: '1.4rem' }}>
            {item.split('//').length > 2 ? (
              <>
                {item.split('//')[0]}{' '}
                <a
                  href="mailto: info@hytec-baumaschinen.de"
                  className={`text-dark fw-bold`}
                >
                  <u>{item.split('//')[1]}</u>
                </a>{' '}
                {item.split('//')[2]}
              </>
            ) : (
              item
            )}
          </p>
        ))
      ) : (
        <Skeleton count={5} baseColor={color} />
      )}
      {children}
    </div>
  );
};
