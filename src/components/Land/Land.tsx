import React, { useEffect, useRef, useState } from 'react';
import { logoPos } from '../../constants/constants';
import { logoPosType } from '../../constants/constants';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getImageRatio } from '../../utils/createImagePlaceholder';
import { Spinner } from '../spinner/Spinner';
import Tilt from 'react-parallax-tilt';

// import Background from '../../../public/assets/png/DE_01.png'

const variants = {
  from: {
    scale: 0.5,
    opacity: 0,
  },
  to: {
    scale: 1,
    opacity: 1,
  },
};

export const Land: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleImageOnLoad = () => {
    setIsLoaded(true);
  };

  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);
  const { windowWidth } = useAppSelector((state: RootState) => state.width);

  const ref = useRef<HTMLDivElement>(null);

  const logoPosElements = logoPos.map((item: logoPosType, idx: number) => {
    return (
      <motion.div
        variants={variants}
        initial="from"
        whileInView="to"
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          delay: scrollY > 400 ? 0.1 * idx : 0,
          type: 'spring',
          stiffness: 100,
        }}
        key={idx}
        style={{
          maxWidth: windowWidth <= 620 ? '90px' : '110px',
          top: `${item.x}%`,
          left: `${item.y}%`,
        }}
        className="position-absolute"
      >
        <img
          onLoad={handleImageOnLoad}
          style={{ width: '100%' }}
          className="bg-dark-light border border-1 border-grey-400 p-2 rounded-2 shadow"
          src="assets/hytec-05.png"
          alt="hytec-logo"
        />
      </motion.div>
    );
  });

  return (
    <div style={{ backgroundColor: '#fff' }} className="mt-6 py-6">
      <div className="container-fluid-02">
        <div
          ref={ref}
          style={{ maxWidth: '600px' }}
          className="position-relative bg-primary"
        >
          <Tilt perspective={1000}
          //   style={{
          //     transformStyle: 'preserve-3d',
          //     transform: 'perspective(1000px)',
          //     backgroundImage: `url(${Background})`,
          //     backgroundSize: 'contain',
          //     backgroundRepeat: 'no-repeat'
          //   }}
          >
            <div className="w-100 h-100">
              <img
                style={{ width: '100%', filter: 'brightness(150%)' }}
                src={
                  isLoaded ? 'assets/png/DE_01.png' : getImageRatio(2392, 3198)
                }
                alt="DE-map"
              />
            </div>
            {logoPosElements}
            {!isLoaded ? <Spinner size={100} width={3} /> : <div></div>}
          </Tilt>
        </div>
      </div>
    </div>
  );
};
