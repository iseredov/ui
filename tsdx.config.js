const postcss = require('rollup-plugin-postcss');
module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                // only write out CSS for the first bundle (avoids pointless extra files):
                extract: 'dist/index.css',
                minimize: true,
            })
        );
        return config;
    },
};