import fs from 'node:fs'
import path from 'node:path'

import rootResolvers from './root.resolvers'

export default {
  typeDefs: fs.readFileSync(path.join(__dirname, 'root.graphql'), 'utf-8'),
  resolvers: rootResolvers,
}
