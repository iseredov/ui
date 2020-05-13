import { SyntheticEvent } from 'react';

export const stopBubbling = (e: SyntheticEvent<any>) => {
  if (e && typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
};
