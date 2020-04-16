import { FC, HTMLAttributes, ReactChild } from 'react';
export interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: ReactChild;
}
export declare const Button: FC<Props>;
