import { useWindowSize } from './useWindowSize';
import { MOBILE_WIDTH_PX } from './constants';

export const useIsMobileSize = () => {
  const { width } = useWindowSize();

  return Number(width) <= MOBILE_WIDTH_PX;
};
