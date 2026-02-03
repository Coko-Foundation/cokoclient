import merge from 'lodash/merge'

import root from './root'

export default {
  typeDefs: [root.typeDefs].join(' '),
  resolvers: merge({}, root.resolvers),
}
