import React from 'react';
import {Button, Props } from '../src/Button/Button';

export default {
  title: 'Button',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<Props>) => <Button {...props} />;
