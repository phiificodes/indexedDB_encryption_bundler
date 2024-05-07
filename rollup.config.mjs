import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
    input: 'src/main.js',
    output: {
        file: 'build/bundle.js',
        format: 'cjs'
    },
    plugins: [
        nodePolyfills(crypto)]
}