import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

interface IParams {
  resizeDebounceTime?: number;
  needRecalculate?: boolean;
}

export const useElementWidth = ({
  resizeDebounceTime = 300,
  needRecalculate = false,
}: IParams) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (
      ref.current &&
      ref.current.offsetWidth &&
      (ref.current.offsetWidth !== width || needRecalculate)
    ) {
      setWidth(ref.current.offsetWidth);
    }
  }, [width, ref, needRecalculate]);

  useEffect(() => {
    const debounceResize = debounce(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }, resizeDebounceTime);

    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, [ref, resizeDebounceTime]);

  return { width, ref };
};
