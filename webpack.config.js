const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (webpackConfig, env) => {
    const production = env === 'production';
    // FilenameHash
    webpackConfig.output.chunkFilename = '[name].[chunkhash].js';

    if (production) {
        if (webpackConfig.module) {
            // ClassnameHash
            webpackConfig.module.rules.map((item) => {
                if (String(item.test) === '/\\.less$/' || String(item.test) === '/\\.css/') {
                    item.use.filter(iitem => iitem.loader === 'css')[0].options.localIdentName = '[hash:base64:5]';
                }
                return item;
            })
        }
        webpackConfig.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            })
        );
    }

    webpackConfig.plugins = webpackConfig.plugins.concat([
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/index.ejs`,
            filename: 'index.html',
            minify: production ? {
                collapseWhitespace: true,
            } : null,
            hash: true,
            headScripts: production ? null : ['/roadhog.dll.js'],
            dev: !production
        }),
    ]);

    // Alias
    webpackConfig.resolve.alias = {
        themes: `${__dirname}/src/themes`,
        interfaces: `${__dirname}/src/interfaces`,
        services: `${__dirname}/src/services`,
        constants: `${__dirname}/src/constants`,
        components: `${__dirname}/src/components`,
        routes: `${__dirname}/src/routes`,
        utils: `${__dirname}/src/utils`,
    };
    return webpackConfig;
}
