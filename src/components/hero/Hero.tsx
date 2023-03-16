import React from "react";
import './hero.scss'
import hero from '/assets/baumachine_01.jpg';

export const Hero: React.FC = () => {
    return (
        <>
            <div style = {{height:'2000px', maxWidth:'1400px'}} className="container-fluid bg-info">
                {/* <img src={'/assets/baumachine_01.jpg'} alt='hero'/> */}
            </div>
        </>
    )
}