import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useRefresh } from './useRefresh';

export const useWindowAndScrollDetection = () => {
  const { windowWidth, scrollY } = useRefresh();
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isWindowChange, setIsWindowChange] = useState<boolean>(false);

  const handleEndScroll = useMemo(
    () => debounce(() => setIsScrolling(false), 10),
    []
  );

  const handleEndWindowChange = useMemo(
    () => debounce(() => setIsWindowChange(false), 10),
    []
  );

  const handleScroll = () => {
    setIsScrolling(true);
    handleEndScroll();
  };

  const handleWindowChange = () => {
    setIsWindowChange(true);
    handleEndWindowChange();
  };

  useEffect(() => {
    handleScroll();
    handleWindowChange();
  }, [scrollY, windowWidth]);

  return { isScrolling, isWindowChange };
};
