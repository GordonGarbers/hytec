import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { IDataDetails, IProducts } from '../../interfaces/interfaces';
import { AiFillHome } from 'react-icons/ai';
import { EColors } from '../../constants/constants';
import { Variants, motion } from 'framer-motion';

const breadCumb: Variants = {
  initial: {
    scale: 3,
  },
  animate: {
    scale: 3,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

interface INavDetailsProps {
  finalProduct: IProducts;
  dataIsLoaded: boolean;
  relatedProducts: IProducts;
  data: IDataDetails;
}

export const NavDetails: React.FC<INavDetailsProps> = ({
  finalProduct,
  dataIsLoaded,
  relatedProducts,
}) => {
  const navigate = useNavigate();

  return (
    <nav className="fs-14 mb-3">
      <ul className="d-flex align-items-center gap-2 list-unstyled ">
        <li className="d-flex align-items-center gap-2">
          <NavLink to="/" className="text-dark-light d-flex align-items-center">
            <motion.div
              className=""
              whileTap={{ scale: 0.8 }}
              whileHover={{ color: EColors.primary }}
            >
              <AiFillHome size={20} style={{ paddingBottom: '2px' }} />
            </motion.div>
          </NavLink>

          <IoIosArrowForward className="text-dark-light" />
        </li>

        <li className="d-flex align-items-center gap-2">
          <NavLink
            to={`/category/${finalProduct?.categorie}`}
            state={{ section: relatedProducts }}
            className="text-dark"
          >
            {!dataIsLoaded ? (
              finalProduct?.categorie ? (
                <motion.div>
                  <motion.span
                    whileHover={{
                      borderBottom: `1px solid ${EColors.primary}`,
                    }}
                    whileTap={{ borderBottom: `1px solid rgba(0,0,0,3)` }}
                    style={{
                      paddingBottom: '1px',
                      borderBottom: `1px solid rgba(0,0,0,.4)`,
                      lineHeight: '48px',
                    }}
                  >
                    {decodeURIComponent(finalProduct?.categorie)
                      .charAt(0)
                      .toUpperCase() +
                      decodeURIComponent(finalProduct?.categorie).slice(1)}
                  </motion.span>
                </motion.div>
              ) : (
                ''
              )
            ) : (
              <Skeleton count={1} width={60} />
            )}
          </NavLink>
          <IoIosArrowForward className="text-dark" />
        </li>

        <li>
          <div className="text-grey-500">
            {!dataIsLoaded ? (
              finalProduct?.name ? (
                decodeURIComponent(finalProduct?.name)
              ) : (
                ''
              )
            ) : (
              <Skeleton count={1} width={60} />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};
