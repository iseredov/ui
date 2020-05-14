import { SyntheticEvent } from 'react';

export const stopBubbling = (e: SyntheticEvent<any>) => {
  if (e && typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
};

export const getClassnameModifiers = (
  rootClass: string,
  mods: string[] | { [key: string]: any } = {}
) => {
  if (Array.isArray(mods)) {
    return mods.reduce(
      (prev, current) => prev.concat([`${rootClass}_${current}`]),
      [rootClass]
    );
  }

  if (typeof mods === 'object') {
    return Object.keys(mods).reduce(
      (prev, current) =>
        mods[current]
          ? {
              ...prev,
              [`${rootClass}_${current}`]: mods[current],
            }
          : prev,
      { [rootClass]: true }
    );
  }
  return rootClass;
};

export const getGroupPosition = (index: number, length: number) => {
  if (length <= 1) {
    return undefined;
  }

  if (index === 0) {
    return 'start';
  }

  if (index === length - 1) {
    return 'end';
  }

  return 'center';
};
