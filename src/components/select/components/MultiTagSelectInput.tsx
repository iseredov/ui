import React, { memo, useMemo } from 'react';

import { MultiTagInput, IMultiTagInputProps } from './MultiTagInput';
import { Tag } from './Tag';

import s from './MultiTagInput.module.scss';

const NoMemoMultiTagSelectInput = ({
  selectedTags,
  tagHoverIndex,
  onDeleteTag,
  ...props
}: IMultiTagInputProps) => {
  const sortedTags = useMemo(() => {
    const sortedTags = [...selectedTags];
    sortedTags.sort((a, b) => a.name.length - b.name.length);
    return sortedTags;
  }, [selectedTags]);

  return (
    <div className={s.selectInputWrapper}>
      {sortedTags.map(({ id, name }, index) => (
        <Tag
          key={String(id)}
          id={id}
          name={name}
          isHovered={tagHoverIndex === index}
          onDeleteTag={onDeleteTag}
        />
      ))}
      <MultiTagInput
        {...props}
        selectedTags={sortedTags}
        tagHoverIndex={tagHoverIndex}
        onDeleteTag={onDeleteTag}
      />
    </div>
  );
};

export const MultiTagSelectInput = memo(
  NoMemoMultiTagSelectInput
) as typeof NoMemoMultiTagSelectInput;
