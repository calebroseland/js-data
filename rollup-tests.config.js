import babel from 'rollup-plugin-babel'

export default {
  entry: 'test/index.js',
  dest: 'dist/js-data-tests.js',
  sourceMap: 'dist/js-data-tests.js.map',
  format: 'umd',
  moduleName: 'JSDataTests',
  external: 'chai:chai',
  plugins: [
    babel()
  ]
}