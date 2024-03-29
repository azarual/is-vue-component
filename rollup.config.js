const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const changeCase = require('change-case');
const createBanner = require('create-banner');
const pkg = require('./package');

const name = changeCase.camelCase(pkg.name);

module.exports = {
  input: 'src/index.js',
  output: [
    {
      name,
      banner: createBanner({
        case: 'camelCase',
        data: {
          year: '2018-present',
        },
      }),
      file: `dist/${pkg.name}.js`,
      format: 'umd',
    },
    {
      name,
      banner: createBanner({
        case: 'camelCase',
        data: {
          year: '2018-present',
        },
        template: 'inline',
      }),
      file: `dist/${pkg.name}.min.js`,
      format: 'umd',
    },
    {
      file: `dist/${pkg.name}.common.js`,
      format: 'cjs',
    },
    {
      file: `dist/${pkg.name}.esm.js`,
      format: 'esm',
    },
  ],
  plugins: [
    nodeResolve(),
    babel(),
  ],
};
