import fs from 'node:fs'

import rootResolvers from './root.resolvers'

const typeDefsPath = new URL('./root.graphql', import.meta.url)

export default {
  typeDefs: fs.readFileSync(typeDefsPath, 'utf-8'),
  resolvers: rootResolvers,
}
