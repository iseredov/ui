import React, { memo } from 'react';
import cn from 'classnames/bind';

import style from './Footer.module.scss';

const cx = cn.bind(style);

interface IProps {
  optionsLength: number;
  total: number;
  loadingMessage?: string;
  noOptionsMessage: string;
  isLoading: boolean;
  isMobile: boolean;
  hasInfinityScroll: boolean;
}

const BaseFooter = ({
  optionsLength,
  total,
  loadingMessage = 'Загружаем...',
  noOptionsMessage,
  isLoading,
  isMobile,
  hasInfinityScroll,
}: IProps) => {
  const className = cx('statusText', { statusText_mobile: isMobile });

  if (isMobile && !isLoading && optionsLength === 0) {
    return (
      <p
        className={cn(className, cx({ statusText_mobileNoOptions: isMobile }))}
      >
        {noOptionsMessage}
      </p>
    );
  }

  if (isLoading) {
    return <p className={className}>{loadingMessage}</p>;
  }

  if (hasInfinityScroll) {
    return (
      <p className={cx(className)}>
        Загружено {optionsLength} из {total}
      </p>
    );
  }

  return (
    <p className={cx(className)}>
      Загружено {optionsLength} из {total}.
      <br />
      Уточните запрос, чтобы увидеть остальные.
    </p>
  );
};

export const Footer = memo(BaseFooter) as typeof BaseFooter;
