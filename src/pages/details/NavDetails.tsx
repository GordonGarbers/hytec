import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { IProducts } from "../../interfaces/interfaces";

interface INavDetailsProps{
    finalProduct: IProducts,
    dataIsLoaded: boolean
}

export const NavDetails: React.FC<INavDetailsProps> = ({finalProduct, dataIsLoaded}) => {
    return(
        <nav className="fs-14 d-flex align-items-center gap-1 mb-3">
        <NavLink to={process.env.PUBLIC_URL} className="text-grey-400">
          Home
        </NavLink>
        <IoIosArrowForward className="text-primary" />
        <NavLink to={process.env.PUBLIC_URL} className="text-grey-400">
          {!dataIsLoaded ? (
            finalProduct?.categorie ? (
              decodeURIComponent(finalProduct?.categorie)
            ) : (
              ''
            )
          ) : (
            <Skeleton count={1} width={60} />
          )}
        </NavLink>
        <IoIosArrowForward className="text-primary" />
        <div className="text-grey-400">
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
      </nav>
    )
}