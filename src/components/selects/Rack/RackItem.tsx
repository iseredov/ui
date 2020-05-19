import React, { useCallback, memo } from 'react';

import { IBaseOption } from '../Options/types';
import { IRackItemProps } from './types';

interface IProps<Option> {
  value: Option;
  index: number;
  isReadOnly: boolean;
  onEdit: (option: Option) => void;
  onDelete: (option: Option) => void;
  onGetUp: (index: number) => void;
  onGetDown: (index: number) => void;
  Item: (props: IRackItemProps<Option>) => JSX.Element;
}

const NoMemoRackItem = <Option extends IBaseOption>({
  value,
  index,
  isReadOnly,
  Item,
  onEdit,
  onDelete,
  onGetUp,
  onGetDown,
}: IProps<Option>) => {
  const handleDeleteOption = useCallback(() => {
    onDelete(value);
  }, [value, onDelete]);

  const handleEditOption = useCallback(() => {
    onEdit(value);
  }, [value, onEdit]);

  const handleGetUpOption = useCallback(() => {
    onGetUp(index);
  }, [index, onGetUp]);

  const handleGetDownOption = useCallback(() => {
    onGetDown(index);
  }, [index, onGetDown]);

  return (
    <Item
      value={value}
      index={index}
      isReadOnly={isReadOnly}
      onDelete={handleDeleteOption}
      onEdit={handleEditOption}
      onGetUp={handleGetUpOption}
      onGetDown={handleGetDownOption}
    />
  );
};

export const RackItem = memo(NoMemoRackItem) as typeof NoMemoRackItem;
