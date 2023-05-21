import React from "react";
import { useLocation } from "react-router-dom";
import { RelatedProducts } from "./details/RelatedProducts";
import { IProducts } from "../interfaces/interfaces";
import { useRandomProducts } from "./details/hooks/useRandomProducts";
import {motion} from 'framer-motion'
import { transitionSpeed } from "../constants/constants";

export const CategoryProducts = () => {
    const location = useLocation()
    const section = location.state?.section as IProducts
    const randomProductPerCategorieElements = useRandomProducts(section)
    
    // console.log('pppp', location.state);
    return (
        <motion.div
          animate={{opacity:1}}
          initial={{opacity:0}}
          exit = {{opacity:0}}
          transition={{duration:`${transitionSpeed}`}}
          className="details-article-wrapper"
        >            
          <div className="w-100 mt-5 bg-grey-900 ">
            <div className="container-fluid-02 ps-3 pe-3 pt-4 pb-5">

            <div className="text-primary fw-bold text-center fs-13">HYTEC EQUIPMENT</div>
            <h1
              style={{ fontWeight: "900" }}
              className="text-dark fs-8 mb-5 text-center "
            >
              {section.categorie.toUpperCase()}
            </h1>
            
            <RelatedProducts relatedProducts={randomProductPerCategorieElements}/>
            </div>
          </div>
        </motion.div>
    )
}