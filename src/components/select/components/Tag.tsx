import React, { useCallback, SyntheticEvent } from 'react';
import cn from 'classnames/bind';

import { IconClear } from '../../icons/IconClear';
import { ITag } from '../MultiTagSelect/BaseMultiTagSelect';
import s from './Tag.module.scss';

const cx = cn.bind(s);

interface IProps extends ITag {
  isHovered: boolean;
  onDeleteTag: (id: IdType) => void;
}

export const Tag = ({ id, name, onDeleteTag, isHovered }: IProps) => {
  const handleDeleteTag = useCallback(
    (e: SyntheticEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      onDeleteTag(id);
    },
    [id, onDeleteTag]
  );

  return (
    <div className={cx('tag')}>
      <p className={cx('tag-text')}>{name}</p>
      <span
        className={cx('tag-icon', { 'tag-icon_hover': isHovered })}
        onClick={handleDeleteTag}
      >
        <IconClear className={cx('tag-clear')} />
      </span>
    </div>
  );
};
