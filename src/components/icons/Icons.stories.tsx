import React, { ElementType } from 'react';
import { action } from '@storybook/addon-actions';
import { select, withKnobs } from '@storybook/addon-knobs';
import { IIconProps } from '../IconBase';
import { IconClear as Clear } from './IconClear';
import { IconSpinner as Spinner } from './IconSpinner';
import { IconArrow as Arrow } from './IconArrow';
import { IconPin as Pin } from './IconPin';
import { IconSearch as Search } from './IconSearch';
import { IconError as Error } from './IconError';
import { IconDone as Done } from './IconDone';

export default {
  title: 'Cargomart/Icons',
  decorators: [withKnobs],
};

const sizes: IIconProps['size'][] = ['xs', 'sm', 'nm', 'lg', 'xl'];

const Render = (Component: ElementType<IIconProps>) =>
  sizes.map((size, index) => (
    <Component
      key={index}
      size={size}
      containerSize={select(
        'containerSize',
        ['xs', 'sm', 'nm', 'lg', 'xl'],
        'xl'
      )}
      rotate={select('rotate', [0, 90, 180, 270, 360], 0)}
    />
  ));

export const Default = () => <Clear onClick={action('onClick')} />;
export const IconClear = () => Render(Clear);
export const IconSpinner = () => Render(Spinner);
export const IconArrow = () => Render(Arrow);
export const IconPin = () => Render(Pin);
export const IconSearch = () => Render(Search);
export const IconError = () => Render(Error);
export const IconDone = () => Render(Done);
