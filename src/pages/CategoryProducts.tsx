import React from "react";
import { useLocation } from "react-router-dom";
import { RelatedProducts } from "./details/RelatedProducts";

export const CategoryProducts = () => {
    const location = useLocation()
    const section = location.state?.section as JSX.Element[]
    
    // console.log('pppp', location.state);
    return (
        <>
            <div style={{width:'300px', height: '300px', backgroundColor:'red'}}>JOX</div>
            
      <div className="w-100 mt-5 bg-grey-900 ">
        <div className="container-fluid-02 ps-3 pe-3 pt-4 pb-5">

        <div className="text-primary fw-bold text-center fs-13">HYTEC EQUIPMENT</div>
        <h1
          style={{ fontWeight: "900" }}
          className="text-dark fs-8 mb-5 text-center "
        >
          Related Products
        </h1>
        
        <RelatedProducts relatedProducts={section}/>
        </div>
      </div>
            
        
            
        </>
    )
}