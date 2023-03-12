import React, { useRef } from 'react';

interface ILiProps{
    btnName: string
}

export const Li:React.FC<ILiProps> = ({btnName})=>{
    const ref = useRef<HTMLLIElement>(null);
    return (
        <li ref = {ref} role="button" className="" data-add-btn={false}>
          {btnName}
        </li>
    )
}