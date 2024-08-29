const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfig = require('../webpack/webpack.config')

const compiler = Webpack(webpackConfig)
const devServerOptions = { ...webpackConfig.devServer, open: true }
const server = new WebpackDevServer(devServerOptions, compiler)

const runServer = async () => {
  await server.start()
}

runServer()
