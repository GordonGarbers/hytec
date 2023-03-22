import React, { ReactNode } from "react";

interface IArrowButtonsProps{
    paginate: (newDirection: number) => void;
    direction: number;
    children: ReactNode;
    addClass: string;
}

export const ArrowButtons: React.FC<IArrowButtonsProps> = ({paginate, direction, children, addClass})=>{
    return (
        <button
            onClick={() => paginate(direction)}
            className={`m-3 p-3 btn btn-grey-900 rounded-0 shadow-lg ${addClass} position-absolute`}
        >
            {children}
        </button>
        )
}