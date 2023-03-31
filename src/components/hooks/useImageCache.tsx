import { useState, useEffect } from "react";

const CACHE_NAME = "hero-images-cache";

export const useImageCache = (image: string, isLoaded: boolean) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    async function fetchImageAndCache() {
      const cache = await caches.open(CACHE_NAME);
      const request = new Request(image);

      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        const blob = await cachedResponse.blob();
        setImageUrl(URL.createObjectURL(blob));
      } else {
        const response = await fetch(request);
        const clonedResponse = response.clone();
        const blob = await response.blob();

        cache.put(request, clonedResponse);
        setImageUrl(URL.createObjectURL(blob));
      }
    }

    fetchImageAndCache();
  }, [image, isLoaded]);

  return imageUrl;
};
