import React from "react";
import {IProducts } from "../../../interfaces/interfaces";
import Skeleton from "react-loading-skeleton";
import { SwiperSlide } from "swiper/react";
import { ToDetailsBtn } from "../../../components/ToDetailsBtn/ToDetailsBtn";
import { EColors } from "../../../constants/constants";
import { ImgCache } from "../../ImgCache";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

export const useRandomProducts = (products: IProducts) => {

    const { dataIsLoaded, data, dataError } = useAppSelector(
        (state: RootState) => state.data
      );

    const randomProductPerCategorie = data.products.filter(
        (dataProduct: IProducts, idx: number) => {
          return dataProduct.filter.categorie === products?.filter?.categorie && dataProduct.id !== products?.id;
        }
      );
    
      
    
      const randomProductPerCategorieElements = randomProductPerCategorie.map(
        (randomProduct: IProducts, idx: number) => {
          const fullImagePath = `${process.env.PUBLIC_URL}/${randomProduct.basePath}${randomProduct.productNamePath}${randomProduct.heroImage}`;
    
          return (
            <SwiperSlide key={idx} className="rounded-2 shadow-sm" style={{backgroundColor:'#fff'}}>
              <div className="pt-3"></div>
              {/* <img src={fullImagePath} alt="imd" className="pt-3"/> */}
    
              <ImgCache
                key={idx}
                url={randomProduct.heroImage}
                idx={idx}
                basePath={randomProduct.basePath}
                productNamePath={randomProduct.productNamePath}
                imgSizeX={983}
                imgSizeY={737}
                imageAlt={randomProduct.heroImage}
              />
    
              <div className="d-flex flex-column p-3">
              {!dataIsLoaded ? (
                    <div className="text-primary-dark fs-15" style={{fontWeight:500}}>{randomProduct.categorie.toUpperCase()}</div>
                  ) : (
                    <Skeleton count={1} height={12} width={60} baseColor={EColors.primary}/>
                  )}
              
              {!dataIsLoaded ? (
                    <div className="fs-11 fw-bold">{randomProduct.name}</div>
                    ) : (
                    <Skeleton count={1} height={16} width={90}/>
                  )}
                
    
              </div>
    
              <div className="w-100 px-3 pb-3">
              {!dataIsLoaded ? (
                    <ToDetailsBtn dataIsLoaded={false} product={randomProduct} data={data} fullWidth={true} reloadPage={false}/>
                    ) : (
                    <Skeleton count={1} height={32} width={'100%'} baseColor={EColors.primary}/>
                  )}
              </div>
            </SwiperSlide>
          );
        }
      );

      return randomProductPerCategorieElements;
}