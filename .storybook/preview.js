import { addParameters } from '@storybook/react';
import { DocsPage } from 'storybook-addon-deps/blocks';
import './styles.css';

addParameters({
  options: {
    showRoots: true,
  },
  viewMode: 'docs',
  docs: { page: DocsPage, inlineStories: true },
  dependencies: {
    //display only dependencies/dependents that have a story in storybook
    //by default this is false
    withStoriesOnly: true,

    //completely hide a dependency/dependents block if it has no elements
    //by default this is false
    hideEmpty: true,
  },
  backgrounds: [
    { name: 'Основной фон', value: '#f0f3f7' },
    { name: 'Белый', value: '#ffffff', default: true },
    { name: 'Синий', value: '#0058ac' },
    { name: 'Черный', value: '#000000' },
  ],
});
