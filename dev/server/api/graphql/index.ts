import root from './root'
import { merge } from './utils'

export default {
  typeDefs: [root.typeDefs].join(' '),
  resolvers: merge({}, root.resolvers),
}
