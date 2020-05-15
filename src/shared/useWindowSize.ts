import { useState, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';

const getSize = (isClient = true) => ({
  width: isClient ? window.innerWidth : undefined,
  height: isClient ? window.innerHeight : undefined,
});

export const useWindowSize = (debounceTime = 200) => {
  const isClient = typeof window === 'object';
  const [windowSize, setWindowSize] = useState(getSize(isClient));

  const handleResize = useCallback(() => {
    setWindowSize(getSize(isClient));
  }, [isClient]);

  const debouncedResize = useMemo(() => debounce(handleResize, debounceTime), [
    debounceTime,
    handleResize,
  ]);

  useEffect(() => {
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [debouncedResize]);

  return windowSize;
};
