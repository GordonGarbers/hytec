import React, { ReactNode } from "react";

interface IMainProps{
    children: ReactNode;
}

export const Main: React.FC<IMainProps> = ({children}) => {
    return<>
        {children}
    </>
}