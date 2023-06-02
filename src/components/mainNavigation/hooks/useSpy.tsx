import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

export const useSpy = (marginRoot: number) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
      const navSections = document.querySelectorAll(".nav-sections")
      const navButtons = document.querySelectorAll("li")

      console.log('---', navButtons.length);
      const removeActiveClass = () => {
        navButtons.forEach((elem: Element) => {
          // elem.classList.remove("nav-btn-active")
          elem.classList.remove("nav-text-wrapper")
        })
      }
      

    const addActiveClass = (entries: IntersectionObserverEntry[]
      ) => {
      entries.forEach((entry)=>{

        if(entry.isIntersecting){
          setIsIntersecting(entry.isIntersecting);
          const currentNavBtn = document.querySelector(`li[id="${entry.target.id}-nav-btn"]`)
          removeActiveClass();
          // currentNavBtn?.classList.add("nav-btn-active")
          currentNavBtn?.classList.add("nav-text-wrapper")
        }
      })
    }
    
    const options: IntersectionObserverInit = {
      // threshold: 0.8,
      rootMargin: `${marginRoot}px`
    }

    const observer = new IntersectionObserver(addActiveClass, options);


    if(navSections){
      navSections.forEach((section:Element) => {
        console.log('SECTION: ', section);
        observer.observe(section);
      })
    }

    return () => observer.disconnect();
  }, [isIntersecting, data]);
}