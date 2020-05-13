const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        minimize: true,
        autoModules: true,
        config: {
          path: __dirname + '/postcss.config.js',
        },
      })
    );
    return config;
  },
};
