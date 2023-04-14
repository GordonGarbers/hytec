import React from 'react';

interface IFlexMainWrapperProps{
    children: React.ReactNode;
}

export const FlexMainWrapper: React.FC<IFlexMainWrapperProps> = ({children}) => {
    return (
        <div style={{minHeight: '100vh'}} className='d-flex flex-column w-100 h-100'>
            {children}
        </div>
    )
}