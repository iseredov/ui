import { SyntheticEvent } from 'react';

const THRESHOLD_HEIGHT = 30;

// TODO: занести внутрь AsyncSelect
export const isScrolledToBottom = (event: SyntheticEvent<HTMLDivElement>) => {
  const { target } = event;
  const { scrollHeight, scrollTop, offsetHeight } = target as any;
  return scrollHeight - scrollTop - offsetHeight < THRESHOLD_HEIGHT;
};
