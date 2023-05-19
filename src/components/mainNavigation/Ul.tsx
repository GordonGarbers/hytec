import React, { useEffect, useRef, useState } from "react";
import { Li } from "./Li";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setNavButton } from "../../features/navButton/navButtons.slice";
import { Mover } from "../mover/Mover";
import { useWindowAndScrollDetection } from "../hooks/useWindowAndScrollDetection";
import { useNavigate } from "react-router-dom";
import { INav } from "../../interfaces/interfaces";
import { scrollToSection } from "../../utils/getActiveElementScrollPos";

interface IUlProps {
  windowWidth: number;
}

export const Ul: React.FC<IUlProps> = ({ windowWidth }) => {
  const { dataIsLoaded, data, dataError } = useAppSelector(
    (state: RootState) => state.data
  );


  const navigate = useNavigate()

  const { isScrolling, isWindowChange } = useWindowAndScrollDetection();

  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);

  const ref = useRef<HTMLUListElement>(null);

  const { activeBtnValue, activeBtnName } = useAppSelector(
    (state: RootState) => state.navButtons
  );

  const dispatch = useAppDispatch();


  const onLiBtnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, btnName: string) => {
    e.preventDefault();
    dispatch(
      setNavButton({
        activeBtnValue: e.currentTarget.value,
        // activeBtnName: e.currentTarget.textContent?.split(" ").join("").toLowerCase() ?? "",
        activeBtnName: btnName,
      })
    );
    sessionStorage.setItem("btnValue", e.currentTarget.value.toString());
    sessionStorage.setItem(
      "btnName",
      btnName
      // e.currentTarget.textContent?.split(" ").join("").toLowerCase() ?? ""
    );
      // console.log(btnName.split(" ").join("").toLowerCase());
      // navigate(btnName==="Home" || btnName==="Start" ? "/" : btnName.split(" ").join("").toLowerCase())
      navigate("/")
      scrollToSection(btnName)
      
  };

  useEffect(() => {
    const btnValue = sessionStorage.getItem("btnValue") || activeBtnValue;
    const btnName = sessionStorage.getItem("btnName") || activeBtnName;
    dispatch(
      setNavButton({
        activeBtnValue: parseInt(btnValue as string),
        activeBtnName: btnName,
      })
    );
  }, [activeBtnValue, activeBtnName, dispatch]);


  // const scrollToSection = (btnName: string) => {
  //   const section = document.querySelector( `#${btnName}` );
  //   if(section)
  //     section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  // };



  useEffect(()=>{
    // const section = document.getElementById( `${activeBtnName}` );
    // console.log(section);
    if(activeBtnName )
      scrollToSection(activeBtnName);
      // window.scrollTo({ behavior: 'smooth', top:  section.offsetTop})
  },[])

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const navSections = document.querySelectorAll(".nav-sections")

      const navButtons = document.querySelectorAll("li")

      const removeActiveClass = () => {
        navButtons.forEach((elem: Element) => {
          elem.classList.remove("nav-btn-active")
        })
      }
      

    const addActiveClass = (entries: IntersectionObserverEntry[]
      ) => {
      entries.forEach((entry)=>{

        if(entry.isIntersecting){
          setIsIntersecting(entry.isIntersecting);
          const currentNavBtn = document.querySelector(`li[id="${entry.target.id}"]`)
          removeActiveClass();
          currentNavBtn?.classList.add("nav-btn-active")
        }
      })
    }

    const options: IntersectionObserverInit = {
      // threshold: 0.8,
      rootMargin: '-300px'
    }

    const observer = new IntersectionObserver(addActiveClass, options);


    if(navSections){
      navSections.forEach((section:Element) => {
        observer.observe(section);
      })
    }

    return () => observer.disconnect();
  }, [isIntersecting, data]);


  const liList = data.nav.map((item: INav, idx: number) => {
    // console.log('Prvi broj: ', activeBtnValue as number, 'Drugi broj: ', idx, typeof activeBtnValue, typeof idx);
    return (
      <Li
        key={idx}
        idName={item.idName}
        btnName={item.displayName}
        value={idx}
        data={false}
        func={(e) => onLiBtnClick(e, item.idName)}
        btnValue={activeBtnValue}
        addToClassName={
          // item.split(" ").join("").toLowerCase() === activeBtnName &&
          activeBtnValue === idx && windowWidth < 620
            ? "selected-button position-relative"
            : ""
        }
      >
      </Li>
    );
  })

  return (
    <>
      <ul
        ref={ref}
        className="scroll-indicator text-secondary mt-sm-1 list-unstyled d-flex flex-column align-items-start flex-sm-row gap-4 gap-sm-6 px-3 pb-0"
      >

        {liList}


        {/* {windowWidth > 620 && (
          <Mover
            show={windowWidth}
            ulRef={ref}
            btnToMove={activeBtnValue}
            offest={16}
            bgColor={false}
            zIndex="3"
            expand={0}
            rounded={false}
            speed={isScrolling || isWindowChange ? 0 : 0.3}
          />
        )} */}
      </ul>
    </>
  );
};
