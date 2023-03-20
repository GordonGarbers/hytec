import React, { ReactNode } from 'react';
import { MAXIMUM_CONTAINER_WIDTH } from '../../constants/constants';

interface IContainerProps{
    children: ReactNode
}

export const Container: React.FC<IContainerProps> = ({children}) => {
    return (
        <div style = {{maxWidth:`${MAXIMUM_CONTAINER_WIDTH}px`}} className='container-fluid'>
            {children}
        </div>
    )
}