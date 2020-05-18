import React, {
  memo,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent,
} from 'react';

import { KEY_CODE } from '../../../shared/constants';
import { SelectPlaceholder } from '../BaseSelect/SelectElements';
import { ITag } from './Tag';

import s from './MultiTagInput.module.scss';

const NOT_SELECTED_HOVER_INDEX = -1;

export interface IMultiTagInputProps {
  isOpen: boolean;
  inputValue: string;
  placeholder: string;
  selectedTags: ITag[];
  tagHoverIndex: number;
  onChangeInputValue: (value: string) => void;
  setHoverIndexTag: (index: number) => void;
  onDeleteTag: (id: IdType) => void;
}

const NoMemoMultiTagInput = ({
  selectedTags,
  isOpen,
  placeholder,
  tagHoverIndex,
  inputValue,
  onChangeInputValue,
  onDeleteTag,
  setHoverIndexTag,
}: IMultiTagInputProps) => {
  const selectedTagsLength = selectedTags.length;
  const lastIndexSelectedTags = selectedTagsLength - 1;

  const deleteSelectedTagByIndex = useCallback(
    (index: number) => {
      const { id } = selectedTags[index];
      onDeleteTag(id);
    },
    [selectedTags, onDeleteTag]
  );

  const deleteSelectedTag = useCallback(() => {
    if (selectedTagsLength === 0) {
      return;
    }

    deleteSelectedTagByIndex(
      tagHoverIndex === NOT_SELECTED_HOVER_INDEX ||
        tagHoverIndex > lastIndexSelectedTags
        ? lastIndexSelectedTags
        : tagHoverIndex
    );
  }, [
    tagHoverIndex,
    selectedTagsLength,
    lastIndexSelectedTags,
    deleteSelectedTagByIndex,
  ]);

  const setPrevTagHoverIndex = useCallback(() => {
    if (tagHoverIndex !== 0) {
      setHoverIndexTag(
        tagHoverIndex === NOT_SELECTED_HOVER_INDEX
          ? lastIndexSelectedTags
          : tagHoverIndex - 1
      );
    }
  }, [tagHoverIndex, lastIndexSelectedTags, setHoverIndexTag]);

  const setNextTagHoverIndex = useCallback(() => {
    setHoverIndexTag(
      tagHoverIndex === lastIndexSelectedTags
        ? NOT_SELECTED_HOVER_INDEX
        : tagHoverIndex + 1
    );
  }, [tagHoverIndex, lastIndexSelectedTags, setHoverIndexTag]);

  const handleInputKeyDown = useCallback(
    ({ keyCode }: KeyboardEvent<HTMLInputElement>) => {
      if (inputValue) {
        return;
      }

      switch (keyCode) {
        case KEY_CODE.BACKSPACE:
          deleteSelectedTag();
          break;
        case KEY_CODE.ARROW_LEFT:
          setPrevTagHoverIndex();
          break;
        case KEY_CODE.ARROW_RIGHT:
          setNextTagHoverIndex();
          break;
        default:
          break;
      }
    },
    [inputValue, deleteSelectedTag, setPrevTagHoverIndex, setNextTagHoverIndex]
  );

  const handleChangeValue = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      onChangeInputValue(target.value);
    },
    [onChangeInputValue]
  );

  const handleInputClick = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
    },
    []
  );

  const hasSelectedTags = selectedTagsLength !== 0;

  if (isOpen) {
    return (
      <input
        autoFocus
        placeholder={!hasSelectedTags ? placeholder : ''}
        className={s.selectInput}
        value={inputValue}
        onKeyDown={handleInputKeyDown}
        onChange={handleChangeValue}
        onClick={handleInputClick}
      />
    );
  }

  return !hasSelectedTags ? (
    <SelectPlaceholder>{placeholder}</SelectPlaceholder>
  ) : null;
};

export const MultiTagInput = memo<IMultiTagInputProps>(NoMemoMultiTagInput);
