import React, { useState } from "react";
import { Map, Marker, Overlay } from 'pigeon-maps';
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {motion} from 'framer-motion'
import { MarkerPoint } from "./MartkerPoint";
import { XLg } from 'react-bootstrap-icons';


export const PigeonMap: React.FC = ()=>{
    const {windowWidth} = useAppSelector((state: RootState) => state.width)

    const [center, setCenter] = useState<[number, number]>([ 53.3327, 10.2165]);
    const [zoom, setZoom] = useState(12);
    const [close, setClose] = useState<boolean>(false);
    
    return (
        <div
          style={{
            // height:'300px',
            overflow: 'hidden',
          }}
          className="rounded-0 me-3 map-wrapper"
        >
          <Map defaultCenter={[ windowWidth > 620 ? 53.3327 : 53.345, 10.2165]} twoFingerDrag={true} metaWheelZoom={false} zoom={zoom}>
            <Overlay anchor={center} offset={[131, 144]} className={`${close ? 'd-none' : 'd-block'}`}>
              <motion.div
                animate={{y: close ? 40 : 0, scale: close ? .5:1, opacity: close ? 0 : 1}}
                transition={{
                  type:'spring',
                  stiffness: 200 
                }}
              className="d-flex flex-column position-relative shadow">
                <div style={{width:'16px', height:'16px', transform:'rotate(45deg) translate(-50%, 0)', backgroundColor:'#fff', bottom:'-14px', left:'50%'}} className='position-absolute'></div>
                <div
                  // style={{ backgroundColor: '#eee' }}
                  className="d-flex text-dark-form flex-column gap-1 rounded-top bg-primary"
                >
                  <div role={"button"} onClick = {() => setClose(true)}><XLg style={{right:'5px', top:'5px'}} size = {16} className='text-dark position-absolute'/></div>
                  <div className = ' d-flex flex-row p-2 justify-content-between align-items-center gap-2'>
                    <div
                      style={{ width: '30px', height: '30px'}}
                      className="rounded-pill overflow-hidden"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/thumbnails/traktor.webp`}
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
    )
}