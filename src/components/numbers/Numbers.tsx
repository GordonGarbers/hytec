import React from 'react';
import { FaHandshake } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';
import { FaTractor } from 'react-icons/fa';
import { CardNumber } from './CardNumber';
import './numbers.scss';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';


export const Numbers: React.FC = () => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  return (
    <>
    
      <div className="">
        <div
          style={{ maxWidth: '1400px' }}
          className="my-4 d-flex flex-column flex-sm-row "
        >
          <CardNumber
            number={2005}
            script={data.numbers.founded??""}
            icon={
              <MdCalendarMonth
                size={70}
                style={{
                  zIndex: '0',
                }}
                className="number-icon p-2 bg-grey-900 text-dark-light shadow rounded-3 position-absolute"
              />
            }
            delayNum={0}
            separator=""
            includeArrow={false}
            motionDelay={0}
          />

          <CardNumber
            number={10000}
            script={data.numbers.sold??""}
            icon={
              <FaTractor
                size={70}
                style={{
                  zIndex: '0',
                }}
                className="number-icon p-2 bg-grey-900 text-dark-light shadow rounded-3 position-absolute"
              />
            }
            delayNum={0.5}
            prefix=">"
            separator="."
            includeArrow={true}
            motionDelay={0.3}
          />

          <CardNumber
            number={100}
            script={data.numbers.dealers??""}
            icon={
              <FaHandshake
                size={70}
                style={{
                  zIndex: '0',
                }}
                className="number-icon p-2 bg-grey-900 text-dark-light shadow rounded-3 position-absolute"
              />
            }
            delayNum={1}
            prefix=">"
            includeArrow={true}
            motionDelay={0.6}
          />
        </div>
      </div>
    </>
  );
};
