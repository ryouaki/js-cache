import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
const conf = require('./package.json');

const env = process.env.NODE_ENV
const config = {
  input: 'index.js',
  plugins: []
}

if (env === 'es' || env === 'cjs') {
  config.output = { format: env, indent: false }
  config.external = ['symbol-observable']
  config.plugins.push(
    babel()
  )
}

if (env === 'development' || env === 'production') {
  config.output = { format: 'umd', name: 'JSCache', indent: false }
  config.plugins.push(
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env._VERSION': JSON.stringify(conf.version),
      'process.env.ENDPOINT': JSON.stringify('https://'+process.env.ENDPOINT)
    })
  )
}

if (env === 'production') {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
