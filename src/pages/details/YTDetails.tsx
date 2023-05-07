import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { Centerize } from "../../components/layout/Centerize";
import { EColors } from "../../constants/constants";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";

interface IYTDetailsProps{
    url: string;
}


export const YTDetails: React.FC<IYTDetailsProps> = ({url}) => {
    const {value} = useAppSelector((state: RootState) => state.counter);
    const { windowWidth } = useAppSelector((state: RootState) => state.width);

  return (
    <div
        key={value}
      style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
      className="rounded-2"
    >
      <ReactPlayer
        light={
          <div style={{backgroundColor:`${EColors.dark}`, width:'100%', height:'100%'}} className="">
            <Centerize>
                <div className={`d-flex flex-column gap-${windowWidth > 620 ? '4' : '2'}`} style={{width:`${windowWidth > 620 ? '200px' : '100px'}`}}>

                    <div style={{width:'100%'}} className="">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 284 197"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M27.5 31.5L1 1.5L117.5 47L126.5 74H158L166.5 47L283 1L256 31.5L180 55.5L163 97.5L183.5 61L241.5 47L222 68.5L180 74L212 79L195 98L172 88L188.5 105L177.5 117.5L164 103.5L175.5 129.5L169 142.5L155.5 123.5L164 151.5L144.5 196.5V120L154.5 85H129.5L139 120V196.5L119.5 151.5L128 123.5L115 142.5L108.5 129.5L119.5 103.5L106 117.5L95.5 105L111.5 88L88.5 98L72.5 79L104 74L62 68.5L42.5 47L100.5 61L121 98L104 55.5L27.5 31.5Z"
                            // fill="#F7D100"
                            stroke="#F7D100"
                            strokeWidth="1"
                            />
                        </svg>
                    </div>

                    <div style={{width:'100%'}}>
                        <svg width="100%" height="48" viewBox="0 0 249 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 47V1H11.5V47H0.5Z" fill="#F7D100"/>
                            <path d="M17.5 28V18.5H34V1H46V47H34V28H17.5Z" fill="#F7D100"/>
                            <path d="M71.5 31L48 1H62.5L77.5 20L91.5 1H105L82.5 31V47H71.5V31Z" fill="#F7D100"/>
                            <path d="M107 13V1H150.5V13H134.5V47H122.5V13H107Z" fill="#F7D100"/>
                            <path d="M154 47V1H196V13H165.5V35H196V47H154Z" fill="#F7D100"/>
                            <path d="M170.5 28V19H194V28H170.5Z" fill="#F7D100"/>
                            <path d="M221 1H248V13H221C215.5 13 211 17.5 211 24C211 31 216.5 35 221 35H248V46H221.5C212 46 200.4 38.7 200 23.5C199.6 8.3 211 1 221 1Z" fill="#F7D100"/>
                        </svg>
                    </div>
                </div>


            </Centerize>

          </div>
        }

        style={{ position: "absolute", top: "0", left: "0" }}
        className="react-player"
        url={url}
        width="100%"
        height="100%"
        controls
        playing
      />
    </div>
  );
};
