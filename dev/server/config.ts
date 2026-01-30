const config = {
  components: [
    '@coko/server/dist/models/user',
    '@coko/server/dist/models/identity',
    '@coko/server/dist/models/team',
    '@coko/server/dist/models/teamMember',
    './api/graphql',
  ],
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
    ],
    nonGlobal: [],
  },
  secret: 'test',
  useGraphQLServer: true,
  fileStorage: false,
  mailer: false,
  sentry: false,

  // integrations: {
  //   lulu: {
  //     redirectUri:
  //       'http://localhost:4000/provider-connection-popup/lulu?next=/',
  //     tokenUrl:
  //       'https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token',
  //     clientId: 'ketida-editor',
  //   },
  // },
}

export default config
