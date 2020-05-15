import React, { SyntheticEvent, ReactElement, useMemo } from 'react';
import classNames from 'classnames/bind';

import s from './IconBase.module.scss';

const cx = classNames.bind(s);

const DIMENSION_BY_SIZE = {
  xs: 16,
  sm: 20,
  nm: 24,
  lg: 32,
  xl: 48,
};

export interface IIconProps {
  /** Кастомный класс */
  className?: string;
  /** Размер иконки */
  size?: 'xs' | 'sm' | 'nm' | 'lg' | 'xl';
  /** Размер контейнера иконки (по умолчанию равер размеру иконке) */
  containerSize?: 'xs' | 'sm' | 'nm' | 'lg' | 'xl';
  /** Поворот иконки */
  rotate?: 0 | 90 | 180 | 270 | 360;
  /** Хендлер на клик */
  onClick?: (event: SyntheticEvent) => void;
}

export interface IIconBaseProps extends IIconProps {
  children: ReactElement;
}

export const IconBase = ({
  className,
  size = 'nm',
  containerSize,
  onClick,
  rotate = 0,
  children: icon,
}: IIconBaseProps) => {
  const iconStyle = useMemo(
    () => ({
      width: DIMENSION_BY_SIZE[size],
      height: DIMENSION_BY_SIZE[size],
    }),
    [size]
  );
  const containerStyle = useMemo(
    () => ({
      width: DIMENSION_BY_SIZE[containerSize || size],
      height: DIMENSION_BY_SIZE[containerSize || size],
    }),
    [containerSize, size]
  );

  return (
    <div className={cx(className, 'icon')} style={containerStyle}>
      <icon.type
        key={icon.key}
        {...icon.props}
        style={iconStyle}
        className={cx(icon.props?.className, 'image', `image_rotate_${rotate}`)}
        onClick={onClick}
      />
    </div>
  );
};
