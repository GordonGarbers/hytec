import { useState, useEffect } from "react";

export const useImagePlaceholder = (width: number, height: number) => {
  const [imgPlaceholder, setImgPlaceholder] = useState<string>("");

  useEffect(() => {
    function gcd(a: number, b: number): any {
      if (b === 0) return a;
      return gcd(b, a % b);
    }

    const greaterCommonDivisor = gcd(width, height);
    const ratioW = width / greaterCommonDivisor;
    const ratioH = height / greaterCommonDivisor;

    setImgPlaceholder(
      `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ratioW} ${ratioH}"%3E%3C/svg%3E`
    );
  }, [width, height]);

  return imgPlaceholder;
};
