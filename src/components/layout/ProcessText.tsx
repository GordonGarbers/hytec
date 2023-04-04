import React from "react";
import Skeleton from "react-loading-skeleton";

interface IProcessTextProps {
  isLoaded: boolean;
  text: string;
  color?: string;
  size:number
}

export const ProcessText: React.FC<IProcessTextProps> = ({
  isLoaded,
  text,
  color,
  size
}) => {
  return (
    <div className={`mt-3 mt-sm-4 fs-${size} text-dark-light`} style={{ fontWeight: "400" }}>
      {!isLoaded ? (
        text.split("\n").map((item: string, idx: number) => (
          <p key={idx} style={{ textIndent: "30px", lineHeight:'1.4rem'}}>
            {item}
          </p>
        ))
      ) : (
        <Skeleton count={5} baseColor={color}/>
      )}
    </div>
  );
};
