module.exports = {
    entry: './src/components/HomePage/HomePage.jsx',
    output: {
        filename: './src/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }
};
