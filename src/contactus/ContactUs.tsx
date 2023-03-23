import React, { useEffect, useState } from 'react';
import { MAXIMUM_CONTAINER_WIDTH } from '../constants/constants';
import Skeleton from 'react-loading-skeleton';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { MarkerPoint } from './MartkerPoint';
import { motion } from 'framer-motion';
import { XLg } from 'react-bootstrap-icons';


export const ContactUs: React.FC = () => {
  const [center, setCenter] = useState<[number, number]>([53.3327, 10.2165]);
  const [zoom, setZoom] = useState(11);
  const [close, setClose] = useState<boolean>(false);

  return (
    <div style={{}} className="text-grey-800 bg-dark ">
      <div
        style={{ maxWidth: `${MAXIMUM_CONTAINER_WIDTH}px`, height:'700px'}}
        className="container-fluid d-flex justify-content-between gap-5 w-100 py-6"
      >
        <div className='w-50 ps-3'>
          <h1 style={{ fontWeight: '600' }} className="fs-6 pt-0 text-primary">
            CONTACT US
          </h1>
          <p className="fs-13">We are always here to help you.</p>
        </div>

        <div
          style={{
            width: '50%',
            overflow: 'hidden',
          }}
          className="rounded-2"
        >
          <Map defaultCenter={center} zoom={zoom}>
            <Overlay anchor={center} offset={[118, 144]} className={`${close ? 'd-none' : 'd-block'}`}>
              <motion.div
                animate={{y: close ? 40 : 0, scale: close ? .5:1, opacity: close ? 0 : 1}}
                transition={{
                  type:'spring',
                  stiffness: 200 
                }}
              className="d-flex flex-column position-relative">
                <div style={{width:'16px', height:'16px', transform:'rotate(45deg) translate(-50%, 0)', backgroundColor:'#fff', bottom:'-14px', left:'50%'}} className='position-absolute'></div>
                <div
                  // style={{ backgroundColor: '#eee' }}
                  className="d-flex text-primary flex-column gap-1 rounded-top bg-dark"
                >
                  <div role={"button"} onClick = {() => setClose(true)}><XLg style={{right:'5px', top:'5px'}} size = {16} className='text-grey-800 position-absolute'/></div>
                  <div className = ' d-flex flex-row p-2 justify-content-between align-items-center gap-2'>
                    <div
                      style={{ width: '30px', height: '30px'}}
                      className="rounded-pill overflow-hidden"
                    >
                      <img
                        src="assets/thumbnails/traktor.webp"
                        alt="traktor"
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ fontWeight: '600' }} className="fs-14">
                      {' '}
                      HYTEC Baumaschinen GmbH
                    </div>
                    <div style={{width:'20px'}}></div>
                  </div>

                </div>

                <div style={{backgroundColor:'#fff'}} className='p-3 rounded-bottom'>
                  <div className="fs-14 fw-bold text-grey-400">
                    Borgwardstraße 6
                  </div>
                  <div className='fs-14 text-grey-500'>21423 Winsen / Luhe</div>
                </div>
              </motion.div>
            </Overlay>
            <Marker
              style={{opacity:'0'}}
              width={50}
              color={'#f7d100'}
              anchor={center}
              offset={[0, -40]}
              onClick={()=>setClose(false)}
            />
            <Marker
              width={50}
              color={'#f7d100'}
              anchor={center}
              offset={[0, -40]}
            >
              <div  className=''><MarkerPoint/></div>
            </Marker>
          </Map>
        </div>
      </div>
    </div>
  );
};
