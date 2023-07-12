import React from "react";
import { Swiper } from "swiper/react";
import {
  A11y,
  Pagination,
  Scrollbar,
  Navigation as swiperNavigation,
} from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

interface IRelatedProductsProps {
   relatedProducts: JSX.Element[]
}

export const RelatedProducts: React.FC<IRelatedProductsProps> = ({relatedProducts}) => {
    const { windowWidth } = useAppSelector((state: RootState) => state.width);

    return (
        <Swiper
            slidesPerView={windowWidth > 1080 ? 4 : windowWidth > 780 ? 3 : windowWidth < 370 ? 1 : 2}
            spaceBetween={30}
            pagination={{
            clickable: true,
            }}
            modules={[swiperNavigation, Pagination, Scrollbar, A11y]}
            className="mySwiper"
        >
            {relatedProducts}
      </Swiper>
    )
}