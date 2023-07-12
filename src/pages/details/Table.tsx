import React, { useState } from 'react';
import { IDataDetails, IProducts } from '../../interfaces/interfaces';
import { EProductSections } from '../../constants/constants';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Skeleton from 'react-loading-skeleton';

interface ITableProps {
  finalProduct: IProducts;
  sectionName: EProductSections;
  displayName: string;
  sectionClass: string;
  dataIsLoaded: boolean;
  data: IDataDetails;
}

export const Table: React.FC<ITableProps> = ({ finalProduct, sectionName, displayName, sectionClass, dataIsLoaded, data }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const rows =
    finalProduct &&
    finalProduct[sectionName] &&
    finalProduct[sectionName].map((row: string, idx: number) => {
      const rowSplit = row.split(':');
      const section = rowSplit[0];
      const spec = rowSplit[1];
      const value = rowSplit[2];
      return (
        <tr key={idx} className="">
          {sectionName === EProductSections.accessories ? (
            <>

              <td>
              {!dataIsLoaded ? (
                section
              ) : (
                <Skeleton count={1} height={16} width={80} />
              )}
                </td>
              <td className="" style={{textAlign:'right'}}>
              {!dataIsLoaded ? (
                <div>{spec} <span className="fs-15">{value}</span></div>
              ) : (
                <Skeleton count={1} height={16} width={60} />
              )}
                
              </td>
              <td style={{ width: '0px' }}></td>
            </>
          ) : (
            <>
              <td>
              {!dataIsLoaded ? (
                section
              ) : (
                <Skeleton count={1} height={16} width={80} />
              )}
                </td>
              <td>
              {!dataIsLoaded ? (
                spec
              ) : (
                <Skeleton count={1} height={16} width={80} />
              )}
                </td>
              <td>
              {!dataIsLoaded ? (
                value
              ) : (
                <Skeleton count={1} height={16} width={60} />
              )}
                </td>
            </>
          )}
        </tr>
      );
    });

  return (
    <div className={`mb-4 d-flex flex-column align-items-center justify-content-center table-wrapper ${sectionClass}`}>
      <table className="table rounded-2">
        <thead className="bg-dark-light text-grey-900">
          <tr className="">
            <th>{displayName.toUpperCase()}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows?.slice(0, showMore ? rows.length : 5)}

        </tbody>
        <tfoot>
        {!showMore && (
            <tr>
              <td>...</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tfoot>
      </table>
      <button
        className=" fw-bold fs-15 text-dark btn btn-outline-primary-500 p-2"
        onClick={() => setShowMore(!showMore)}
      >
        <span>{!showMore ? data.rest.showMore : data.rest.showLess}</span>{' '}
        {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}{' '}
      </button>
    </div>
  );
};
