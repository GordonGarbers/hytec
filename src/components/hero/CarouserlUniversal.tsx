import { AnimatePresence, motion } from 'framer-motion';
import React, {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { wrap } from '@popmotion/popcorn';
import { CarouselUniversalInner } from './CarouselUniversalInner';
import { ArrowButtons } from '../hero/ArrowButtons';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { pauseCarousel } from '../../features/pauseHeroPage/pauseHeroPage';
import { RootState } from '../../app/store';
import { useKeyPress } from '../hooks/useKeyPress';
import { ESection, IDataDetails, IHero } from '../../interfaces/interfaces';
import { TIME } from '../../constants/constants';
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
      <SwiperSlide>

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
        {/* <div style={{clipPath: 'polygon(0% 10%, 40% 10%, 100% 100%, 100% 0%, 0% 0%)'}}className="w-100 h-100 bg-primary position-absolute"></div> */}

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
