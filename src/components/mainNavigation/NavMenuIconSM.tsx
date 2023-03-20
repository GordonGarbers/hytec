import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../app/hooks';
import { showAndHideManu } from '../../features/menu/showAndHideMenu.slice';

interface INavMenuIconSM {
    bool: boolean;
    children: ReactNode;
}

export const NavMenuIconSM: React.FC<INavMenuIconSM> = ({bool, children}) => {
    const dispatch = useAppDispatch();
  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 800 }}
      onClick={() => dispatch(showAndHideManu(bool))}
      className="d-block d-sm-none"
    >
      {children}
    </motion.div>
  );
};
