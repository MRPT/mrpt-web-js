import {join} from 'path'

const include = join(__dirname, 'src')

export default {
    entry: './src/MRPTLib',
    output: {
        path: join(__dirname, './build'),
        libraryTarget: 'umd',
        library: 'MRPTlib'
    },
    devtool: 'source-map',
    module: {
        // loaders: [
        //     {test: /\.js$/,loader: 'babel-loader',include},
        //     {test: /\.json$/,loader: 'json', include},
        // ]
    }
}
