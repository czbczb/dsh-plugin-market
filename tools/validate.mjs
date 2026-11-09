// Validate index.json against the official format-1 rule set.
// Usage: npm run validate            (uses the default index URL below)
//        node tools/validate.mjs <published-index-url>
import { readFileSync } from 'node:fs'
import { parseMarketIndex } from '@deepseek-ai/dsh-plugin-market-index'

const indexUrl = process.argv[2]
  ?? 'https://raw.githubusercontent.com/czbczb/dsh-plugin-market/main/index.json'

const document = JSON.parse(readFileSync(new URL('../index.json', import.meta.url), 'utf8'))

try {
  const index = parseMarketIndex(document, indexUrl)
  console.log(`OK: format ${index.format}, ${index.plugins.length} plugin(s)`)
  for (const plugin of index.plugins) {
    const versions = plugin.versions.map((v) => v.version).join(', ')
    console.log(`- ${plugin.name}: ${versions}`)
  }
} catch (error) {
  if (error?.name === 'MarketIndexError') {
    console.error(`INVALID: ${error.path} ${error.reason}`)
    process.exit(1)
  }
  throw error
}
