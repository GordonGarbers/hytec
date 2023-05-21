import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { NavLink, useNavigate } from "react-router-dom";
import { IProducts } from "../../interfaces/interfaces";
import { scrollToSection } from "../../utils/getActiveElementScrollPos";

interface INavDetailsProps {
  finalProduct: IProducts;
  dataIsLoaded: boolean;
}

export const NavDetails: React.FC<INavDetailsProps> = ({
  finalProduct,
  dataIsLoaded,
}) => {
  const navigate = useNavigate();

  const onBreadClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    section: string
  ) => {
    e.preventDefault();
    navigate("/", { state: section });
  };

  return (
    <nav className="fs-14 d-flex align-items-center gap-1 mb-3">
      {/* <NavLink to={process.env.PUBLIC_URL} className="text-grey-400"> */}
      <button
        onClick={(e) => onBreadClick(e, "home")}
        className="nav-bread-btn btn btn-primary p-1 rounded-1 fw-bold px-2"
      >
        Home
      </button>
      <IoIosArrowForward className="text-primary" />
      {/* <NavLink to={process.env.PUBLIC_URL} className="text-grey-400"> */}
      <button
        onClick={(e) => onBreadClick(e, "machinery")}
        className="nav-bread-btn btn btn-primary p-1 rounded-1 fw-bold px-2"
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
      <IoIosArrowForward className="text-primary" />
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
