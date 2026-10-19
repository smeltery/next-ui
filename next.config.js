const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

module.exports = (phase) => ({
  // Biome runs in the shared check command before every CI build.
  eslint: { ignoreDuringBuilds: true },
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next"
})
