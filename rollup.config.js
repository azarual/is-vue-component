const babel = require('rollup-plugin-babel');
const pkg = require('./package');

const now = new Date();
const banner = `/*!
 * isVueComponent v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2018-present ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

module.exports = {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'dist/is-vue-component.js',
      format: 'umd',
      name: 'isVueComponent',
    },
    {
      banner,
      file: 'dist/is-vue-component.common.js',
      format: 'cjs',
    },
    {
      banner,
      file: 'dist/is-vue-component.esm.js',
      format: 'es',
    },
  ],
  plugins: [
    babel(),
  ],
};
