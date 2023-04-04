
// import { useEffect, useState } from "react";

// const CACHE_NAME = "gallery-images-cache";

// export const useImageCacheBetter = (imageUrl: string) => {
//   const [cachedImageUrl, setCachedImageUrl] = useState<string>("");

//   useEffect(() => {
//     async function fetchImageAndCache() {
//       const cache = await caches.open(CACHE_NAME);
//       const request = new Request(imageUrl);

//       const cachedResponse = await cache.match(request);

//       if (cachedResponse) {
//         const blob = await cachedResponse.blob();
//         setCachedImageUrl(URL.createObjectURL(blob));
//       } else {
//         const response = await fetch(request);
//         const clonedResponse = response.clone();
//         const blob = await response.blob();
//         cache.put(request, clonedResponse);
//         setCachedImageUrl(URL.createObjectURL(blob));
//       }
//     }
//     fetchImageAndCache();
//   }, [imageUrl]);

//   return cachedImageUrl;
// };






const CACHE_NAME = "gallery-images-cache";

export const imageCacheBetter = (imageUrl: string) => {


    const fetchImageAndCache = async() => {
      const cache = await caches.open(CACHE_NAME);
      const request = new Request(imageUrl);

      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        const blob = await cachedResponse.blob();
        return URL.createObjectURL(blob);
      } else {
        const response = await fetch(request);
        const clonedResponse = response.clone();
        const blob = await response.blob();
        cache.put(request, clonedResponse);
        return URL.createObjectURL(blob);
      }
    }
    return fetchImageAndCache();
};
