import React, {
  useCallback,
  useEffect,
  useRef,
  memo,
  ReactNode,
  SyntheticEvent,
} from 'react';
import { PopperProps, usePopper } from 'react-popper';

import { Portal } from '../Portal';

import s from './Tooltip.module.scss';
import { stopBubbling } from '../shared/helpers';

interface TTriggerProps {
  ref: React.Dispatch<React.SetStateAction<null>>;
  onMouseEnter?: (e: SyntheticEvent<HTMLElement>) => void;
  onMouseLeave?: (e: SyntheticEvent<HTMLElement>) => void;
}

type TRenderProps = (props: TTriggerProps) => ReactNode;

export interface ITooltipProps {
  /** Содержимое подсказки */
  content?: ReactNode;
  /** Положение подсказки */
  placement?: PopperProps<any>['placement'];
  /** Задержка перед показом */
  delayShow?: number;
  /** Задержка перед скрытием */
  delayHide?: number;
  /** Элемент для которого будет вызываться подсказка */
  children: TRenderProps | ReactNode;
}

/** Компонент всплывающей подсказки*/
export const Tooltip = ({
  children,
  content = null,
  placement = 'right',
  delayShow = 100,
  delayHide = 100,
}: ITooltipProps) => {
  const hideTimeoutRef = useRef<any>(null);
  const showTimeoutRef = useRef<any>(null);

  const clearScheduled = useCallback(() => {
    clearTimeout(hideTimeoutRef.current as any);
    clearTimeout(showTimeoutRef.current as any);
  }, []);

  useEffect(() => clearScheduled, [clearScheduled]);

  const [isVisible, setIsVisible] = React.useState(false);

  // popper boilerplate
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState<any>(null);
  const [arrowElement, setArrowElement] = React.useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement,
  });

  const handleMouseEnter = useCallback(() => {
    clearTimeout(showTimeoutRef.current);
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayShow);
  }, [delayShow]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, delayHide);
  }, [delayHide]);

  const triggerProps: TTriggerProps = {
    ref: setReferenceElement,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const isVisiblePrepared = content ? isVisible : false;

  const trigger =
    typeof children === 'function' ? (
      // @ts-ignore
      children(triggerProps)
    ) : (
      // @ts-ignore
      <children.type {...children.props} {...triggerProps} />
    );
  return (
    <>
      {trigger}

      {isVisiblePrepared && (
        <Portal>
          <div
            {...attributes.popper}
            className={s.tooltipBody}
            ref={setPopperElement}
            style={styles.popper}
            onClick={stopBubbling}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={clearScheduled}
          >
            {content}
            <div
              className={s.tooltipArrow}
              ref={setArrowElement}
              style={styles.arrow}
            />
          </div>
        </Portal>
      )}
    </>
  );
};

export const TooltipMemo = memo(Tooltip);
