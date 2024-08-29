const components = require('./components')
const seedAdmin = require('../scripts/seedAdminUser')

module.exports = {
  components,
  integrations: {
    lulu: {
      redirectUri:
        'http://localhost:4000/provider-connection-popup/lulu?next=/',
      tokenUrl:
        'https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token',
      clientId: 'ketida-editor',
    },
  },
  onStartup: [
    {
      label: 'Seed admin',
      execute: seedAdmin,
    },
  ],
  secret: 'test',
  teams: {
    global: [
      {
        displayName: 'Editor',
        role: 'editor',
      },
      {
        displayName: 'Reviewer',
        role: 'reviewer',
      },
      {
        displayName: 'Admin',
        role: 'admin',
      },
    ],
    nonGlobal: [],
  },
  useGraphQLServer: true,
}
