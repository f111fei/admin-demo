export default {
    entry: "src/index.ts",
    theme: "./theme.config.js",
    proxy: {
        // '/api/v1/user': {
        //     target: 'http://dh.mr4iot.com:5000/',
        //     changeOrigin: true,
        //     pathRewrite: { "^/api/v1/user": "" }
        // }
    },
    env: {
        development: {
            extraBabelPlugins: [
                "dva-hmr",
                "transform-runtime",
                [
                    "import", {
                        "libraryName": "antd",
                        "style": true
                    }
                ]
            ]
        },
        production: {
            extraBabelPlugins: [
                "transform-runtime",
                [
                    "import", {
                        "libraryName": "antd",
                        "style": true
                    }
                ]
            ]
        }
    },
    dllPlugin: {
        "exclude": ["babel-runtime", "roadhog"],
        "include": ["dva/router", "dva/saga", "dva/fetch"]
    }
}
