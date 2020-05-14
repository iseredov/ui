const path = require('path');

const postCssLoaderConfig = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss',
    sourceMap: true,
  },
};

module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx|mdx)'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-backgrounds/register',
  ],
  webpackFinal: async config => {
    // config.module.rules = config.module.rules.filter(
    //   i => String(i.test) !== String(/\.css$/)
    // );

    config.module.rules.push({
      test: /\.module\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
        postCssLoaderConfig,
      ],
    });

    return config;
  },
};
