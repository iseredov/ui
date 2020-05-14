import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Button } from './Button';
import { GroupElements } from '../GroupElements';

export default {
  title: 'Button',
  decorators: [withKnobs],
  parameters: {
    component: Button,
  },
};

export const Default = () => (
  <>
    <Button appearance="primary">Button</Button>
    <Button appearance="secondary">Button</Button>
    <Button appearance="transparent">Button</Button>
    <Button appearance="danger">Button</Button>
    <Button appearance="success">Button</Button>
    <Button appearance="info">Button</Button>
  </>
);

export const WithKnobs = () => (
  <Button
    appearance={select(
      'appearance',
      ['primary', 'secondary', 'info', 'success', 'transparent', 'danger'],
      'primary'
    )}
    prefix={<div>pre</div>}
    postfix={<div>post</div>}
  >
    Button
  </Button>
);

export const GroupButtons = () => (
  <GroupElements type="vertical">
    <GroupElements>
      <Button appearance="secondary">Button</Button>
      <Button appearance="secondary">Button</Button>
      <Button appearance="secondary">Button</Button>
    </GroupElements>
    <GroupElements>
      <Button appearance="secondary">Button</Button>
      <Button appearance="secondary">Button</Button>
      <Button appearance="secondary">Button</Button>
    </GroupElements>
    <GroupElements>
      <Button appearance="secondary">Button</Button>
      <Button appearance="secondary">Button</Button>
      <Button appearance="secondary">Button</Button>
    </GroupElements>
  </GroupElements>
);
