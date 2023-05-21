import React from "react";
import {motion} from 'framer-motion'
import { transitionSpeed } from "../../constants/constants";

interface IFadeInMotionWrapperProps{
    children: React.ReactNode;
}

export const FadeInMotionWrapper: React.FC<IFadeInMotionWrapperProps> = ({children}) => {
    return (
        <motion.div
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit = {{opacity:0}}
        transition={{duration:`${transitionSpeed}`}}
        >
            {children}
        </motion.div>
    )
}