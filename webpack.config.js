const path = require('path');

const include = path.join(__dirname, 'src')

module.exports = {
    mode: "development",
    entry: "./dist/MRPTLib",
    output: {
        path: path.resolve(__dirname, './build'),
        library: 'MRPTlib'
    },
    devtool: 'eval'
}
