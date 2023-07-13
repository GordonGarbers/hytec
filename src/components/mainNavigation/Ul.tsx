import React, { useEffect, useRef } from 'react';
import { Li } from './Li';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setNavButton } from '../../features/navButton/navButtons.slice';
import { useWindowAndScrollDetection } from '../hooks/useWindowAndScrollDetection';
import { useNavigate } from 'react-router-dom';
import { INav } from '../../interfaces/interfaces';
import { scrollToSection } from '../../utils/getActiveElementScrollPos';

interface IUlProps {
  windowWidth: number;
}

export const Ul: React.FC<IUlProps> = ({ windowWidth }) => {
  const { data } = useAppSelector(
    (state: RootState) => state.data
  );

  const navigate = useNavigate();

  const { isScrolling, isWindowChange } = useWindowAndScrollDetection();

  const { scrollY } = useAppSelector((state: RootState) => state.scrollPos);

  const ref = useRef<HTMLUListElement>(null);

  const { activeBtnValue, activeBtnName } = useAppSelector(
    (state: RootState) => state.navButtons
  );

  const dispatch = useAppDispatch();

  const onLiBtnClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    btnName: string
  ) => {
    e.preventDefault();
    dispatch(
      setNavButton({
        activeBtnValue: e.currentTarget.value,
        activeBtnName: btnName,
      })
    );
    sessionStorage.setItem('btnValue', e.currentTarget.value.toString());
    sessionStorage.setItem('btnName', btnName);

    navigate('/');
    scrollToSection(btnName);
  };

  useEffect(() => {
    const btnValue = sessionStorage.getItem('btnValue') || activeBtnValue;
    const btnName = sessionStorage.getItem('btnName') || activeBtnName;
    dispatch(
      setNavButton({
        activeBtnValue: parseInt(btnValue as string),
        activeBtnName: btnName,
      })
    );
  }, [activeBtnValue, activeBtnName, dispatch]);

  const liList = data.nav.map((item: INav, idx: number) => {
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
          activeBtnValue === idx && windowWidth < 620
            ? 'selected-button position-relative'
            : ''
        }
      >

      </Li>
    );
  });

  return (
    <>
      <ul
        ref={ref}
        style={{ marginBottom: 0 }}
        className="scroll-indicator text-secondary list-unstyled d-flex flex-column align-items-center flex-sm-row pe-3"
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
