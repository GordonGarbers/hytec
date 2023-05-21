import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { NavLink, useNavigate } from "react-router-dom";
import { IProducts } from "../../interfaces/interfaces";
import { scrollToSection } from "../../utils/getActiveElementScrollPos";

interface INavDetailsProps {
  finalProduct: IProducts;
  dataIsLoaded: boolean;
  relatedProducts: IProducts
}

export const NavDetails: React.FC<INavDetailsProps> = ({
  finalProduct,
  dataIsLoaded,
  relatedProducts
}) => {
  const navigate = useNavigate();

  const onBreadClick = (
    e:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    url:string,
    section: IProducts
  ) => {
    e.preventDefault()
    navigate(url, { state: {section} });
  };


  return (
    <nav className="fs-14 d-flex align-items-center gap-1 mb-3">
      {/* <NavLink to={process.env.PUBLIC_URL} className="text-grey-400"> */}
      <button
        // onClick={() => onBreadClick("/", "home")}
        className="nav-bread-btn btn btn-primary p-1 rounded-1 px-1 fs-14"
      >
        Home
      </button>

      <IoIosArrowForward className="text-dark" />

      {/* <NavLink to={process.env.PUBLIC_URL} className="text-grey-400"> */}

      <button
        onClick={(e) => onBreadClick(e, `/${finalProduct.categorie}`, relatedProducts)}
        // to={`/${finalProduct.categorie}`}
        className="nav-bread-btn btn btn-primary p-1 rounded-1 px-1 fs-14"
      >
        {!dataIsLoaded ? (
          finalProduct?.categorie ? (
            decodeURIComponent(finalProduct?.categorie)
          ) : (
            ""
          )
        ) : (
          <Skeleton count={1} width={60} />
        )}
      </button>

      <IoIosArrowForward className="text-dark" />

      <div className="text-grey-400">
        {!dataIsLoaded ? (
          finalProduct?.name ? (
            decodeURIComponent(finalProduct?.name)
          ) : (
            ""
          )
        ) : (
          <Skeleton count={1} width={60} />
        )}
      </div>
    </nav>
  );
};
