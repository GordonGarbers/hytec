import React from 'react';
import { CarouselUniversalInner } from './CarouselUniversalInner';
import { ESection, IDataDetails, IHero } from '../../interfaces/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  A11y,
  Keyboard,
  Pagination,
  Scrollbar,
  Navigation as swiperNavigation,
} from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

interface ICarouselUniversal {
  isLoaded: boolean;
  data: IDataDetails;
  error: string;
  section: ESection;
  children: React.ReactNode;
  useKey: boolean;
}

export const CarouselUniversal: React.FC<ICarouselUniversal> = ({
  isLoaded,
  data,
  error,
  section,
  children,
  useKey,
}) => {
  const getHeroPages = data.hero.map((heroPage: IHero, idx: number) => {
    return (
      <SwiperSlide key={idx}>
        <CarouselUniversalInner
          data={data}
          page={heroPage}
          isDataLoaded={isLoaded}
        />
      </SwiperSlide>
    );
  });

  return (
    <>
      <div className="hero-swiper-wrapper">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          keyboard={{
            enabled: true,
          }}
          autoplay
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, swiperNavigation]}
          className="mySwiper"
        >
          {getHeroPages}
        </Swiper>
      </div>
    </>
  );
};
