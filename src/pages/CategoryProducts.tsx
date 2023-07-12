import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RelatedProducts } from './details/RelatedProducts';
import { IProducts } from '../interfaces/interfaces';
import { useRandomProducts } from './details/hooks/useRandomProducts';
import { motion } from 'framer-motion';
import { EColors, transitionSpeed } from '../constants/constants';
import { onMainMenuShowHide } from '../components/products/features/hideShowMainMenu.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AiFillHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { RootState } from '../app/store';
import Skeleton from 'react-loading-skeleton';
import { ContactUs } from '../components/contactus/ContactUs';

export const CategoryProducts = () => {
  const location = useLocation();
  const section = location.state?.section as IProducts;
  const randomProductPerCategorieElements = useRandomProducts(section);
  const dispatch = useAppDispatch();

  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(onMainMenuShowHide(true));
  }, [randomProductPerCategorieElements]);

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: `${transitionSpeed}` }}
        className="details-article-wrapper"
      >
        <div
          className="container-fluid-02 ps-3 pe-3"
          style={{ paddingTop: '1.85rem' }}
        >
          <nav className="fs-14 mb-3">
            <ul className="d-flex align-items-center gap-2 list-unstyled ">
              <li className="d-flex align-items-center gap-2">
                <NavLink
                  to="/"
                  className="text-dark-light d-flex align-items-center"
                >
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

              <li>
                <div className="text-grey-500">
                  {!dataIsLoaded ? (
                    section.categorie.charAt(0).toUpperCase() +
                    section.categorie.slice(1)
                  ) : (
                    <Skeleton count={1} width={60} />
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <div className="w-100 mt-4 mb-5">
          <div className="container-fluid-02 ps-3 pe-3 pt-4 pb-5">
            <div className="text-primary fw-bold text-center fs-13">
              HYTEC EQUIPMENT
            </div>
            <h1
              style={{ fontFamily: 'RobotoBlack'}}
              className="text-dark fs-8 mb-5 text-center "
            >
              {section.categorie.toUpperCase()}
            </h1>

            <RelatedProducts
              relatedProducts={randomProductPerCategorieElements}
            />
          </div>
        </div>
        <ContactUs />
      </motion.div>
    </>
  );
};
