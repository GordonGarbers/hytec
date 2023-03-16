import React from "react";
import './hero.scss'
import hero from '/assets/baumachine_01.jpg';

export const Hero: React.FC = () => {
    return (
        <>
            <div className="position-fixed w-100 hero bg-info">
                <img src={'/assets/baumachine_01.jpg'} alt='hero'/>
            </div>
        </>
    )
}