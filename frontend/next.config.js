const withPlugins = require(`next-compose-plugins`)
const nextTranslate = require(`next-translate`)

const withBundleAnalyzer = require(`@next/bundle-analyzer`)({
  enabled: process.env.ANALYZE === `true`,
})

module.exports = nextTranslate(withPlugins([[withBundleAnalyzer]]))
