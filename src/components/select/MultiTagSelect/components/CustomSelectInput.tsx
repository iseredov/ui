import React, { memo, useMemo } from 'react';

import { CustomInput, ICustomInputProps } from './CustomInput';
import { Tag } from './Tag';

import s from './CustomInput.module.scss';

const BaseCustomSelectInput = ({
  selectedTags,
  tagHoverIndex,
  onDeleteTag,
  ...props
}: ICustomInputProps) => {
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
      <CustomInput
        {...props}
        selectedTags={sortedTags}
        tagHoverIndex={tagHoverIndex}
        onDeleteTag={onDeleteTag}
      />
    </div>
  );
};

export const CustomSelectInput = memo(
  BaseCustomSelectInput
) as typeof BaseCustomSelectInput;
