const isMicrosoftBrowser = (userAgent: any) => {
  const userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

  return new RegExp(userAgentPatterns.join('|')).test(userAgent);
};

const ROUNDING_TOLERANCE = isMicrosoftBrowser(window.navigator.userAgent)
  ? 1
  : 0;

// @ts-ignore
const hasScrollableSpace = (element: any, axis: any) => {
  if (axis === 'Y') {
    return element.clientHeight + ROUNDING_TOLERANCE < element.scrollHeight;
  }

  if (axis === 'X') {
    return element.clientWidth + ROUNDING_TOLERANCE < element.scrollWidth;
  }
};

const canOverflow = (element: any, axis: any) => {
  const overflowValue = (window.getComputedStyle(element, null) as any)[
    'overflow' + axis
  ];

  return overflowValue === 'auto' || overflowValue === 'scroll';
};

const isScrollable = (element: any) => {
  const isScrollableY =
    hasScrollableSpace(element, 'Y') && canOverflow(element, 'Y');
  const isScrollableX =
    hasScrollableSpace(element, 'X') && canOverflow(element, 'X');

  return isScrollableY || isScrollableX;
};

const findScrollableParent = (element: any) => {
  let node = element;

  while (node !== document.body && isScrollable(node) === false) {
    node = node.parentNode || node.host;
  }

  return node;
};

/**
 * Функция для скролла ближайшего родителя до переданного элемента
 * Отличие от нативного element.scrollIntoView() или библиотечного "scroll-into-view"
 * В том, что данная функция скролит только ближайшего родителя, в отличие от нативного
 * И библиотечного, которые скролят все элементы с overflow выше по дереву
 */
export const scrollTopIntoView = function(elem: any, alignToTop = true) {
  if (!elem) {
    return;
  }

  const scrollableParent = findScrollableParent(elem);
  const parentRects = scrollableParent.getBoundingClientRect();
  const clientRects = elem.getBoundingClientRect();

  const isElementVisible =
    Math.round(clientRects.top) >= Math.round(parentRects.top) &&
    Math.round(clientRects.bottom) <= Math.round(parentRects.bottom);

  if (isElementVisible) {
    return;
  }

  const yScroll =
    +(alignToTop
      ? scrollableParent.scrollTop +
        clientRects.top -
        parentRects.top +
        parentRects.height
      : scrollableParent.scrollTop + clientRects.bottom - parentRects.bottom) +
    parentRects.height;

  scrollableParent.scrollTo(0, yScroll);
};
