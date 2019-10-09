const path = require('path')
const typescript = require('rollup-plugin-typescript2')
const { uglify } = require('rollup-plugin-uglify')
const { terser } = require('rollup-plugin-terser')
const pkg = require('../package.json')

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
  cjs: {
    input: resolve('src/index.ts'),
    file: pkg.main,
    format: 'cjs',
    env: 'production'
  },
  es: {
    input: resolve('src/index.ts'),
    file: pkg.module,
    format: 'es',
    env: 'production'
  },
}

function genConfig (opts) {
  const config = {
    input: {
      input: opts.input,
      plugins: [
        typescript(),
      ],
    },
    output: {
      file: opts.file,
      format: opts.format,
      exports: 'named',
    }
  }

  if ( opts.env === 'production' && opts.format === 'cjs' ) {
    config.input.plugins.push(
      uglify()
    )
  }

  if ( opts.env === 'production' && opts.format === 'es' ) {
    config.input.plugins.push(
      terser()
    )
  }

  return config
}

function mapValues (obj, fn) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })
  return res
}

module.exports = mapValues(configs, genConfig)