import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

interface ICircularProgressProps {
    remap: number
}

export const HeroCircularProgress: React.FC<ICircularProgressProps> = ({remap}) => {
  const {windowWidth} = useAppSelector((state:RootState) => state.width)
  return (
    <div
      style={{
        width: windowWidth < 960 ? '35px' : '50px',
        height: windowWidth < 960 ? '35px' : '50px',
        bottom: windowWidth < 960 ? '10px' : '20px',
        right: windowWidth < 960 ? '10px' : '20px',
        zIndex: '2',
      }}
      className="position-absolute"
    >
      <CircularProgressbar
        value={remap}
        strokeWidth={5}
        // text={`${seconds/1000} s`}
        styles={buildStyles({
          strokeLinecap: 'butt',
          rotation: 0,
          pathTransitionDuration: remap <= 1 ? 0.1 : 0.1,
          // pathColor: `rgba(247, 209, 0, ${remap / 100})`,
          pathColor: '#fff',
          // textColor: '#f88',
          trailColor: 'rgba(255,255,255,.3)',
          // backgroundColor: '#eee',
        })}
      />
      ;
    </div>
  );
};
