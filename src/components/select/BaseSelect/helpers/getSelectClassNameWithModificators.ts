import { POSITION, SIZE } from '../types';

interface TClassNameConfig {
  position?: POSITION;
  size?: SIZE;
  hasError?: boolean;
  isFocused?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  prefix?: boolean;
  postfix?: boolean;
}

export const getSelectClassNameWithModificators = ({
  position = POSITION.TopLeft,
  size = SIZE.SM,
  hasError = false,
  isFocused = false,
  isReadOnly = false,
  isDisabled = false,
  prefix = false,
  postfix = false,
}: TClassNameConfig) => {
  return {
    innerWrapper: true,
    [`innerWrapper_size_${size}`]: true,
    [`innerWrapper_radius_${position}`]: true,
    innerWrapper_focused: isFocused,
    innerWrapper_error: hasError,
    innerWrapper_focused_error: hasError && isFocused,
    innerWrapper_readOnly: isReadOnly,
    innerWrapper_disabled: isDisabled,
    innerWrapper_prefix: prefix,
    innerWrapper_postfix: postfix,
  };
};
