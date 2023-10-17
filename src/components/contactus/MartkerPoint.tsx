import React from 'react';

export const MarkerPoint: React.FC = () => {
  return (
        <svg
        width="43"
        height="43"
        viewBox="0 0 43 43"
        fill="#698AFF"
        xmlns="http://www.w3.org/2000/svg"
        >
        <circle
            cx="21.5"
            cy="21.5"
            r="13.3095"
            fill="#698AFF"
            fillOpacity="0"
        />
        <circle cx="21.5" cy="21.5" r="10" fill="#5A72C5" stroke="#698AFF" strokeOpacity="0.5" strokeWidth={6} />
        <circle cx="21.5" cy="21.5" r="7" fill="#5A72C5" stroke="#698AFF" />
        <circle cx="21.5" cy="21.5" r="2" fill="#5A72C5" stroke="#694AFF"  strokeWidth={4}/>
        </svg>
  );
};
