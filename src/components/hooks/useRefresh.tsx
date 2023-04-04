import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getScrollY } from "../../features/scrollPosition/scrollPosition.slice";
import { getWindowWidth } from "../../features/windowWidth/windowWidth.slice";


export const useRefresh = ()=>{

    const {windowWidth} = useAppSelector((state: RootState) => state.width)
    
    const {scrollY} =  useAppSelector((state:RootState) => state.scrollPos)
    const dispatch = useAppDispatch();
    
    // const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    
    const handleScroll = () => {
      const position = window.pageYOffset;
      dispatch(getScrollY(position))
    };
    
    let resizeWindow = () => {
      // setWindowWidth(window.innerWidth);
      dispatch(getWindowWidth(window.innerWidth))
      setWindowHeight(window.innerHeight);
    };
    
    
    useEffect(() => {
      handleScroll();
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("resize", resizeWindow);
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return {windowWidth, scrollY}
}
