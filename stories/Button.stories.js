import { __assign } from "tslib";
import React from 'react';
import { Button } from '../src/Button/Button';
export default {
    title: 'Button',
};
// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export var Default = function (props) { return React.createElement(Button, __assign({}, props)); };
//# sourceMappingURL=Button.stories.js.map