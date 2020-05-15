import { useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children: ReactNode;
}

export const Portal = ({ children }: IProps) => {
  const [container] = useState(document.createElement('div'));

  useEffect(() => {
    if (document.body) {
      document.body.appendChild(container);
    }

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
};
