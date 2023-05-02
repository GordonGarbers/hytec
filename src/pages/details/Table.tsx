import React, { useState } from 'react';
import { IProducts } from '../../interfaces/interfaces';
import { EProductSections } from '../../constants/constants';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface ITableProps {
  finalProduct: IProducts;
  sectionName: EProductSections;
}

export const Table: React.FC<ITableProps> = ({ finalProduct, sectionName }) => {
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
              <td>{section}</td>
              <td className="">
                {spec} <span className="fs-15">{value}</span>
              </td>
              <td style={{ width: '0px' }}></td>
            </>
          ) : (
            <>
              <td>{section}</td>
              <td>{spec}</td>
              <td>{value}</td>
            </>
          )}
        </tr>
      );
    });

  return (
    <div className="mb-6 d-flex flex-column align-items-center justify-content-center table-wrapper">
      <table className="table rounded-2 fs-14">
        <thead className="bg-dark-light text-grey-900">
          <tr className="">
            {/* <th >{sectionName.toUpperCase()}:  <span style={{fontWeight:'300'}} className='fs-14 text-primary'> {finalProduct?.name}</span></th> */}
            <th>{sectionName.toUpperCase()}:</th>
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
        <span>show {!showMore ? 'more' : 'less'}</span>{' '}
        {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}{' '}
      </button>
    </div>
  );
};
